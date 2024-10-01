import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";
import { isEmpty } from "lodash";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomErrorBoundary from "@/components/atoms/containers/CustomErrorBoundry/CustomErrorBoundry.component";

// Custom Error Boundary Component

// Action types for the reducer
type ErrorsAction =
  | {
      type: "SET_ERRORS";
      payload: {
        errors: Record<string, any>;
        methodName?: string;
        openToast?: boolean;
      };
    }
  | {
      type: "SET_TOAST_OPEN";
      payload: boolean;
    }
  | {
      type: "CLEAR_ERRORS";
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
  action: ErrorsAction,
): ErrorsState => {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload.errors,
        methodName: action.payload.methodName,
        errorsIsEmpty: isEmpty(action.payload.errors),
        openToast: action.payload.openToast ?? state.openToast,
      };
    case "SET_TOAST_OPEN":
      return {
        ...state,
        openToast: action.payload,
      };
    case "CLEAR_ERRORS":
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
    openToast?: boolean,
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
    openToast?: boolean,
  ): void => {
    dispatch({
      type: "SET_ERRORS",
      payload: { errors, methodName, openToast },
    });
  };

  const setToastOpen = (open: boolean): void => {
    dispatch({
      type: "SET_TOAST_OPEN",
      payload: open,
    });
  };

  const clearErrors = (): void => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
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
            .join("")}</ul>`
        : "",
    [state.errors],
  );

  return (
    <ErrorsContext.Provider
      value={{ state, setErrorsFunc, setToastOpen, clearErrors }}
    >
      {!state.errorsIsEmpty && state.openToast && (
        <ToastNotification
          message={messageForToast}
          severity="error"
          open={state.openToast}
          setOpen={setToastOpen}
        />
      )}
      <CustomErrorBoundary supportEmail="contact@bridge.financial">
        {children}
      </CustomErrorBoundary>
    </ErrorsContext.Provider>
  );
};

// Custom hook to use errors
export const useErrors = (): {
  state: ErrorsState;
  setErrorsFunc: (
    errors: Record<string, any>,
    methodName?: string,
    openToast?: boolean,
  ) => void;
  setToastOpen: (open: boolean) => void;
  clearErrors: () => void;
} => useContext(ErrorsContext);
