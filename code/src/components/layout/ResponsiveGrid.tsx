import type React from 'react';
import { cn } from '../../utils/classNames';

interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const gapSizes = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
} as const;

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = 'md',
  className,
}) => {
  const gridClasses = [
    'grid',
    gapSizes[gap],
  ];

  // Build responsive grid classes
  if (cols.xs) gridClasses.push(`grid-cols-${cols.xs}`);
  if (cols.sm) gridClasses.push(`sm:grid-cols-${cols.sm}`);
  if (cols.md) gridClasses.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) gridClasses.push(`lg:grid-cols-${cols.lg}`);
  if (cols.xl) gridClasses.push(`xl:grid-cols-${cols.xl}`);
  if (cols['2xl']) gridClasses.push(`2xl:grid-cols-${cols['2xl']}`);

  return (
    <div className={cn(gridClasses.join(' '), className)}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;