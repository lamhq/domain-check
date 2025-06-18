import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  plugins: [pluginReact()],
  html: {
    title: 'React Web App',
  },

  // the `server` setting only work for local development
  server: {
    proxy: {
      // proxy api requests starting with /api to the API server
      '/api': {
        target: process.env.PROXY_API_URL,
        pathRewrite: { ['/api']: '' },
      },
    },
  },
});
