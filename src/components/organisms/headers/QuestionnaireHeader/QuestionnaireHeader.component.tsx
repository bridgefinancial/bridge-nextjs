"use client";

import GradientBox from "@/components/atoms/containers/GradientBox";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

interface QuestionnaireHeaderProps {}

const HeaderProgressBar = () => {
  return <div>QuestionnaireHeader.component</div>;
};

const QuestionnaireHeader = (props: QuestionnaireHeaderProps) => {
  const [dropShadowEnabled, setDropShadowEnabled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null); // Ref to track the header
  const [shrinkHeader, setShrinkHeader] = useState(false);

  // Scroll event handler
  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (scrollPosition > 0) {
        setDropShadowEnabled(true);
        setShrinkHeader(true); // Shrink the header when not at the top
      } else {
        setDropShadowEnabled(false);
        setShrinkHeader(false); // Restore normal header size when at the top
      }
    };

    // Update header height
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Run once to set the initial header height
    updateHeaderHeight();

    // Add scroll and resize event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHeaderHeight); // Adjust height on window resize

    // Clean up event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <div className="bg-white">
      <div
        ref={headerRef}
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "white",
          zIndex: 100000,
        }}
      >
        {/* MOBILE HEADER */}
        <div
          style={{
            width: "100%",
            height: shrinkHeader ? 55 : 75,
          }}
          className={`sticky top-0 w-screen md:hidden bg-white transition-shadow duration-300 ${
            dropShadowEnabled ? "shadow-md" : ""
          }`}
        >
          <div className={`w-full h-full grid grid-cols-3 `}>
            {" "}
            {/* Reduced padding */}
            {/* LEFT MOBILE HEADER */}
            <div>{/* Add any button or icon here if needed */}</div>
            {/* CENTER MOBILE HEADER */}
            <div className="flex items-center justify-center">
              <Image
                width={shrinkHeader ? 85 : 90} // Shrink the logo when header shrinks
                height={shrinkHeader ? 17 : 22}
                className="transition-all duration-300" // Smooth transition for size change
                alt="Bridge logo"
                src="/assets/images/Bridge-logo.png"
              />
            </div>
            {/* RIGHT MOBILE HEADER */}
            <div />
          </div>
          <GradientBox containerStyle={{ height: 5 }} />
          {/* <div className="w-full h-[3px] linear-gradient-orange-purple-blue" /> */}
        </div>

        {/* DESKTOP NAV */}
        <div
          className={`sticky top-0 hidden md:flex w-full flex-col py-7 px-16 bg-white z-10 transition-shadow duration-300 ${
            dropShadowEnabled ? "shadow-md" : ""
          }
         `}
        >
          <Image
            width={120}
            height={34.23}
            className="max-w-[120px]"
            alt="Bridge logo"
            src="/assets/images/Bridge-logo.png"
          />
        </div>
      </div>

      {/* Spacer div to account for header height */}
      <div
        className="bg-white"
        style={{
          height: headerHeight,
          position: "relative",
          backgroundColor: "white",
          marginBottom: headerHeight / 4,
        }}
      />
    </div>
  );
};

export default QuestionnaireHeader;
