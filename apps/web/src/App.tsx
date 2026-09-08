import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/layout/AppLayout';
import TodayDashboard from './pages/TodayDashboard';
import CareerProfilePage from './pages/CareerProfilePage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TodayDashboard />} />
            <Route path="profile" element={<CareerProfilePage />} />
            {/* Future Routes */}
            {/* <Route path="opportunities" element={<OpportunitiesPage />} /> */}
            {/* <Route path="applications" element={<ApplicationsPage />} /> */}
            {/* <Route path="cv-studio" element={<CVStudioPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
