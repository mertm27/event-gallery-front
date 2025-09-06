import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { queryKeys } from '../api/queryKeys';
import { useInfinitePhotos } from '../hooks/useInfinitePhotos';
import { Header } from '../components/Header';
import { GalleryGrid } from '../components/GalleryGrid';
import { Lightbox } from '../components/Lightbox';
import { UploadDrawer } from '../components/UploadDrawer';
import { Toasts } from '../components/Toasts';
import { Menu, X, User, Settings, Info, Shield, FileText } from 'lucide-react';
import type { PhotoMeta } from '../types';

export function GalleryPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showUploadDrawer, setShowUploadDrawer] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoMeta | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Fetch event info
  const { data: event, isLoading: eventLoading, error: eventError } = useQuery({
    queryKey: queryKeys.event(token!),
    queryFn: () => api.getEventInfo(token!),
    enabled: !!token,
  });

  // Handle photo click for lightbox
  const handlePhotoClick = (photo: PhotoMeta, index: number) => {
    setLightboxPhoto(photo);
    setLightboxIndex(index);
  };

  // Handle lightbox navigation
  const handleLightboxNavigate = (index: number) => {
    setLightboxIndex(index);
    setLightboxPhoto(allPhotos[index]);
  };

  // Handle lightbox close
  const handleLightboxClose = () => {
    setLightboxPhoto(null);
  };

  // Get all photos from the infinite query
  const { data: photosData } = useInfinitePhotos(token!);
  const allPhotos = photosData?.pages.flatMap(page => page.items) || [];

  if (eventLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Event Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The event code "{token}" is invalid or the event has ended.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Try Another Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        event={event}
        onUploadClick={() => setShowUploadDrawer(true)}
        onMenuClick={() => setShowMenu(true)}
      />

      <main className="pb-20">
        <GalleryGrid
          token={token!}
          onPhotoClick={handlePhotoClick}
        />
      </main>

      {/* Upload Drawer */}
      <UploadDrawer
        isOpen={showUploadDrawer}
        onClose={() => setShowUploadDrawer(false)}
        token={token!}
      />

      {/* Lightbox */}
      {lightboxPhoto && (
        <Lightbox
          photos={allPhotos}
          currentIndex={lightboxIndex}
          isOpen={!!lightboxPhoto}
          onClose={handleLightboxClose}
          onNavigate={handleLightboxNavigate}
        />
      )}

      {/* Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setShowMenu(false)}>
          <div className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-xl animate-slide-up">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <button
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowUploadDrawer(true);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Upload Photos</span>
              </button>

              <a
                href="/privacy"
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Privacy Policy</span>
              </a>

              <a
                href="/terms"
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Terms of Service</span>
              </a>

              <a
                href="/admin"
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-900 dark:text-white">Admin</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Toasts />
    </div>
  );
}
