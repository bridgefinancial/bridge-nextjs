/**
 * Severity levels for logs and toasts.
 */
export type Severity = 'error' | 'info' | 'success' | 'warning';

/**
 * Details for logging messages or feedback.
 */
export interface LogDetails {
  [key: string]: any;
}

/**
 * Metadata for additional context in feedback submissions.
 */
export interface FeedbackMetadata {
  [key: string]: any;
}
