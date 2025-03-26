import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './router/AppRouter';
import LoadingSpinner from './components/shared/LoadingSpinner';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <AppRouter />
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;