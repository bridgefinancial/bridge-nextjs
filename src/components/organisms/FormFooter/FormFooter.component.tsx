import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FormAction, { FormActionConfig } from "../forms/FormAction";

interface FormFooterProps {
  isScrolling: boolean;
  previousButtonConfig: FormActionConfig;
  nextButtonConfig: FormActionConfig;
  submitButtonConfig: FormActionConfig;
}

function FormFooter(props: FormFooterProps) {
  const {
    previousButtonConfig,
    nextButtonConfig,
    submitButtonConfig,
    isScrolling,
  } = props;

  const footerRef = useRef<HTMLDivElement>(null); // Ref for the footer
  const [footerHeight, setFooterHeight] = useState(0); // State to track footer height
  const [initialWindowHeight, setInitialWindowHeight] = useState(
    window.innerHeight,
  );
  const [showBorderTop, setShowBorderTop] = useState(false);

  // Scroll event handler
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user has scrolled to the bottom of the page
      // Show the border when the user is NOT at the bottom
      if (windowHeight + scrollPosition >= documentHeight - 1) {
        setShowBorderTop(false);
      } else {
        setShowBorderTop(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track and update footer height
  useLayoutEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    // Update footer height on mount and resize
    updateFooterHeight();

    window.addEventListener("resize", updateFooterHeight);

    return () => {
      window.removeEventListener("resize", updateFooterHeight);
    };
  }, []);

  // Handle keyboard visibility and footer adjustment
  useEffect(() => {
    const handleResize = () => {
      const newWindowHeight = window.innerHeight;
      const isKeyboardVisible = newWindowHeight < initialWindowHeight;

      const footerElement = footerRef.current;
      if (isKeyboardVisible && footerElement) {
        // If the keyboard is visible, adjust the footer position
        footerElement.style.bottom = "0px"; // Adjust as needed
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialWindowHeight, isScrolling]);

  return (
    <div className={"bg-white"}>
      <div
        ref={footerRef}
        id="form-footer"
        style={{
          position: "fixed", // Always fixed
          zIndex: 10000,
          bottom: "0px", // Always at the bottom
          width: "100%",
        }}
        className={
          showBorderTop
            ? "border-t border-solid border-bridge-gray-border bg-white"
            : "bg-white"
        }
      >
        <div className="w-full flex items-center justify-between bg-white py-6 px-16">
          {/* Previous */}
          <FormAction {...previousButtonConfig} />

          {/* Next Page */}
          <FormAction {...nextButtonConfig} />

          {/* Submit */}
          <FormAction {...submitButtonConfig} />
        </div>
      </div>
      <div
        className="bg-white"
        style={{
          height: footerHeight, // Set to the height of the footer
          position: "relative",
          marginTop: footerHeight / 4, // Example margin based on the footer height
        }}
      />
    </div>
  );
}

export default FormFooter;
