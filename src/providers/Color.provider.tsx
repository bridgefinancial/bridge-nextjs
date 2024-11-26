import { darkTheme, lightTheme } from '@/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

// Action types for the reducer
type ColorsAction =
  | { type: 'SET_LIGHT_THEME' }
  | { type: 'SET_DARK_THEME' }
  | { type: 'SET_SYSTEM_THEME' };

// State shape for the reducer
interface ColorsState {
  themeMode: 'light' | 'dark' | 'system';
}

// Initial state
const initialState: ColorsState = {
  themeMode: 'light', // default to light theme
};

// Reducer function
const colorsReducer = (
  state: ColorsState,
  action: ColorsAction
): ColorsState => {
  switch (action.type) {
    case 'SET_LIGHT_THEME':
      return { themeMode: 'light' };
    case 'SET_DARK_THEME':
      return { themeMode: 'dark' };
    case 'SET_SYSTEM_THEME':
      return { themeMode: 'system' };
    default:
      return state;
  }
};

// Context definition
interface ColorsContextType {
  state: ColorsState;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
}

const ColorsContext = createContext<ColorsContextType>({
  state: initialState,
  setLightTheme: () => {},
  setDarkTheme: () => {},
  setSystemTheme: () => {},
});

// Provider component
export const ColorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(colorsReducer, initialState);

  const setLightTheme = (): void => {
    dispatch({ type: 'SET_LIGHT_THEME' });
  };

  const setDarkTheme = (): void => {
    dispatch({ type: 'SET_DARK_THEME' });
  };

  const setSystemTheme = (): void => {
    dispatch({ type: 'SET_SYSTEM_THEME' });
  };

  // Memoize the selected theme
  const theme = useMemo(() => {
    switch (state.themeMode) {
      case 'dark':
        return darkTheme;
      case 'light':
        return lightTheme;
      case 'system':
        return window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
          ? darkTheme
          : lightTheme;
      default:
        return lightTheme;
    }
  }, [state.themeMode]);

  // Effect to handle system theme changes with addEventListener
  useEffect(() => {
    if (state.themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleChange = (event: MediaQueryListEvent) => {
        dispatch({
          type: event.matches ? 'SET_DARK_THEME' : 'SET_LIGHT_THEME',
        });
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [state.themeMode]);

  return (
    <ColorsContext.Provider
      value={{ state, setLightTheme, setDarkTheme, setSystemTheme }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalize styles */}
        {children}
      </ThemeProvider>
    </ColorsContext.Provider>
  );
};

// Custom hook to use the color provider
export const useThemeColors = (): ColorsContextType =>
  useContext(ColorsContext);

export default ColorsProvider;
