import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../src/auth';
import { theme } from '../src/theme';

// #region MockProvider
export type MockProviderProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export default function MockProvider({ children }: MockProviderProps) {
  return (
    // Material UI
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider
            initialState={{ user: { id: '123', email: 'admin@example.com' } }}
          >
            {children}
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}
// #endregion
