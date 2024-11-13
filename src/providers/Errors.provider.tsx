import CustomErrorBoundary from '@/components/atoms/containers/CustomErrorBoundary/CustomErrorBoundary';
import ToastNotification from '@/components/molecules/feedback/ToastNotification';
import rollbar from '@/services/rollbar.service';
import { Provider as RollbarProvider } from '@rollbar/react';
import { isEmpty } from 'lodash';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

// Action types for the reducer
type ErrorsAction =
  | {
      type: 'SET_ERRORS';
      payload: {
        errors: Record<string, any>;
        methodName?: string;
        openToast?: boolean;
      };
    }
  | {
      type: 'SET_TOAST_OPEN';
      payload: boolean;
    }
  | {
      type: 'CLEAR_ERRORS';
    };

// State shape for the reducer
interface ErrorsState {
  errors: Record<string, any>;
  methodName?: string;
  errorsIsEmpty: boolean;
  openToast: boolean;
}

const initialState: ErrorsState = {
  errors: {},
  methodName: undefined,
  errorsIsEmpty: true,
  openToast: false,
};

// Reducer function
const errorsReducer = (
  state: ErrorsState,
  action: ErrorsAction
): ErrorsState => {
  switch (action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload.errors,
        methodName: action.payload.methodName,
        errorsIsEmpty: isEmpty(action.payload.errors),
        openToast: action.payload.openToast ?? state.openToast,
      };
    case 'SET_TOAST_OPEN':
      return {
        ...state,
        openToast: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {},
        methodName: undefined,
        errorsIsEmpty: true,
        openToast: false,
      };
    default:
      return state;
  }
};

// Context definition
interface ErrorsContextType {
  state: ErrorsState;
  setErrorsFunc: (
    errors: Record<string, any>,
    methodName?: string,
    openToast?: boolean
  ) => void;
  setToastOpen: (open: boolean) => void;
  clearErrors: () => void;
}

const ErrorsContext = createContext<ErrorsContextType>({
  state: initialState,
  setErrorsFunc: () => {},
  setToastOpen: () => {},
  clearErrors: () => {},
});

// Provider component
export const ErrorsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(errorsReducer, initialState);

  const setErrorsFunc = (
    errors: Record<string, any>,
    methodName?: string,
    openToast?: boolean
  ): void => {
    // Log error to Rollbar
    rollbar.error(`Error in ${methodName || 'unknown method'}`, errors);

    dispatch({
      type: 'SET_ERRORS',
      payload: { errors, methodName, openToast },
    });
  };

  const setToastOpen = (open: boolean): void => {
    dispatch({
      type: 'SET_TOAST_OPEN',
      payload: open,
    });
  };

  const clearErrors = (): void => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      !state.errorsIsEmpty &&
      state.openToast
    ) {
      setToastOpen(true);
    }
  }, [state.errors, state.errorsIsEmpty, state.openToast]);

  const messageForToast = useMemo(
    (): string =>
      Object.keys(state.errors).length > 0
        ? `<ul>${Object.keys(state.errors)
            .map((item) => `<li>${item}: <b>${state.errors[item]}</b></li>`)
            .join('')}</ul>`
        : '',
    [state.errors]
  );

  return (
    <ErrorsContext.Provider
      value={{ state, setErrorsFunc, setToastOpen, clearErrors }}
    >
      <RollbarProvider instance={rollbar}>
        {!state.errorsIsEmpty && state.openToast && (
          <ToastNotification
            message={messageForToast}
            severity="error"
            open={state.openToast}
            setOpen={setToastOpen}
          />
        )}
        <CustomErrorBoundary>{children}</CustomErrorBoundary>
      </RollbarProvider>
    </ErrorsContext.Provider>
  );
};

// Custom hook to use errors
export const useErrors = (): {
  state: ErrorsState;
  setErrorsFunc: (
    errors: Record<string, any>,
    methodName?: string,
    openToast?: boolean
  ) => void;
  setToastOpen: (open: boolean) => void;
  clearErrors: () => void;
} => useContext(ErrorsContext);
