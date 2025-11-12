// Responsive utilities for consistent breakpoints and responsive behavior

export const BREAKPOINTS = {
  xs: '320px',   // Extra small devices (small phones)
  sm: '640px',   // Small devices (phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (laptops)
  xl: '1280px',  // Extra large devices (desktops)
  '2xl': '1536px', // 2X large devices (large desktops)
} as const;

// Responsive classes for common patterns
export const RESPONSIVE_CLASSES = {
  // Container classes
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  containerLarge: 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
  
  // Grid classes
  gridResponsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8',
  gridTwoCol: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16',
  gridThreeCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
  gridFourCol: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6',
  
  // Text classes
  textResponsive: 'text-sm sm:text-base lg:text-lg',
  headingLarge: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
  headingMedium: 'text-2xl sm:text-3xl lg:text-4xl',
  headingSmall: 'text-xl sm:text-2xl lg:text-3xl',
  
  // Spacing classes
  paddingSection: 'py-12 sm:py-16 lg:py-20 xl:py-24',
  paddingCard: 'p-4 sm:p-6 lg:p-8',
  marginSection: 'mb-8 sm:mb-12 lg:mb-16',
  
  // Button classes
  buttonResponsive: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
  buttonLarge: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  
  // Image classes
  imageResponsive: 'w-full h-auto object-cover',
  avatarSmall: 'w-8 h-8 sm:w-10 sm:h-10',
  avatarMedium: 'w-12 h-12 sm:w-16 sm:h-16',
  avatarLarge: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
  
  // Flex classes
  flexResponsive: 'flex flex-col sm:flex-row gap-4 sm:gap-6',
  flexCenter: 'flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6',
} as const;

// Responsive font sizes
export const FONT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
} as const;

// Mobile-first responsive utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 1024;
};

// Touch device detection
export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Viewport utilities
export const getViewportSize = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Safe area utilities for mobile devices
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, bottom: 0, left: 0, right: 0 };
  
  const style = getComputedStyle(document.documentElement);
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
  };
};

// Responsive image loading
export const getResponsiveImageSrc = (baseSrc: string, size: 'small' | 'medium' | 'large' = 'medium') => {
  const sizeMap = {
    small: '400w',
    medium: '800w',
    large: '1200w',
  };
  
  const extension = baseSrc.split('.').pop();
  const baseName = baseSrc.replace(`.${extension}`, '');
  
  return `${baseName}-${sizeMap[size]}.${extension}`;
};

// Responsive spacing utilities
export const getResponsiveSpacing = (base: number) => ({
  xs: `${base * 0.5}rem`,
  sm: `${base * 0.75}rem`,
  md: `${base}rem`,
  lg: `${base * 1.25}rem`,
  xl: `${base * 1.5}rem`,
});