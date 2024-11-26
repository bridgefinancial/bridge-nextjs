'use client';
import { useCallback, useEffect, useState } from 'react';

// Define the type for scroll options (optional)
interface ScrollToOptions {
  top?: number; // The vertical scroll position
  behavior?: 'auto' | 'smooth'; // Scroll behavior
}

const useScrollTo = (options?: ScrollToOptions) => {
  // Check if window is defined (to handle SSR or non-browser environments)
  const isWindowDefined = typeof window !== 'undefined';
  const [scrolledToTop, setScrolledToTop] = useState(false);
  // State to store the window dimensions and scale
  const [dimensions, setDimensions] = useState({
    width: isWindowDefined ? window.innerWidth : 0,
    height: isWindowDefined ? window.innerHeight : 0,
    scale: isWindowDefined ? window.devicePixelRatio : 1,
  });

  // State to store the current scroll position (using the `html` tag)
  const [scrollPosition, setScrollPosition] = useState<number>(
    isWindowDefined ? document.documentElement.scrollTop : 0,
  );

  // Function to get the current scroll position from the `html` tag dynamically
  const getScrollPosition = () => document.documentElement.scrollTop;

  // Update scroll position and dimensions on scroll and resize
  useEffect(() => {
    if (!isWindowDefined) return; // Exit early if window is not defined

    const handleScroll = () => {
      setScrollPosition(getScrollPosition());
      setScrolledToTop(getScrollPosition() === 0);
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.devicePixelRatio,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup the event listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isWindowDefined]);

  // Define the onChange function that checks for the scroll position
  const onChange = useCallback(
    (scrollOptions?: ScrollToOptions) => {
      if (!isWindowDefined) return; // Prevent errors in non-browser environments

      const { top = 0, behavior = 'smooth' } = scrollOptions || options || {}; // Fallback to options or default

      const scrollTop = getScrollPosition();

      // Check if the user is not already at the desired position
      if (scrollTop !== top) {
        window.scrollTo({
          top, // Use the top value from options
          behavior, // Use the behavior from options
        });

        setScrolledToTop(top === 0); // Update scrolledToTop based on the scroll position
      }
    },
    [options, isWindowDefined], // Dependency is the options passed to the hook
  );

  // Return the onChange function, the current scroll position, and window dimensions/scale
  return { onChange };
};

export default useScrollTo;
