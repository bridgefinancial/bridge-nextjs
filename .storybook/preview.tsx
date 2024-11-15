// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css'; // Import Tailwind CSS or other global styles
import ColorsProvider from '../src/providers/Color.provider';

// .storybook/preview.js

export const decorators = [
  (Story) => (
    <ColorsProvider>
      <Story />
    </ColorsProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators,
};

export default preview;
