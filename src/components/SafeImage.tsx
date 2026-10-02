import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTitle = 'Editorial Portfolio Visual',
  fallbackSubtitle = 'Nigatua Bizuneh Tsegaye',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col justify-between p-8 bg-gradient-to-br from-[#18181B] via-[#27272A] to-[#09090B] text-[#F4F4F0] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="text-xs font-mono-tabular text-[#A1A1AA]">
          {fallbackSubtitle}
        </div>
        <div className="my-auto py-6">
          <p className="font-serif-editorial italic text-2xl md:text-3xl text-[#F4F4F0] leading-snug">
            {fallbackTitle}
          </p>
          <p className="mt-2 text-xs text-[#A1A1AA] max-w-sm">
            {alt}
          </p>
        </div>
        <div className="h-px w-full bg-white/15" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
