import { ThemeVars } from '@storybook/theming';
import { colors } from '../src/theme/theme';
export const lightTheme: ThemeVars = {
  base: 'light',
  fontBase: '"Sora", sans-serif',
  fontCode: '"Manrope", monospace',
  brandTitle: 'Bridge Financial Storybook',
  brandUrl: 'http://bridge.financial',
  brandImage: './assets/images/Bridge-logo.png',
  appContentBg: '#ffffff', // Content background
  appBorderColor: colors.gray700, // Border color
  appBorderRadius: 12,
  textColor: colors.gray900,
  textMutedColor: colors.gray700,
  barTextColor: colors.gray800,
  barHoverColor: colors.bridgeDarkPurple,
  barSelectedColor: colors.bridgeDarkOrange,
  barBg: colors.gray600, // Bar background
  inputBg: '#ffffff',
  inputBorder: colors.gray600,

  inputBorderRadius: 8,
  colorPrimary: colors.bridgeDarkPurple, // Primary accent color
  colorSecondary: colors.bridgeDarkOrange, // Secondary accent color
  appBg: '#ffffff',
  inputTextColor: '#ffffff',
  appPreviewBg: 'white', // Light preview background
  textInverseColor: '#ffffff', // Text color for dark elements
  buttonBg: colors.bridgeDarkPurple, // Background color for buttons
  buttonBorder: colors.bridgeDarkPurple, // Border color for buttons
  booleanBg: '#e0e0e0', // Background for boolean controls
  booleanSelectedBg: colors.bridgeDarkOrange, // Background for selected boolean controls
};

export const darkTheme: ThemeVars = {
  base: 'dark',
  fontBase: '"Sora", sans-serif',
  fontCode: '"Manrope", monospace',
  brandTitle: 'Bridge Financial Storybook',
  brandUrl: 'http://bridge.financial',
  brandImage: './assets/images/Bridge-logo.png',
  appBg: colors.gray900, // Dark background
  appContentBg: colors.bridgeBlack,
  appBorderColor: colors.gray700,
  appBorderRadius: 12,
  textColor: colors.gray600,
  textMutedColor: colors.gray700,
  barTextColor: colors.gray600,
  barHoverColor: colors.bridgeLightPurple,
  barSelectedColor: colors.bridgeDarkOrange,
  barBg: colors.bridgeBlack,
  inputBg: colors.bridgeBlack,
  inputBorder: colors.gray600,
  inputTextColor: colors.gray600,
  inputBorderRadius: 8,
  colorPrimary: colors.bridgeLightPurple, // Primary accent color
  colorSecondary: colors.bridgeDarkOrange, // Secondary accent color
  appPreviewBg: colors.gray800, // Dark preview background
  textInverseColor: '#000000', // Text color for light elements
  buttonBg: colors.bridgeLightPurple, // Background color for buttons
  buttonBorder: colors.bridgeLightPurple, // Border color for buttons
  booleanBg: '#333333', // Background for boolean controls
  booleanSelectedBg: colors.bridgeDarkOrange, // Background for selected boolean controls
};
