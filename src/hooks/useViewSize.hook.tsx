import { useCallback, useEffect, useReducer } from 'react';

// Initial state
const initialState = {
  width: 0,
  height: 0,
  top: 0, // Distance from the top of the document
  bottom: 0, // Distance from the top of the document + height
};

const sizeReducer = (
  state: typeof initialState,
  action: Partial<typeof initialState>
) => ({ ...state, ...action });

export const useViewSize = () => {
  const [size, dispatch] = useReducer(sizeReducer, initialState);

  const callbackRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      const scrollY = window.scrollY || 0;

      dispatch({
        width: rect.width,
        height: rect.height,
        top: rect.top + scrollY, // Calculate top relative to the document
        bottom: rect.bottom + scrollY, // Calculate bottom relative to the document
      });
    };

    // Initial measurement
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleUpdate = () => dispatch({});
    window.addEventListener('resize', handleUpdate);
    window.addEventListener('scroll', handleUpdate);

    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('scroll', handleUpdate);
    };
  }, []);

  return [size, callbackRef] as const;
};
