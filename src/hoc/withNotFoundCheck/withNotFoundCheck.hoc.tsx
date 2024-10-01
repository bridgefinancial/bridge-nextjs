import React from "react";
import { notFound } from "next/navigation";

// Higher-Order Component that handles `notFound` logic
const withNotFoundCheck = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  paramKey: string
) => {
  return (props: P & { params: Record<string, string> }) => {
    const paramValue = props.params[paramKey];
    const paramId = parseInt(paramValue);

    if (!paramValue || isNaN(paramId)) {
      notFound();
    }

    return <WrappedComponent {...props} />;
  };
};

export default withNotFoundCheck;
