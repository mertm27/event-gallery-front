import { useState } from 'react';
import { Upload, Menu, X, User, Settings } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import type { EventInfo } from '../types';

interface HeaderProps {
  event: EventInfo;
  onUploadClick: () => void;
  onMenuClick: () => void;
}

export function Header({ event, onUploadClick, onMenuClick }: HeaderProps) {
  const [showNicknamePrompt, setShowNicknamePrompt] = useState(false);
  const { nickname, setNickname } = useAppStore();

  const handleUploadClick = () => {
    if (!nickname) {
      setShowNicknamePrompt(true);
      return;
    }
    onUploadClick();
  };

  const handleNicknameSubmit = (newNickname: string) => {
    setNickname(newNickname);
    setShowNicknamePrompt(false);
    onUploadClick();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 safe-area-inset">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Event title */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {event.title}
              </h1>
              {event.coverUrl && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 mt-1" />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Upload button */}
              <button
                onClick={handleUploadClick}
                className="btn btn-primary px-4 py-2 text-sm"
                aria-label="Upload photos"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </button>

              {/* Menu button */}
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* User info */}
          {nickname && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span>Signed in as {nickname}</span>
            </div>
          )}
        </div>
      </header>

      {/* Nickname prompt */}
      {showNicknamePrompt && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-sm w-full animate-fade-in">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What's your name?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We'd love to know who's sharing these beautiful photos!
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name or nickname"
                  className="input w-full"
                  maxLength={50}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        handleNicknameSubmit(value);
                      }
                    }
                  }}
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNicknamePrompt(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                      const value = input?.value.trim();
                      if (value) {
                        handleNicknameSubmit(value);
                      }
                    }}
                    className="btn btn-primary flex-1"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
