import type React from 'react';
import { cn } from '../../utils/classNames';

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | {
    xs?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    sm?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    lg?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  };
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'white';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const sizes = {
  xs: 'text-xs sm:text-sm',
  sm: 'text-sm sm:text-base',
  base: 'text-base sm:text-lg',
  lg: 'text-lg sm:text-xl',
  xl: 'text-xl sm:text-2xl',
  '2xl': 'text-2xl sm:text-3xl',
  '3xl': 'text-3xl sm:text-4xl lg:text-5xl',
  '4xl': 'text-4xl sm:text-5xl lg:text-6xl',
  '5xl': 'text-5xl sm:text-6xl lg:text-7xl',
  '6xl': 'text-6xl sm:text-7xl lg:text-8xl',
} as const;

const weights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

const colors = {
  primary: 'text-gray-900',
  secondary: 'text-gray-700',
  muted: 'text-gray-500',
  accent: 'text-blue-600',
  white: 'text-white',
} as const;

const alignments = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const;

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  className,
}) => {
  // Handle responsive size object
  const resolvedSize = typeof size === 'string'
    ? sizes[size]
    : `${sizes[size.xs || 'base']} sm:${sizes[size.sm || 'base']} lg:${sizes[size.lg || 'base']}`;

  return (
    <Component
      className={cn(
        resolvedSize,
        weights[weight],
        colors[color],
        alignments[align],
        'leading-relaxed',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveText;