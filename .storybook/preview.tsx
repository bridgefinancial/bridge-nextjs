import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/app/globals.css'; // Import Tailwind CSS or other global styles
import ColorsProvider from '../src/providers/Color.provider';
import { customViewPorts } from '../src/utils/viewports';
import { darkTheme, lightTheme } from './themes';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
  },
  layout: 'fullscreen', // Removes the default Storybook padding for a cleaner look
  viewport: {
    viewports: customViewPorts, // Add custom viewports
  },
};

export const decorators = [
  (Story) => (
    <ColorsProvider>
      <Story />
    </ColorsProvider>
  ),
];

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
