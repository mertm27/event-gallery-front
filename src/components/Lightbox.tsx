import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from '../utils/time';
import type { PhotoMeta } from '../types';

interface LightboxProps {
  photos: PhotoMeta[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ photos, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const currentPhoto = photos[currentIndex];

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < photos.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;
    const minSwipeDistance = 50;

    // Horizontal swipe for navigation
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0 && currentIndex < photos.length - 1) {
        // Swipe left - next photo
        onNavigate(currentIndex + 1);
      } else if (deltaX < 0 && currentIndex > 0) {
        // Swipe right - previous photo
        onNavigate(currentIndex - 1);
      }
    }

    // Vertical swipe down to close
    if (deltaY > minSwipeDistance && Math.abs(deltaY) > Math.abs(deltaX)) {
      onClose();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={() => onNavigate(currentIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentIndex < photos.length - 1 && (
        <button
          onClick={() => onNavigate(currentIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Photo container */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative max-w-full max-h-full">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || `Photo by ${currentPhoto.uploaderName || 'Guest'}`}
            className={`
              max-w-full max-h-full object-contain transition-opacity duration-200
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Photo info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">
              {currentPhoto.uploaderName || 'Guest'}
            </h3>
            <span className="text-sm opacity-75">
              {currentIndex + 1} of {photos.length}
            </span>
          </div>
          
          {currentPhoto.caption && (
            <p className="text-sm opacity-90 mb-2">
              {currentPhoto.caption}
            </p>
          )}
          
          <p className="text-xs opacity-75">
            {formatRelativeTime(currentPhoto.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
