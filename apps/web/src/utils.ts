import type { JSX } from 'react';
import { requireAuth as requireAuthOriginal } from './auth';
import { SIGN_IN_ROUTE } from './routes';

export function requireAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
) {
  return requireAuthOriginal(Component, {
    fallbackPath: SIGN_IN_ROUTE,
  });
}
