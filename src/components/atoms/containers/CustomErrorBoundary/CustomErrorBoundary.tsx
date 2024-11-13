import { ErrorBoundary, useRollbar } from '@rollbar/react';
import Image from 'next/image';
import React, { ReactNode, useEffect } from 'react';

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

// Fallback UI Component with Rollbar error logging
const FallbackUI: React.FC<any> = ({ error, resetError }) => {
  const rollbar = useRollbar();

  // Log the error to Rollbar only once using useEffect
  useEffect(() => {
    rollbar.error(error.message, { errorStack: error.stack });
  }, [error, rollbar]);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        style={{
          maxWidth: 500,
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <Image
          src="/assets/images/Bridge-logo.png"
          alt="Logo"
          width={120}
          height={80}
          style={{ marginBottom: '20px' }}
        />
        <p
          style={{
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)',
            fontSize: '22px',
          }}
        >
          Something went wrong
        </p>
        <div
          style={{
            padding: '20px',
            backgroundColor: '#E57373',
            color: 'white',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          <p>
            <small>{error.message}</small>
          </p>
          <p>
            <strong>Error Stack:</strong> <small>{error.stack}</small>
          </p>
        </div>
        <button
          onClick={resetError}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0',
          }}
        >
          Retry
        </button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(
              `Error Message: ${error.message}\nError Stack: ${error.stack}`
            );
            alert('Error details copied to clipboard');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: '#fff',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            margin: '10px 0',
          }}
        >
          Copy Error Details
        </button>
      </div>
    </div>
  );
};

const CustomErrorBoundary: React.FC<CustomErrorBoundaryProps> = ({
  children,
}) => <ErrorBoundary fallbackUI={FallbackUI}>{children}</ErrorBoundary>;

export default CustomErrorBoundary;
