import React from 'react';

/**
 * A Higher-Order Component (HOC) that ensures the wrapped component does not run on the client side.
 * If `window` is detected, an error is thrown to prevent client-side rendering.
 *
 * @param WrappedComponent - The component to wrap and protect from client-side execution.
 *
 * @returns A component that only renders on the server side.
 *
 * @example
 * const ServerOnlyComponent = withNoClientRendering(MyComponent);
 *
 * export default ServerOnlyComponent;
 */
const withNoClientRendering = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const ServerOnlyWrapper = (props: P) => {
    if (typeof window !== 'undefined') {
      console.error('This component should not run on the client side.');
      throw new Error(
        'Client-side features are being used in a server-side component.',
      );
    }

    return <WrappedComponent {...props} />;
  };

  ServerOnlyWrapper.displayName = `withNoClientRendering(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ServerOnlyWrapper;
};

export default withNoClientRendering;
