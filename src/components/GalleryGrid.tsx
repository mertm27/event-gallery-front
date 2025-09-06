import { useRef, useEffect } from 'react';
import { useInfinitePhotos } from '../hooks/useInfinitePhotos';
import { PhotoCard } from './PhotoCard';
import type { PhotoMeta, InviteToken } from '../types';

interface GalleryGridProps {
  token: InviteToken;
  onPhotoClick: (photo: PhotoMeta, index: number) => void;
}

export function GalleryGrid({ token, onPhotoClick }: GalleryGridProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useInfinitePhotos(token);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Flatten all photos from all pages
  const allPhotos = data?.pages.flatMap(page => page.items) || [];

  // Intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square skeleton rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Failed to load photos
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There was an error loading the photo gallery.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (allPhotos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-2xl">📷</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No photos yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to share a photo from this event!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => onPhotoClick(photo, index)}
          />
        ))}
      </div>
      
      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} className="h-4" />
      
      {/* Loading indicator */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
            <span className="text-sm">Loading more photos...</span>
          </div>
        </div>
      )}
    </div>
  );
}
