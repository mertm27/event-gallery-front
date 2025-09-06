import { useEffect } from 'react';
import { X, CheckCircle, XCircle, Info } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

export function Toasts() {
  const { toasts, removeToast } = useAppStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        
        return (
          <div
            key={toast.id}
            className={`
              flex items-start gap-3 p-4 rounded-lg shadow-lg border
              animate-fade-in
              ${
                toast.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100'
                  : toast.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/20 dark:border-red-800 dark:text-red-100'
                  : 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100'
              }
            `}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{toast.title}</p>
              {toast.description && (
                <p className="text-sm opacity-90 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
