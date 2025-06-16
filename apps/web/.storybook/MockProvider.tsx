/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
import { ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { theme } from '../src/theme';

// #region MockProvider
export type MockProviderProps = {
  children: ReactNode;
};

export default function MockProvider({ children }: MockProviderProps) {
  return (
    // Material UI
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
}
// #endregion
