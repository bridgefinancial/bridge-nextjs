import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export const useAuth = () => useContext(AuthContext);

export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

export interface SignUpDto {
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  email: string;
  password: string;
  terms: boolean;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
}

type AuthAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: boolean };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const AuthContext = createContext<{
  state: AuthState;
  login: (dto: LoginDto, callback?: () => void) => Promise<void>;
  logout: () => void;
  signUp: (dto: SignUpDto, callback?: () => void) => Promise<void>;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  signUp: async () => {},
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: !!action.payload, error: null, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, user: null, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
}

function validateLogin(dto: LoginDto) {
  const errors: { email?: string; password?: string } = {};
  if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) errors.email = "Invalid email address.";
  if (!dto.password) errors.password = "Password is required.";
  return Object.keys(errors).length > 0 ? JSON.stringify(errors) : null;
}

function validateSignUp(dto: SignUpDto) {
  const errors: { [key: string]: string } = {};
  if (!dto.firstName.trim()) errors.firstName = "First name is required.";
  if (!dto.lastName.trim()) errors.lastName = "Last name is required.";
  if (!dto.businessName.trim()) errors.businessName = "Business name is required.";
  if (!dto.industry.trim()) errors.industry = "Industry is required.";
  if (!dto.email || !/\S+@\S+\.\S+/.test(dto.email)) errors.email = "Invalid email address.";
  if (!dto.password || dto.password.length < 8) errors.password = "Password must be at least 8 characters long.";
  if (!dto.terms) errors.terms = "You must accept the terms and conditions.";
  return Object.keys(errors).length > 0 ? JSON.stringify(errors) : null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (dto: LoginDto, callback?: () => void) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const error = validateLogin(dto);
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }
    try {
      const simulatedResponse: User = { first_name: "Test", last_name: "User", email: dto.email };
      dispatch({ type: 'SET_USER', payload: simulatedResponse });
      if (callback) callback();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const signUp = async (dto: SignUpDto, callback?: () => void) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const error = validateSignUp(dto);
    if (error) {
      dispatch({ type: 'SET_ERROR', payload: error });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }
    try {
      const simulatedResponse: User = { first_name: dto.firstName, last_name: dto.lastName, email: dto.email };
      dispatch({ type: 'SET_USER', payload: simulatedResponse });
      if (callback) callback();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Logout failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
