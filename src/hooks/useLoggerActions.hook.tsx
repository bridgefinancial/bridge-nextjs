import rollbar from '@/services/rollbar.service';
import { Severity } from '@/types/logger-action.types';
import { camelCase } from 'lodash';
import { useCallback, useMemo } from 'react';
import { Level } from 'rollbar';
import { useLoggerState } from '../providers/LoggerProvider/Logger.provider';

/**
 * Hook to provide methods for interacting with logger state.
 */
export const useLoggerActions = () => {
  const { dispatch } = useLoggerState();

  /**
   * Map Rollbar severity levels to appropriate methods.
   */
  const severityMethods = useMemo(
    () => ({
      error: rollbar.error.bind(rollbar),
      warning: rollbar.warning.bind(rollbar),
      info: rollbar.info.bind(rollbar),
      success: rollbar.info.bind(rollbar), // Rollbar uses `info` for success logs
    }),
    []
  );

  /**
   * Logs a message and updates the state.
   *
   * @param logs - The log details.
   * @param severity - The severity level ('error', 'info', 'success', 'warning').
   * @param methodName - Optional name of the method or action for context.
   */

  // Element implicitly has an 'any' type because expression of type 'Severity' can't be used to index type '{ error: (...args: LogArgument[]) => LogResult; warning: (...args: LogArgument[]) => LogResult; info: (...args: LogArgument[]) => LogResult; success: (...args: LogArgument[]) => LogResult; }'.ts(7053)
  const logMessage = useCallback(
    (
      logs: Record<string, any>,
      severity: Severity,
      methodName?: string
    ): void => {
      const logDetails = {
        ...logs,
        methodName: methodName || 'Unknown method',
      };
      dispatch({ type: 'SET_LOGS', payload: { logs, severity, methodName } });
      severityMethods[severity](
        `Log from ${methodName || 'Unknown method'}`,
        logDetails
      );
    },
    [dispatch, severityMethods]
  );

  /**
   * Shows or hides a toast notification.
   *
   * @param severity - The severity level of the toast.
   * @param open - Whether to open or close the toast.
   * @param message - Optional custom message for the toast.
   * @param autoHideDuration - Duration for which the toast stays visible.
   */
  const toggleToast = useCallback(
    (
      severity: Severity,
      open: boolean,
      message = '',
      autoHideDuration = 10000
    ): void => {
      dispatch({
        type: 'TOGGLE_TOAST',
        payload: { severity, open, message, autoHideDuration },
      });
    },
    [dispatch]
  );

  /**
   * Logs a message and optionally shows a toast notification.
   *
   * @param logs - The log details.
   * @param severity - The severity level of the log.
   * @param methodName - Optional name of the method or action for context.
   * @param showToast - Whether to display a toast notification.
   * @param toastMessage - Optional custom message for the toast.
   * @param autoHideDuration - Duration for which the toast stays visible.
   */
  const logWithToast = useCallback(
    (
      logs: Record<string, any>,
      severity: Severity,
      methodName?: string,
      showToast = false,
      toastMessage = '',
      autoHideDuration = 10000
    ): void => {
      logMessage(logs, severity, methodName);
      if (showToast) {
        toggleToast(
          severity,
          true,
          toastMessage || 'Action completed',
          autoHideDuration
        );
      }
    },
    [logMessage, toggleToast]
  );

  /**
   * Logs an error and optionally shows a toast notification.
   */
  const logError = useCallback(
    (
      logs: Record<string, any>,
      methodName?: string,
      showToast = false,
      toastMessage = 'An error occurred',
      autoHideDuration = 10000
    ): void =>
      logWithToast(
        logs,
        'error',
        methodName,
        showToast,
        toastMessage,
        autoHideDuration
      ),
    [logWithToast]
  );

  /**
   * Logs information and optionally shows a toast notification.
   */
  const logInfo = useCallback(
    (
      logs: Record<string, any>,
      methodName?: string,
      showToast = false,
      toastMessage = 'Information logged',
      autoHideDuration = 10000
    ): void =>
      logWithToast(
        logs,
        'info',
        methodName,
        showToast,
        toastMessage,
        autoHideDuration
      ),
    [logWithToast]
  );

  /**
   * Logs a success message and optionally shows a toast notification.
   */
  const logSuccess = useCallback(
    (
      logs: Record<string, any>,
      methodName?: string,
      showToast = false,
      toastMessage = 'Operation successful',
      autoHideDuration = 10000
    ): void =>
      logWithToast(
        logs,
        'success',
        methodName,
        showToast,
        toastMessage,
        autoHideDuration
      ),
    [logWithToast]
  );

  /**
   * Logs a warning and optionally shows a toast notification.
   */
  const logWarning = useCallback(
    (
      logs: Record<string, any>,
      methodName?: string,
      showToast = false,
      toastMessage = 'Warning logged',
      autoHideDuration = 10000
    ): void =>
      logWithToast(
        logs,
        'warning',
        methodName,
        showToast,
        toastMessage,
        autoHideDuration
      ),
    [logWithToast]
  );

  /**
   * Submits feedback to Rollbar and updates the loading state.
   *
   * @param title - The title of the feedback.
   * @param details - The details of the feedback.
   * @param severity - The severity level of the feedback.
   * @param metadata - Optional additional metadata for the feedback.
   */
  const submitFeedback = useCallback(
    async (
      title: string,
      details: Record<string, any>,
      severity: Severity = 'info',
      metadata?: Record<string, any>
    ): Promise<void> => {
      const id = camelCase(title);
      dispatch({ type: 'SET_LOADING', payload: { id, loading: true } });

      const logDetails = { ...details, title, metadata };
      try {
        severityMethods[severity](title, logDetails);
      } catch (error) {
        console.error('Error submitting feedback to Rollbar:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: { id, loading: false } });
      }
    },
    [dispatch, severityMethods]
  );

  /**
   * Captures a custom telemetry event.
   *
   * @param metadata - Metadata for the event.
   * @param level - Severity level for the event.
   */
  const captureEvent = useCallback(
    (metadata: Record<string, any>, level: Level = 'info'): void => {
      if (rollbar) {
        rollbar.captureEvent(metadata, level);
      } else {
        console.warn('Rollbar is not initialized. Cannot capture event.');
      }
    },
    []
  );

  return {
    logMessage,
    toggleToast,
    logError,
    logInfo,
    logSuccess,
    logWarning,
    logWithToast,
    submitFeedback,
    captureEvent,
  };
};
