import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import MockProvider from './MockProvider';
import { handlers } from './msw';

import '../src/styles.css';

// Initialize Mock Service Worker
initialize();

const preview: Preview = {
  parameters: {
    // layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: MINIMAL_VIEWPORTS,
      default: 'mobile',
    },
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story) => (
      <MockProvider>
        <Story />
      </MockProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
