import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    "@storybook/test",
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/jest'
  ],
 
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public/assets', '../public'],
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
      fallback: {
        ...config.resolve?.fallback,
        buffer: false,
        fs: false, // Add fallback for Node.js `fs` module
      },
    };

    return config;
  },
};

export default config;
