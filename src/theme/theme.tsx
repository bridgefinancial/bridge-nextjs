// export default theme;
import { createTheme } from '@mui/material/styles';

export const colors = {
  gray900: '#212529',
  gray800: '#6c757d',
  gray600: '#adb5bd',
  red900: '#dc3545',
  blue900: '#0056b3',
  primary: {
    0: '#e3f2fd',
    1: '#bbdefb',
    2: '#90caf9',
    3: '#64b5f6',
    4: '#42a5f5',
    5: '#2196f3',
    6: '#1e88e5',
    7: '#1976d2',
    8: '#1565c0',
    9: '#0d47a1',
  },
  bridgeDarkBlue: '#6ba0f1',
  bridgeLightBlue: '#83c4f4',
  bridgeDarkPurple: '#6a5ace',
  bridgeLightGray: '#f6f6f6',
  bridgeBlack: '#212121',
  bridgeLightPurple: '#a395f7',
  bridgeDarkGreen: '#5dbf6d',
  bridgeLightGreen: '#bce762',
  bridgeOrange: '#fb9f1e',
  bridgeDarkOrange: '#f48421',
};

// Light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.bridgeDarkPurple,
    },
    secondary: {
      main: colors.bridgeDarkPurple,
    },
    error: {
      main: colors.red900,
    },
    text: {
      primary: colors.gray900,
      secondary: colors.gray800,
    },
    background: {
      default: colors.bridgeLightGray,
      paper: '#ffffff', // Background for components like cards
    },
  },
  typography: {
    fontFamily: 'Sora, sans-serif',
    htmlFontSize: 16,
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
      color: colors.gray900,
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.gray900,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.gray900,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.gray900,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      color: colors.gray900,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: colors.gray900,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: colors.gray900,
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.bridgeBlack,
          '&.Mui-checked': {
            color: colors.bridgeBlack,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '54px',
          borderRadius: '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bridgeLightGray,
          color: colors.gray900,
        },
      },
    },
  },
});

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.bridgeLightPurple,
    },
    secondary: {
      main: colors.bridgeDarkPurple,
    },
    error: {
      main: colors.red900,
    },
    text: {
      primary: colors.gray600, // Lighter color for text in dark mode
      secondary: colors.gray600,
    },
    background: {
      default: colors.gray900, // Dark background
      paper: colors.bridgeBlack, // For paper components like cards
    },
  },
  typography: {
    fontFamily: 'Sora, sans-serif',
    htmlFontSize: 16,
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 400,
      color: colors.gray600, // Text color for body in dark mode
    },
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: colors.gray600, // Header text color in dark mode
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.gray600,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.gray600,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 600,
      color: colors.gray600,
    },
    h5: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: colors.gray600,
    },
    h6: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: colors.gray600,
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.gray600,
          '&.Mui-checked': {
            color: colors.gray600,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '54px',
          borderRadius: '12px',
          backgroundColor: colors.bridgeDarkPurple,
          color: colors.gray600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: colors.bridgeBlack,
          color: colors.gray600,
        },
      },
    },
  },
});
const theme = lightTheme;
export default theme;
