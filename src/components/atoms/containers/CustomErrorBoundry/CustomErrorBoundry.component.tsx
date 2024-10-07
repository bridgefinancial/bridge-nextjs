import React, { useState, ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import Image from "next/image";

interface CustomErrorBoundaryProps {
  children: ReactNode;
  supportEmail: string; // Email address for support
  emailSubject?: string; // Optional subject for the email
  emailBodyPrefix?: string; // Optional prefix for the email body message
}

const CustomErrorBoundary: React.FC<CustomErrorBoundaryProps> = ({
  children,
  supportEmail,
  emailSubject = "Bug Report",
  emailBodyPrefix = "Hello Support Team,\n\nI encountered an issue with the application. Below are the details:",
}) => {
  const [componentStack, setComponentStack] = useState<string | null>(null);

  const handleErrorLogging = (
    error: Error,
    errorInfo?: { componentStack?: string | null },
  ) => {
    console.error("Error:", error);
    if (errorInfo && errorInfo.componentStack) {
      const stack = errorInfo.componentStack || "No component stack available";
      setComponentStack(stack);
      console.error("Component Stack:", stack);
    }
  };

  const handleResetError = (): void => {
    setComponentStack(null);
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    margin: "10px 0",
    textAlign: "center" as const,
    display: "inline-block",
  };

  const linkStyle = {
    color: "#007BFF",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  };

  return (
    <ErrorBoundary
      onError={handleErrorLogging}
      onReset={handleResetError}
      fallbackRender={({ error, resetErrorBoundary }: FallbackProps) => (
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div
            style={{
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <Image
                src="/assets/images/Bridge-logo.png"
                alt="Logo"
                width={120}
                height={80}
              />
            </div>

            <p
              style={{
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.5)",
                fontSize: "22px",
                marginBottom: "20px",
              }}
            >
              Something went wrong
            </p>
            <p
              style={{
                textTransform: "uppercase",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              {" "}
              <strong>Error Message:</strong>
            </p>

            <div
              style={{
                borderRadius: "10px",
                padding: "20px",
                backgroundColor: "#E57373",
                color: "white",
                marginBottom: "10px",
                maxHeight: "20vh",
                overflowY: "scroll",
              }}
            >
              <p>
                <small>{error.message}</small>
              </p>
              <br />
              <p>
                <strong>Error Stack:</strong> <small>{error.stack}</small>
              </p>
            </div>
            {componentStack && (
              <>
                <br />

                <p
                  style={{
                    textTransform: "uppercase",
                    marginBottom: 10,
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {" "}
                  <strong>Component Stack Trace:</strong>
                </p>
                <div
                  style={{
                    padding: "10px",
                    overflowY: "scroll",
                    maxHeight: "20vh",

                    backgroundColor: "#FFCDD2",
                    borderRadius: "10px",
                    color: "#B71C1C",
                  }}
                >
                  <pre>
                    <small>{componentStack}</small>
                  </pre>
                </div>
              </>
            )}
            <br />
            <button
              onClick={resetErrorBoundary}
              style={{ ...buttonStyle, backgroundColor: "#28a745" }}
            >
              Retry
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `Error Message: ${error.message}\nError Stack: ${error.stack}\nComponent Stack: ${componentStack}`,
                );
                alert("Error details copied to clipboard");
              }}
              style={{ ...buttonStyle, backgroundColor: "#17a2b8" }}
            >
              Copy Error Details
            </button>

            <a
              onClick={() => {
                const subject = encodeURIComponent(emailSubject);
                const body = encodeURIComponent(
                  `${emailBodyPrefix}

Error Message: ${error.message}
Error Stack: ${error.stack}
Component Stack: ${componentStack || "No component stack available"}

Please assist in resolving this issue.

Thank you!`,
                );
                const mailtoLink = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
                window.location.href = mailtoLink;
              }}
              style={linkStyle}
            >
              Email support with bug
            </a>
          </div>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default CustomErrorBoundary;
