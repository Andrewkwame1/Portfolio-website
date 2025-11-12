// Security utilities for protecting the application

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';

  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .slice(0, 1000); // Limit length
};

// Email validation with security checks
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const sanitizedEmail = sanitizeInput(email);

  // Check for common malicious patterns
  const maliciousPatterns = [
    /script/i,
    /javascript/i,
    /vbscript/i,
    /onload/i,
    /onerror/i,
    /<.*>/,
  ];

  const hasMaliciousContent = maliciousPatterns.some(pattern =>
    pattern.test(sanitizedEmail)
  );

  return emailRegex.test(sanitizedEmail) && !hasMaliciousContent && sanitizedEmail.length <= 254;
};

// URL validation
export const validateURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

// Content Security Policy headers
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://api.web3forms.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://api.web3forms.com'],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", 'https://api.web3forms.com'],
  'upgrade-insecure-requests': [],
} as const;

// Generate CSP header string
export const generateCSPHeader = (): string => {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, sources]) =>
      sources.length > 0
        ? `${directive} ${sources.join(' ')}`
        : directive
    )
    .join('; ');
};

// Rate limiting for form submissions
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];

    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);

    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }

    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);

    return true;
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length < this.maxAttempts) return 0;

    const oldestAttempt = Math.min(...attempts);
    const timeUntilReset = this.windowMs - (Date.now() - oldestAttempt);

    return Math.max(0, timeUntilReset);
  }
}

export const formRateLimiter = new RateLimiter();

// Secure form data processing
export const processFormData = (data: Record<string, string>) => {
  const processed: Record<string, string> = {};

  for (const [key, value] of Object.entries(data)) {
    // Sanitize key
    const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 50);

    // Sanitize and validate value
    const sanitizedValue = sanitizeInput(String(value));

    // Additional validation based on field type
    switch (sanitizedKey) {
      case 'email':
        if (!validateEmail(sanitizedValue)) {
          throw new Error('Invalid email format');
        }
        break;
      case 'name':
        if (sanitizedValue.length < 2 || sanitizedValue.length > 50) {
          throw new Error('Name must be between 2 and 50 characters');
        }
        break;
      case 'subject':
        if (sanitizedValue.length < 5 || sanitizedValue.length > 100) {
          throw new Error('Subject must be between 5 and 100 characters');
        }
        break;
      case 'message':
        if (sanitizedValue.length < 10 || sanitizedValue.length > 1000) {
          throw new Error('Message must be between 10 and 1000 characters');
        }
        break;
    }

    processed[sanitizedKey] = sanitizedValue;
  }

  return processed;
};

// Secure local storage
export const secureStorage = {
  set: (key: string, value: unknown, ttl?: number) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = {
        value,
        timestamp: Date.now(),
        ttl: ttl || null,
      };
      localStorage.setItem(sanitizedKey, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  },

  get: (key: string) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      const item = localStorage.getItem(sanitizedKey);
      if (!item) return null;

      const parsed = JSON.parse(item);

      // Check if item has expired
      if (parsed.ttl && Date.now() - parsed.timestamp > parsed.ttl) {
        localStorage.removeItem(sanitizedKey);
        return null;
      }

      return parsed.value;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      const sanitizedKey = sanitizeInput(key);
      localStorage.removeItem(sanitizedKey);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  },
};

// Environment variable validation
export const validateEnvironment = () => {
  const requiredVars = ['VITE_WEB3FORMS_ACCESS_KEY'];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }

  return missing.length === 0;
};

// Secure headers for deployment
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': generateCSPHeader(),
} as const;

// Error logging (without sensitive data)
export const secureLog = (message: string, data?: unknown) => {
  // Only log in development
  if (import.meta.env.DEV) {
    console.log(`[Security] ${message}`, data);
  }
};

// Honeypot field for bot detection
export const createHoneypot = () => ({
  name: 'website', // Common bot target field
  style: {
    position: 'absolute' as const,
    left: '-9999px',
    top: '-9999px',
    opacity: 0,
    pointerEvents: 'none' as const,
  },
  tabIndex: -1,
  autoComplete: 'off',
});

// CSRF token generation (for future use)
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Secure random string generation
export const generateSecureId = (length = 16): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => chars[byte % chars.length]).join('');
};