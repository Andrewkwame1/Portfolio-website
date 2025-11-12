# Deployment Guide

## Overview

This guide covers deployment options and best practices for the portfolio application.

## Build Process

### Production Build
```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Lint code
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Build Output
```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-[hash].js # Main JavaScript bundle
│   ├── index-[hash].css # Compiled CSS
│   └── [assets]        # Other static assets
└── [other files]       # Additional build artifacts
```

## Deployment Options

### 1. Netlify (Recommended)

#### Automatic Deployment
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   Node version: 18
   ```

3. **Environment Variables** (if needed)
   ```
   NODE_VERSION=18
   NPM_VERSION=8
   ```

#### Manual Deployment
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 2. Vercel

#### Automatic Deployment
1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your repository
   - Vercel auto-detects Vite configuration

2. **Build Settings** (auto-configured)
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Vercel Configuration
Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 3. GitHub Pages

#### Setup
1. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select "GitHub Actions" as source

2. **Create Workflow**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 4. AWS S3 + CloudFront

#### S3 Setup
```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://your-portfolio-bucket

# Enable static website hosting
aws s3 website s3://your-portfolio-bucket \
  --index-document index.html \
  --error-document index.html

# Upload files
aws s3 sync dist/ s3://your-portfolio-bucket --delete
```

#### CloudFront Setup
```bash
# Create CloudFront distribution
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

CloudFront configuration (`cloudfront-config.json`):
```json
{
  "CallerReference": "portfolio-deployment",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-your-portfolio-bucket",
        "DomainName": "your-portfolio-bucket.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-portfolio-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "Compress": true
  },
  "Comment": "Portfolio website distribution",
  "Enabled": true
}
```

### 5. Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration
Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        # Cache static assets
        location /assets/ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Docker Commands
```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 80:80 portfolio

# Docker Compose
docker-compose up -d
```

## Performance Optimization for Production

### 1. Caching Strategy
```
Static Assets (JS, CSS, Images): 1 year cache
HTML: No cache (always fresh)
API responses: Short cache (if applicable)
```

### 2. Compression
```
Gzip: Enable for text files
Brotli: Enable for better compression
```

### 3. CDN Configuration
```
Cache-Control headers
Proper MIME types
Compression enabled
HTTP/2 support
```

## Security Headers

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
               font-src 'self' fonts.gstatic.com; 
               img-src 'self' data: https:;">
```

### Additional Security Headers
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Monitoring and Analytics

### Performance Monitoring
```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking
```javascript
// Simple error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error tracking service
});
```

## Domain and SSL

### Custom Domain Setup

#### Netlify
1. Add custom domain in Netlify dashboard
2. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

#### Vercel
1. Add domain in Vercel dashboard
2. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

### SSL Certificate
- **Netlify**: Automatic Let's Encrypt SSL
- **Vercel**: Automatic SSL certificates
- **CloudFront**: AWS Certificate Manager
- **Custom**: Let's Encrypt with Certbot

## Deployment Checklist

### Pre-deployment
- [ ] Run all tests
- [ ] Check TypeScript compilation
- [ ] Run linting
- [ ] Test production build locally
- [ ] Verify all environment variables
- [ ] Check bundle size
- [ ] Run accessibility audit
- [ ] Test on multiple devices

### Post-deployment
- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Check contact form functionality
- [ ] Verify responsive design
- [ ] Test performance metrics
- [ ] Check SEO meta tags
- [ ] Verify SSL certificate
- [ ] Test error pages

### Monitoring Setup
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance monitoring
- [ ] Configure analytics (if needed)
- [ ] Set up backup strategy

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Routing Issues
```
Problem: 404 on page refresh
Solution: Configure server redirects to index.html
```

#### Performance Issues
```
Problem: Large bundle size
Solution: Check bundle analyzer, implement code splitting
```

#### SSL Issues
```
Problem: Mixed content warnings
Solution: Ensure all resources use HTTPS
```

### Debug Commands
```bash
# Check build output
npm run build && ls -la dist/

# Test production build locally
npm run preview

# Analyze bundle
npx vite-bundle-analyzer dist/

# Check for security vulnerabilities
npm audit
```

## Continuous Deployment

### GitHub Actions Example
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```