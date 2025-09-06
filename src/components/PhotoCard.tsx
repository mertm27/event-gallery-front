import { useState } from 'react';
import { formatRelativeTime } from '../utils/time';
import type { PhotoMeta } from '../types';

interface PhotoCardProps {
  photo: PhotoMeta;
  onClick: () => void;
}

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectRatio = photo.width / photo.height;
  const isPortrait = aspectRatio < 1;
  const isLandscape = aspectRatio > 1.5;

  return (
    <div
      className={`
        relative group cursor-pointer rounded-lg overflow-hidden shadow-sm
        hover:shadow-md transition-shadow duration-200
        ${isPortrait ? 'col-span-1' : isLandscape ? 'col-span-2' : 'col-span-1'}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View photo by ${photo.uploaderName || 'Guest'}`}
    >
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton animate-pulse" />
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-xs">📷</span>
              </div>
              <p className="text-xs">Failed to load</p>
            </div>
          </div>
        ) : (
          <img
            src={photo.url}
            alt={photo.caption || `Photo by ${photo.uploaderName || 'Guest'}`}
            className={`
              w-full h-full object-cover transition-opacity duration-200
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
      </div>
      
      {/* Photo info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="space-y-1">
          {photo.uploaderName && (
            <p className="text-sm font-medium truncate">
              {photo.uploaderName}
            </p>
          )}
          {photo.caption && (
            <p className="text-xs opacity-90 line-clamp-2">
              {photo.caption}
            </p>
          )}
          <p className="text-xs opacity-75">
            {formatRelativeTime(photo.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
