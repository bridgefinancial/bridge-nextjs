

# Higher-Order Components (HOCs) in Modern React

With the introduction of Hooks in React 16.8 back in 2018, many developers have shifted away from Higher-Order Components (HOCs) in favor of the newer patterns provided by Hooks. However, HOCs still hold a valuable place in the React ecosystem, especially in specific scenarios where their design pattern offers distinct advantages.

## The Continued Relevance of Higher-Order Components

While Hooks and other patterns like Render Props have become popular, HOCs can still be extremely useful depending on your application's design pattern. One of the key areas where HOCs shine is in situations where you need to attach data or behavior to a component that is used further down in the component tree. This is particularly beneficial in cases where:

- **Centralized Data Fetching**: HOCs can be used to encapsulate and centralize data-fetching logic. This allows you to inject data into multiple components without repeating the data-fetching logic in each component.

- **Reusability and Consistency**: HOCs allow you to create reusable logic that can be applied consistently across various components. This is useful when you need to apply the same behavior, such as data fetching or authentication checks, to multiple components.

- **Performance Optimization**: HOCs can be more performant than Hooks in certain scenarios because they allow for memoization and control over component lifecycle methods, which can reduce unnecessary re-renders and API calls.

### Example 1: Using an HOC to Attach Data

Consider a scenario where you need to fetch user profile data and inject it into multiple components. Instead of writing the data-fetching logic in each component, you can create an HOC that handles this logic and passes the data as props to the wrapped components.

```tsx
import React, { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { UserProfile } from '../types/UserProfile';

const queryClient = new QueryClient();

async function fetchUserProfile(): Promise<UserProfile> {
  const response = await fetch('https://api.example.com/user/profile');
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
}

function withUserProfileData(WrappedComponent) {
  return function WithUserProfileDataComponent(props) {
    const { data, error, isLoading } = useQuery<UserProfile, Error>('userProfile', fetchUserProfile);

    return (
      <WrappedComponent 
        data={data} 
        loading={isLoading} 
        error={error} 
        {...props} 
      />
    );
  };
}
```

### Example 2: HOC for Authentication Checks

Another common use case for HOCs is adding authentication checks to components. You can create an HOC that checks whether a user is authenticated before allowing them to access a component. If the user is not authenticated, the HOC can redirect them to a login page or show an error message.

```tsx
import React from 'react';
import { useHistory } from 'react-router-dom';

// Simulated authentication check
function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// HOC that adds authentication check to a component
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const history = useHistory();

    if (!isAuthenticated()) {
      history.push('/login');
      return null; // or return a message or a different component
    }

    return <WrappedComponent {...props} />;
  };
}
```

### Example 3: HOC for Error Boundary

HOCs can also be used to wrap components with error boundaries, allowing you to catch JavaScript errors anywhere in the child component tree, log those errors, and display a fallback UI.

```tsx
import React from 'react';

// HOC that wraps a component with an error boundary
function withErrorBoundary(WrappedComponent, FallbackComponent) {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.error("Error caught by ErrorBoundary: ", error, info);
    }

    render() {
      if (this.state.hasError) {
        return <FallbackComponent />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

// Example usage
function MyComponent() {
  // This component might throw an error
  return <div>My Component</div>;
}

function ErrorFallback() {
  return <div>Something went wrong. Please try again later.</div>;
}

const MyComponentWithErrorBoundary = withErrorBoundary(MyComponent, ErrorFallback);
```

### Example 4: HOC for Theming

You can use an HOC to inject theme properties into components, ensuring that your application has a consistent look and feel without manually passing theme-related props through each component.

```tsx
import React from 'react';

// Simulated theme provider
const theme = {
  primaryColor: 'blue',
  secondaryColor: 'green',
};

// HOC that injects theme into a component
function withTheme(WrappedComponent) {
  return function WithThemeComponent(props) {
    return <WrappedComponent theme={theme} {...props} />;
  };
}

// Example component using theme
function ThemedButton({ theme, label }) {
  return (
    <button style={{ backgroundColor: theme.primaryColor }}>
      {label}
    </button>
  );
}

const ThemedButtonWithTheme = withTheme(ThemedButton);
```

### Example 5: HOC for Logging Component Render Time

You can use an HOC to log how long it takes for a component to render. This is useful for performance monitoring and debugging.

```tsx
import React, { useEffect } from 'react';

// HOC that logs render time
function withRenderTimeLogger(WrappedComponent) {
  return function WithRenderTimeLoggerComponent(props) {
    const startTime = performance.now();

    useEffect(() => {
      const endTime = performance.now();
      console.log(`Render time for ${WrappedComponent.name}: ${endTime - startTime}ms`);
    });

    return <WrappedComponent {...props} />;
  };
}

// Example component
function MyComponent() {
  return <div>Rendering MyComponent...</div>;
}

const MyComponentWithRenderTimeLogger = withRenderTimeLogger(MyComponent);
```

### Summary of Examples

These examples demonstrate the versatility and utility of Higher-Order Components in React, showing how they can be used for various purposes like data fetching, authentication, error handling, theming, and performance logging. While newer patterns like Hooks are now more common, HOCs remain a powerful tool for certain scenarios, particularly when you need to apply the same logic across multiple components in a consistent and efficient manner.

