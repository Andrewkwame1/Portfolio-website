# Performance Optimization Guide

## Overview

This document outlines the performance optimizations implemented in the portfolio application and provides guidelines for maintaining optimal performance.

## Performance Metrics

### Target Metrics
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

### Bundle Size Targets
- **Initial Bundle**: < 100KB gzipped
- **Total JavaScript**: < 200KB gzipped
- **CSS**: < 20KB gzipped

## Optimization Strategies

### 1. React Performance Optimizations

#### Memoization
```typescript
// Component memoization
const MemoizedComponent = React.memo(Component);

// Value memoization
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Callback memoization
const handleClick = useCallback(() => {
  // Handle click
}, [dependency]);
```

#### Avoiding Unnecessary Re-renders
```typescript
// Use readonly interfaces to prevent mutations
interface Props {
  readonly data: readonly Item[];
}

// Memoize static data
const memoizedData = useMemo(() => ({
  profile: profileData,
  navigation: navigationItems,
}), []);
```

### 2. Event Handling Optimizations

#### Throttled Scroll Events
```typescript
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
}
```

#### Debounced Input Handling
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### 3. Lazy Loading and Code Splitting

#### Intersection Observer for Lazy Loading
```typescript
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [elementRef, options]);

  return isVisible;
}
```

#### Dynamic Imports
```typescript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### 4. Animation Optimizations

#### Hardware Acceleration
```css
/* Use transform and opacity for smooth animations */
.animate-element {
  transform: translateZ(0); /* Force hardware acceleration */
  will-change: transform, opacity;
}

/* Avoid animating layout properties */
.avoid {
  /* Don't animate these */
  /* width, height, top, left, margin, padding */
}

.prefer {
  /* Animate these instead */
  transform: translateX(100px);
  opacity: 0.5;
}
```

#### Framer Motion Optimizations
```typescript
// Use layout animations sparingly
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
    },
  },
};

// Optimize for 60fps
const smoothVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
```

### 5. Bundle Optimization

#### Tree Shaking
```typescript
// Import only what you need
import { motion } from 'framer-motion'; // ✅ Good
import * as FramerMotion from 'framer-motion'; // ❌ Avoid

// Use specific imports
import { Mail, Phone } from 'lucide-react'; // ✅ Good
import * as Icons from 'lucide-react'; // ❌ Avoid
```

#### Code Splitting Strategies
```typescript
// Route-based splitting
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));

// Feature-based splitting
const AdvancedFeatures = lazy(() => 
  import('./components/AdvancedFeatures')
);
```

### 6. Image Optimization

#### Responsive Images
```html
<!-- Use responsive images -->
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Description"
  loading="lazy"
/>
```

#### Modern Image Formats
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Fallback">
</picture>
```

### 7. CSS Optimizations

#### Critical CSS
```css
/* Inline critical CSS for above-the-fold content */
.hero-section {
  /* Critical styles here */
}

/* Load non-critical CSS asynchronously */
```

#### CSS-in-JS Optimizations
```typescript
// Use Tailwind's JIT mode for optimal CSS
// Only generate CSS for classes actually used

// Avoid runtime CSS-in-JS for better performance
const styles = {
  container: 'max-w-7xl mx-auto px-4', // ✅ Static classes
};
```

### 8. Network Optimizations

#### Resource Hints
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Prefetch likely next resources -->
<link rel="prefetch" href="/about">

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

#### Caching Strategy
```typescript
// Service Worker caching (if implemented)
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];
```

## Performance Monitoring

### Core Web Vitals Tracking
```typescript
// Track performance metrics
function trackWebVitals() {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Monitor bundle size over time
npm install -g bundlesize
bundlesize
```

### Performance Testing
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Performance budget
{
  "budget": [
    {
      "path": "/*",
      "timings": [
        { "metric": "first-contentful-paint", "budget": 1500 },
        { "metric": "largest-contentful-paint", "budget": 2500 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 200 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
```

## Performance Checklist

### Development
- [ ] Use React.memo for expensive components
- [ ] Implement useMemo for expensive calculations
- [ ] Use useCallback for event handlers
- [ ] Throttle scroll and resize events
- [ ] Implement lazy loading for images
- [ ] Use Intersection Observer for animations

### Build
- [ ] Enable tree shaking
- [ ] Minimize bundle size
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up proper caching headers

### Runtime
- [ ] Monitor Core Web Vitals
- [ ] Track bundle size
- [ ] Test on slow networks
- [ ] Verify mobile performance
- [ ] Check accessibility performance

## Common Performance Pitfalls

### 1. Unnecessary Re-renders
```typescript
// ❌ Avoid: Creates new object on every render
<Component style={{ marginTop: 10 }} />

// ✅ Better: Use static styles or memoize
const styles = { marginTop: 10 };
<Component style={styles} />
```

### 2. Expensive Operations in Render
```typescript
// ❌ Avoid: Expensive operation on every render
function Component({ data }) {
  const processedData = expensiveOperation(data);
  return <div>{processedData}</div>;
}

// ✅ Better: Memoize expensive operations
function Component({ data }) {
  const processedData = useMemo(() => 
    expensiveOperation(data), [data]
  );
  return <div>{processedData}</div>;
}
```

### 3. Large Bundle Sizes
```typescript
// ❌ Avoid: Importing entire libraries
import _ from 'lodash';

// ✅ Better: Import only what you need
import { debounce } from 'lodash-es';
```

### 4. Blocking the Main Thread
```typescript
// ❌ Avoid: Synchronous heavy operations
function heavyCalculation() {
  // Heavy synchronous work
}

// ✅ Better: Use Web Workers or break into chunks
function heavyCalculationAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      // Heavy work in chunks
      resolve(result);
    }, 0);
  });
}
```

## Performance Best Practices

1. **Measure First**: Always measure before optimizing
2. **Focus on User Experience**: Optimize for perceived performance
3. **Progressive Enhancement**: Start with a fast baseline
4. **Monitor Continuously**: Set up performance monitoring
5. **Test on Real Devices**: Test on actual mobile devices
6. **Optimize for Mobile**: Mobile-first performance approach
7. **Use Performance Budget**: Set and enforce performance budgets
8. **Regular Audits**: Conduct regular performance audits