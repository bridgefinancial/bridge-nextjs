// LoggerProvider.tsx

import rollbar from '@/services/rollbar.service';
import { Severity } from '@/types/logger-action.types';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

/**
 * Action types for managing logger state.
 */
type LoggerAction =
  | {
      type: 'SET_LOGS';
      payload: {
        logs: Record<string, any>;
        severity: Severity;
        methodName?: string;
      };
    }
  | {
      type: 'CLEAR_LOGS';
      payload: Severity;
    }
  | {
      type: 'TOGGLE_TOAST';
      payload: {
        severity: Severity;
        open: boolean;
        message?: string;
        autoHideDuration?: number;
      };
    }
  | {
      type: 'SET_LOADING';
      payload: { id: string; loading: boolean };
    };

/**
 * Logger state structure.
 */
interface LoggerStateShape {
  logs: {
    error: Record<string, any>;
    info: Record<string, any>;
    success: Record<string, any>;
    warning: Record<string, any>;
  };
  logsEmpty: {
    error: boolean;
    info: boolean;
    success: boolean;
    warning: boolean;
  };
  toasts: {
    severity: Severity;
    open: boolean;
    message: string;
    autoHideDuration: number;
  };
  loading: Record<string, boolean>;
}

/**
 * Combined context type.
 */
interface LoggerContextType {
  state: LoggerStateShape;
  dispatch: Dispatch<LoggerAction>;
}

const initialState: LoggerStateShape = {
  logs: {
    error: {},
    info: {},
    success: {},
    warning: {},
  },
  logsEmpty: {
    error: true,
    info: true,
    success: true,
    warning: true,
  },
  toasts: {
    severity: 'info',
    open: false,
    message: '',
    autoHideDuration: 10000,
  },
  loading: {},
};

/**
 * Reducer function to manage logger state.
 */
const loggerReducer = (
  state: LoggerStateShape,
  action: LoggerAction
): LoggerStateShape => {
  switch (action.type) {
    case 'SET_LOGS': {
      const { logs, severity } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [severity]: { ...state.logs[severity], ...logs },
        },
        logsEmpty: {
          ...state.logsEmpty,
          [severity]: isEmpty(logs),
        },
      };
    }
    case 'CLEAR_LOGS': {
      const { payload: severity } = action;
      return {
        ...state,
        logs: { ...state.logs, [severity]: {} },
        logsEmpty: { ...state.logsEmpty, [severity]: true },
      };
    }
    case 'TOGGLE_TOAST': {
      const {
        severity,
        open,
        message = '',
        autoHideDuration = 10000,
      } = action.payload;
      return {
        ...state,
        toasts: { severity, open, message, autoHideDuration },
      };
    }
    case 'SET_LOADING': {
      const { id, loading } = action.payload;
      return {
        ...state,
        loading: {
          ...state.loading,
          [id]: loading,
        },
      };
    }
    default:
      return state;
  }
};

/**
 * Logger state context.
 */
const LoggerStateContext = createContext<LoggerContextType | undefined>(
  undefined
);

/**
 * Fallback UI Component with Rollbar error logging.
 */
const FallbackUI: React.FC<any> = ({ error, resetError }) => {
  useEffect(() => {
    if (rollbar) {
      rollbar.error(error.message, { errorStack: error.stack });
    }
  }, [error]);
  // it's important that these styles are inline
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        style={{
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <Image
          src="/assets/images/Bridge-logo.png"
          alt="Logo"
          width={120}
          height={80}
          style={{ marginBottom: '20px' }}
        />
        <p
          style={{
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)',
            fontSize: '22px',
          }}
        >
          Something went wrong
        </p>
        <div
          style={{
            padding: '20px',
            backgroundColor: '#E57373',
            color: 'white',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          <p>
            <small>{error.message}</small>
          </p>
          <p>
            <strong>Error Stack:</strong> <small>{error.stack}</small>
          </p>
        </div>
        <button
          onClick={resetError}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0',
          }}
        >
          Retry
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `Error Message: ${error.message}\nError Stack: ${error.stack}`
            );
            alert('Error details copied to clipboard');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0',
          }}
        >
          Copy Error Details
        </button>
      </div>
    </div>
  );
};

/**
 * LoggerStateProvider to provide logger state and dispatch to the application.
 */
export const LoggerStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(loggerReducer, initialState);

  return (
    <LoggerStateContext.Provider value={{ state, dispatch }}>
      <RollbarProvider instance={rollbar}>
        <ErrorBoundary fallbackUI={FallbackUI}>{children}</ErrorBoundary>
      </RollbarProvider>
    </LoggerStateContext.Provider>
  );
};

/**
 * Hook to access logger state.
 *
 * @throws Error if used outside LoggerStateProvider.
 */
export const useLoggerState = (): LoggerContextType => {
  const context = useContext(LoggerStateContext);
  if (!context) {
    throw new Error('useLoggerState must be used within LoggerStateProvider');
  }
  return context;
};
