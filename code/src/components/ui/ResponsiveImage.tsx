import type React from 'react';
import { useState } from 'react';
import { cn } from '../../utils/classNames';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string | { xs?: number; sm?: number; md?: number; lg?: number };
  priority?: boolean;
  placeholder?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  placeholder,
  fallbackSrc,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Convert responsive sizes object to CSS sizes string if needed
  const resolvedSizes = typeof sizes === 'string'
    ? sizes
    : `(max-width: ${sizes.xs || 320}px) ${sizes.xs}px, (max-width: ${sizes.sm || 640}px) ${sizes.sm}px, (max-width: ${sizes.md || 768}px) ${sizes.md}px, (max-width: ${sizes.lg || 1024}px) ${sizes.lg}px, 100vw`;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string) => {
    const extension = baseSrc.split('.').pop();
    const baseName = baseSrc.replace(`.${extension}`, '');

    return [
      `${baseName}-400w.${extension} 400w`,
      `${baseName}-800w.${extension} 800w`,
      `${baseName}-1200w.${extension} 1200w`,
    ].join(', ');
  };

  if (hasError && (placeholder || fallbackSrc)) {
    return (
      <img
        src={placeholder || fallbackSrc}
        alt={alt}
        className={cn('w-full h-auto object-cover', className)}
      />
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className={cn(
          'absolute inset-0 bg-gray-200 animate-pulse',
          className
        )} />
      )}

      {/* Main image */}
      <img
        src={src}
        srcSet={generateSrcSet(src)}
        sizes={resolvedSizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'w-full h-auto object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
      />
    </div>
  );
};

export default ResponsiveImage;