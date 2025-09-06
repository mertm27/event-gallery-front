import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from 'lucide-react';

export function Privacy() {
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
              Privacy Policy
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Eye className="w-5 h-5" />
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We collect minimal information to provide our photo sharing service:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Photos:</strong> Images you upload to share with other guests</li>
                  <li><strong>Display Name:</strong> Optional nickname you choose to display with your photos</li>
                  <li><strong>Event Code:</strong> The invitation code to access the photo gallery</li>
                  <li><strong>Technical Data:</strong> Basic device information for app functionality</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Database className="w-5 h-5" />
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We use your information solely to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Display your photos in the shared gallery</li>
                  <li>Show your chosen display name with your photos</li>
                  <li>Provide technical support and improve our service</li>
                  <li>Ensure the security and proper functioning of the app</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Lock className="w-5 h-5" />
                Data Security
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We implement appropriate security measures to protect your photos and personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Photos are stored securely with encrypted filenames</li>
                  <li>Access is limited to guests with the correct event code</li>
                  <li>We use industry-standard encryption for data transmission</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <Users className="w-5 h-5" />
                Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Photos are visible to other guests with access to the same event code</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Request deletion of your photos and data</li>
                  <li>Update or correct your display name</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="font-mono text-sm">privacy@weddingphotos.app</p>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                This privacy policy may be updated from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
