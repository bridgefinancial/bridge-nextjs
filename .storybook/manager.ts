import { addons } from '@storybook/manager-api';
import { darkTheme, lightTheme } from './themes';

// Check for system dark mode preference
const isDarkMode =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({
  theme: isDarkMode ? darkTheme : lightTheme,
});
