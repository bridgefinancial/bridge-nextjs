import { ReactNode } from 'react';
import { AuthProvider } from './Auth.provider';
import { ColorsProvider } from './Color.provider';
import { ErrorsProvider } from './Errors.provider';
import { ToastNotificationProvider } from './ToastNotification.provider';

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = (
  props: MainProviderProps
) => {
  const { children } = props;
  return (
    <ToastNotificationProvider>
      <ErrorsProvider>
        <AuthProvider>
          <ColorsProvider>{children}</ColorsProvider>
        </AuthProvider>
      </ErrorsProvider>
    </ToastNotificationProvider>
  );
};

export default MainProvider;
