import type React from 'react';
import { motion, type TargetAndTransition } from 'framer-motion';
import { cn } from '../../utils/classNames';

interface ResponsiveButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | { xs?: 'sm' | 'md' | 'lg'; sm?: 'sm' | 'md' | 'lg' };
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
}

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
  ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
} as const;

const sizes = {
  sm: 'px-3 py-2 text-sm min-h-[36px] sm:px-4 sm:py-2',
  md: 'px-4 py-2 text-base min-h-[44px] sm:px-6 sm:py-3',
  lg: 'px-6 py-3 text-lg min-h-[48px] sm:px-8 sm:py-4',
} as const;

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  whileHover,
  whileTap,
}) => {
  // Handle responsive size object
  const resolvedSize = typeof size === 'string'
    ? sizes[size]
    : `${sizes[size.xs || 'md']} sm:${sizes[size.sm || 'md']}`;

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={whileHover || (!disabled && !loading ? { scale: 1.02 } : {})}
      whileTap={whileTap || (!disabled && !loading ? { scale: 0.98 } : {})}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center gap-2 font-medium rounded-xl',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        'touch-manipulation select-none',

        // Variant styles
        variants[variant],

        // Size styles
        resolvedSize,

        // Width styles
        fullWidth ? 'w-full' : 'w-auto',

        // State styles
        disabled || loading
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer',

        className
      )}
    >
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}
      {children}
    </motion.button>
  );
};

export default ResponsiveButton;