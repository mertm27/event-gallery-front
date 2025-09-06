import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, QrCode, ArrowRight } from 'lucide-react';

export function CodeGate() {
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter an event code');
      return;
    }

    if (code.length < 6 || code.length > 10) {
      setError('Event code must be 6-10 characters');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(code)) {
      setError('Event code can only contain letters and numbers');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate validation delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the event
      navigate(`/${code}`);
    } catch (err) {
      setError('Invalid event code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 safe-area-inset">
      <div className="max-w-md w-full">
        {/* Logo/Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
            <Camera className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Wedding Photos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share and view photos from the special day
          </p>
        </div>

        {/* Event code form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          <div className="text-center mb-6">
            <QrCode className="w-12 h-12 mx-auto mb-3 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Enter Event Code
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Scan the QR code or enter the code provided by the couple
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="eventCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Code
              </label>
              <input
                id="eventCode"
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError('');
                }}
                placeholder="Enter 6-10 character code"
                className={`input w-full text-center text-lg font-mono tracking-wider ${
                  error ? 'border-red-500 focus-visible:ring-red-500' : ''
                }`}
                maxLength={10}
                autoComplete="off"
                autoFocus
                required
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!code.trim() || isSubmitting}
              className="btn btn-primary w-full py-3 text-base"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Validating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Join Event</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          {/* Demo code hint */}
          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              Demo: Try <code className="font-mono bg-white dark:bg-gray-700 px-1 rounded">wedding2025</code>
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex justify-center gap-6 text-sm">
            <a
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Terms
            </a>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Made with ❤️ for special moments
          </p>
        </div>
      </div>
    </div>
  );
}
