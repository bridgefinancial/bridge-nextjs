import { useCallback, useReducer } from 'react';

// Initial state
const initialState = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

// Reducer for state updates
const sizeReducer = (
  state: typeof initialState,
  action: Partial<typeof initialState>
) => ({ ...state, ...action });

// Hook to measure size and position
export const useViewSize = () => {
  const [size, dispatch] = useReducer(sizeReducer, initialState);

  const callbackRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      dispatch({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
      });
    };

    // Initial measurement
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  return [size, callbackRef] as const;
};
