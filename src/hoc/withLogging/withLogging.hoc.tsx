import colorLogger from "@/utils/color-logger";
import React, { ComponentType, useEffect } from "react";

// Mark all options as optional for extending
export interface WithLoggingOptions {
  shouldLog?: boolean;
  logValues?: any[];
  fileName?: string; // Optional file name for logging context
}

const withLogging = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { shouldLog = false, logValues = [], fileName }: WithLoggingOptions = {},
): React.FC<P> => {
  const WithLoggingComponent: React.FC<P> = (props) => {
    useEffect(() => {
      if (shouldLog) {
        colorLogger.start("WithLogging", fileName); // Use start method for logging start
        logValues.forEach((value) => {
          colorLogger.log("green", "Logging value:", value); // Use the log method for logging values
        });
        colorLogger.end("WithLogging", fileName); // Use end method for logging end
      }
      // Empty dependency array ensures this runs only once on mount
    }, []);

    return <WrappedComponent {...props} />;
  };

  // Set a display name for easier debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  WithLoggingComponent.displayName = `withLogging(${wrappedComponentName})`;

  return WithLoggingComponent;
};

export default withLogging;
