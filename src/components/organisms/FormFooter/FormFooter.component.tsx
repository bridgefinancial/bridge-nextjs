import theme from '@/theme/theme';
import { useMediaQuery } from '@mui/material';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import FormAction, { FormActionConfig } from '../forms/FormAction';

export interface FormFooterProps {
  isScrolling: boolean;
  previousButtonConfig: FormActionConfig;
  nextButtonConfig: FormActionConfig;
  submitButtonConfig: FormActionConfig;
}

function FormFooter(props: FormFooterProps) {
  const { previousButtonConfig, nextButtonConfig, submitButtonConfig } = props;

  const footerRef = useRef<HTMLDivElement>(null); // Ref for the footer
  const [footerHeight, setFooterHeight] = useState<number>(0); // State to track footer height
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
  const [showBorderTop, setShowBorderTop] = useState<boolean>(false); // Border state

  // Track and update footer height dynamically
  useLayoutEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    // Update footer height on mount and resize
    updateFooterHeight();
    window.addEventListener('resize', updateFooterHeight);

    return () => {
      window.removeEventListener('resize', updateFooterHeight);
    };
  }, []);

  // Scroll event handler with debouncing
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollPosition =
          window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Only set border top when the user is not at the bottom
        setShowBorderTop(windowHeight + scrollPosition < documentHeight - 10);
      }, 100); // Wait for scrolling to stop for 100ms before changing state
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Conditionally apply padding for mobile or desktop
  const classesForFooterContainer = useMemo(
    () => (isMobile ? 'px-3 pb-3 pt-3' : 'py-3 px-8'),
    [isMobile]
  );

  const buttonStyle = useMemo(() => {
    if (isMobile) {
      return {
        width: 120,
        height: 45,
        cursor: 'pointer',
      };
    } else {
      return {
        width: 110,
        cursor: 'pointer',
        height: 48,
      };
    }
  }, [isMobile]);

  const textPropsForButton = useMemo(() => {
    return {
      fontWeight: 'bold',
      fontSize: '24px',
    };
  }, []);

  return (
    <div className={'bg-white'}>
      <div
        ref={footerRef}
        id="form-footer"
        style={{
          position: 'fixed', // Always fixed at the bottom
          zIndex: 100,
          bottom: '0px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.75)', // Semi-transparent background to show blur
          transition: 'border-top 0.2s ease-in-out', // Smooth border transition
          // Ensure backdrop-filter compatibility across browsers
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)', // Safari support
        }}
        className={
          showBorderTop ? 'border-t border-solid border-bridge-gray-border' : ''
        }
      >
        <div
          id="glass-content"
          className={`w-full flex items-center justify-between ${classesForFooterContainer}`}
        >
          {/* Previous Action */}
          <FormAction
            {...previousButtonConfig}
            sx={buttonStyle}
            textProps={textPropsForButton}
          />

          {/* Next Action */}
          <FormAction
            {...nextButtonConfig}
            sx={buttonStyle}
            textProps={textPropsForButton}
          />

          {/* Submit Action */}
          <FormAction
            {...submitButtonConfig}
            sx={buttonStyle}
            textProps={textPropsForButton}
          />
        </div>
      </div>
      <div
        className="bg-white"
        style={{
          height: footerHeight, // Set placeholder height to match the footer
          marginTop: footerHeight / 4, // Optional margin adjustment
        }}
      />
    </div>
  );
}

export default FormFooter;
