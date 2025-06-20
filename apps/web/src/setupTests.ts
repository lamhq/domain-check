import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { TextDecoder, TextEncoder } from 'node:util';

// allow mocking react-router
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// disable automatic DOM dump
configure({
  getElementError: (message: string | null) => {
    const error = new Error(message ?? 'Element not found');
    error.name = 'TestingLibraryElementError';
    error.stack = undefined;
    return error;
  },
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
