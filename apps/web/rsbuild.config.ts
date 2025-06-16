import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const API_BASE_URL = process.env.PUBLIC_API_URL || '';

export default defineConfig({
  // set to 'production' to disable network mock
  // mode: 'production',
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  plugins: [pluginReact()],
  html: {
    title: 'React Web App',
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.PROXY_API_URL,
        pathRewrite: { [API_BASE_URL]: '' },
        // http://localhost:3030/api/v1 -> http://localhost:3000
        // http://localhost:3030/api/v1/foo -> http://localhost:3000/foo
      },
    },
  },
});
