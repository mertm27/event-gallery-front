import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CodeGate } from './pages/CodeGate';
import { GalleryPage } from './pages/GalleryPage';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { AdminPlaceholder } from './pages/AdminPlaceholder';
import { Toasts } from './components/Toasts';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on 404 errors (event not found)
        if (error instanceof Error && error.message.includes('not found')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<CodeGate />} />
            <Route path="/:token" element={<GalleryPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<AdminPlaceholder />} />
          </Routes>
          <Toasts />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;