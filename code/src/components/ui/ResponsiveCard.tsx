import type React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/classNames';

interface ResponsiveCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants = {
  default: 'bg-white shadow-sm border border-gray-100',
  elevated: 'bg-white shadow-lg border border-gray-100',
  outlined: 'bg-white border-2 border-gray-200',
  glass: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg',
} as const;

const paddings = {
  none: '',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
  xl: 'p-10 sm:p-12',
} as const;

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  onClick,
}) => {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={cn(
        'rounded-xl transition-all duration-300',
        variants[variant],
        paddings[padding],
        hover && 'hover:shadow-lg',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveCard;