import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Lock, Users, BarChart3, Shield } from 'lucide-react';

export function AdminPlaceholder() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 safe-area-inset">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
              <Settings className="w-8 h-8 text-yellow-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Coming Soon - Event Management Features
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                    Authentication Required
                  </h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This admin panel will be secured with proper authentication in the next phase of development.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Guest Management
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Manage guest access, view upload statistics, and moderate content.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Planned Features:
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Guest list management</li>
                  <li>• Upload permissions</li>
                  <li>• Content moderation tools</li>
                  <li>• Guest activity logs</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Analytics & Reports
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  View detailed statistics about photo uploads and guest engagement.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Planned Features:
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Upload statistics</li>
                  <li>• Popular photos tracking</li>
                  <li>• Guest engagement metrics</li>
                  <li>• Export capabilities</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Security & Settings
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Configure event settings, security options, and access controls.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Planned Features:
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• Event configuration</li>
                  <li>• Access control settings</li>
                  <li>• Security monitoring</li>
                  <li>• Backup & recovery</li>
                </ul>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    System Management
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Monitor system health, manage storage, and configure integrations.
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  Planned Features:
                </div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  <li>• System monitoring</li>
                  <li>• Storage management</li>
                  <li>• Integration settings</li>
                  <li>• Maintenance tools</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Development Roadmap
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                The admin panel will be implemented in the next phase with a Node.js backend and proper authentication.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Next Steps:
              </div>
              <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                <li>• Implement Node.js + Express backend</li>
                <li>• Add JWT-based authentication</li>
                <li>• Create admin user management</li>
                <li>• Build moderation tools</li>
                <li>• Add analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
