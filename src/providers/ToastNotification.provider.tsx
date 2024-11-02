import ToastNotification from '@/components/molecules/feedback/ToastNotification';
import { createContext, ReactNode, useContext, useState } from 'react';

type ToastNotificationType = {
  open: (
    message: string | React.ReactNode,
    severity: 'error' | 'warning' | 'info' | 'success'
  ) => void;
};

const ToastNotificationContext = createContext<ToastNotificationType>({
  open: () => {
    return;
  },
});

export const ToastNotificationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string | React.ReactNode>('');
  const [severity, setSeverity] = useState<
    'error' | 'warning' | 'info' | 'success'
  >('info');
  const [open, setOpen] = useState(false);

  const handleOpen = (
    message: string | React.ReactNode,
    severity: 'error' | 'warning' | 'info' | 'success'
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <ToastNotificationContext.Provider
      value={{
        open: handleOpen,
      }}
    >
      {children}
      <ToastNotification
        message={message}
        severity={severity}
        open={open}
        setOpen={setOpen} // This will close the toast when the user clicks on it or after auto-hide
        autoHideDuration={3000} // The toast will auto-hide after 3 seconds
      />
    </ToastNotificationContext.Provider>
  );
};

// Custom hook to use the context
export const useToastNotification = () => {
  const context = useContext(ToastNotificationContext);
  if (context === undefined) {
    throw new Error(
      'useToastNotification must be used within a QuestionnaireProvider'
    );
  }
  return context;
};
