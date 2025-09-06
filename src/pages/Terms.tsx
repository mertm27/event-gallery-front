import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, AlertTriangle, Shield } from 'lucide-react';

export function Terms() {
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
              Terms of Service
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Scale className="w-5 h-5" />
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  By accessing and using this wedding photo sharing application, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
                <p>
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Shield className="w-5 h-5" />
                Use License
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained in the application</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <AlertTriangle className="w-5 h-5" />
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>As a user of this service, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Only upload photos that you own or have permission to share</li>
                  <li>Respect the privacy and dignity of all event participants</li>
                  <li>Not upload inappropriate, offensive, or illegal content</li>
                  <li>Use the service in accordance with all applicable laws</li>
                  <li>Not attempt to gain unauthorized access to the system</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Content Ownership
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  You retain ownership of all photos you upload. By uploading photos, you grant us a limited, non-exclusive license to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Store and display your photos in the event gallery</li>
                  <li>Process and compress your photos for optimal viewing</li>
                  <li>Provide technical support and maintenance</li>
                </ul>
                <p>
                  You can request deletion of your photos at any time by contacting us.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Privacy and Data Protection
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                </p>
                <p>
                  We implement appropriate security measures to protect your photos and personal information, but no method of transmission over the internet is 100% secure.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Service Availability
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We strive to provide reliable service, but we cannot guarantee uninterrupted access. The service may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Scheduled maintenance</li>
                  <li>Technical difficulties</li>
                  <li>Force majeure events</li>
                  <li>System updates</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  In no event shall Wedding Photos or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this application, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive termination.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-mono text-sm">legal@weddingphotos.app</p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                These terms of service are governed by and construed in accordance with applicable laws.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
