import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import './styles.css';
import { theme } from './theme';

import { Toaster } from 'react-hot-toast';
import App from './App';

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
            <App />
            <Toaster position="top-center" />
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  );
}
