import { useState } from 'react';
import { X } from 'lucide-react';
import { useAppStore } from '../store/appStore';

interface NicknameDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NicknameDialog({ isOpen, onClose }: NicknameDialogProps) {
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setNickname } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;

    setIsSubmitting(true);
    try {
      setNickname(nickname.trim());
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-sm w-full animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Set Your Name
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What should we call you?
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your name or nickname"
                className="input w-full"
                maxLength={50}
                autoFocus
                required
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This will be shown next to your photos
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Skip
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={!nickname.trim() || isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
