export interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export type ToastAction =
  | { type: 'SHOW_SUCCESS'; message: string }
  | { type: 'SHOW_ERROR'; message: string }
  | { type: 'HIDE_TOAST' };

export const initialToastState: ToastState = {
  open: false,
  message: '',
  severity: 'info',
};

export const toastReducer = (
  state: ToastState,
  action: ToastAction,
): ToastState => {
  switch (action.type) {
    case 'SHOW_SUCCESS':
      return { open: true, message: action.message, severity: 'success' };
    case 'SHOW_ERROR':
      return { open: true, message: action.message, severity: 'error' };
    case 'HIDE_TOAST':
      return { ...state, open: false };
    default:
      return state;
  }
};
