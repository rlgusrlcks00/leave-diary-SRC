import React, { useMemo, useEffect, useState, Suspense } from 'react';
import loadable from '@loadable/component';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import theme2 from './theme/theme';
import ProtectedRoute from './components/ProtectedRoute';

const LoginPage = loadable(() => import('./login/page/LoginPage'));
const DashboardPage = loadable(() => import('./dashboard/page/DashboardPage'));
const ProfilePage = loadable(() => import('./profile/page/ProfilePage'));
const LeaveDiaryPage = loadable(
  () => import('./leavediary/page/LeaveDiaryPage'),
);
const LeaveDiaryListPage = loadable(
  () => import('./leavediary/page/LeaveDiaryListPage'),
);

declare global {
  interface Window {
    tempProperty: string;
  }
}

const AppContent: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  return (
    <ThemeProvider theme={theme2}>
      <CssBaseline />
      <Routes>
        <Route
          path='/login'
          element={
            !isLoggedIn ? <LoginPage /> : <Navigate to='/dashboard' replace />
          }
        />
        <Route
          path='/dashboard'
          element={<ProtectedRoute element={<DashboardPage />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path='/leavediary'
          element={<ProtectedRoute element={<LeaveDiaryPage />} />}
        />
        <Route
          path='/diary'
          element={<ProtectedRoute element={<LeaveDiaryListPage />} />}
        />
        <Route
          path='*'
          element={
            isLoggedIn ? (
              <Navigate to='/dashboard' replace />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
      </Routes>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
    <AppContent />
  </BrowserRouter>
);

export default App;
