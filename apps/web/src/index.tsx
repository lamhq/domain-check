import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router';
import App from './App';
import { AuthProvider } from './auth';

import './styles.css';
import { theme } from './theme';

// React Query
const queryClient = new QueryClient();

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = reactDom.createRoot(rootEl);
  root.render(
    <StrictMode>
      {/* Material UI */}
      <ThemeProvider theme={theme}>
        {/* React Router */}
        <BrowserRouter>
          {/* React Query */}
          <QueryClientProvider client={queryClient}>
            {/* Auth Provider */}
            <AuthProvider>
              <App />
            </AuthProvider>
            <Toaster position="top-center" />
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  );
}
