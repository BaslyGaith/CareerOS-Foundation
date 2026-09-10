import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import TodayDashboard from './pages/TodayDashboard';
import OpportunitiesPage from './pages/OpportunitiesPage';
import CVStudioPage from './pages/CVStudioPage';
import CareerProfilePage from './pages/CareerProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TodayDashboard />} />
            <Route path="opportunities" element={<OpportunitiesPage />} />
            <Route path="cv-studio" element={<CVStudioPage />} />
            <Route path="profile" element={<CareerProfilePage />} />
            {/* Sprint 3+ */}
            {/* <Route path="applications" element={<ApplicationsPage />} /> */}
            {/* <Route path="interviews" element={<InterviewsPage />} /> */}
            {/* <Route path="documents" element={<DocumentsPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
