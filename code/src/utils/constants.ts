// Application constants for better maintainability

export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  SECONDARY: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    900: '#0f172a',
  },
  SUCCESS: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  ERROR: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
} as const;

export const SCROLL_OFFSET = 100;

export const CONTACT_FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  SUBJECT: 'subject',
  MESSAGE: 'message',
} as const;

export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const;

export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
} as const;

export const EXTERNAL_LINKS = {
  LINKEDIN: 'https://linkedin.com',
  GITHUB: 'https://github.com',
  EMAIL_TEMPLATE: 'mailto:',
  PHONE_TEMPLATE: 'tel:',
} as const;

// SEO and Meta constants
export const META = {
  TITLE: 'Jihan El Kichouhi Salhi - Food Technology Professional',
  DESCRIPTION: 'Food Technologist specializing in sustainable packaging, product development, and quality control. Expert in HACCP, food safety, and innovation.',
  KEYWORDS: [
    'food technology',
    'food safety',
    'HACCP',
    'product development',
    'sustainable packaging',
    'quality control',
    'food innovation',
    'R&D',
    'food science',
  ],
  AUTHOR: 'Jihan El Kichouhi Salhi',
  SITE_URL: 'https://jihan-portfolio.com',
} as const;

// Performance constants
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 16, // ~60fps
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px',
} as const;