import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageOff } from 'lucide-react';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait' | 'auto';
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  label?: string;
}

export function SmartImage({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = 'video',
  priority = false,
  objectFit = 'cover',
  label
}: SmartImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
    auto: ''
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  };

  // If no src or empty string, show placeholder
  if (!src || src.length === 0) {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg',
          aspectRatioClasses[aspectRatio],
          containerClassName
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center mb-3">
            <ImageOff className="w-6 h-6 text-slate-500" />
          </div>
          {label && (
            <span className="text-xs text-slate-500 text-center font-medium">
              {label}
            </span>
          )}
          <span className="text-[10px] text-slate-600 mt-1">
            {alt}
          </span>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/20 via-transparent to-teal-500/20" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/20 via-transparent to-teal-500/20" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-800 rounded-lg',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {!isLoaded && !hasError && (
        <Skeleton className="absolute inset-0 bg-slate-800" />
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
            <ImageOff className="w-6 h-6 text-red-400" />
          </div>
          <span className="text-xs text-red-400/70 text-center">
            Failed to load image
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
}
