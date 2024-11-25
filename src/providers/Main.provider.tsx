import { ReactNode } from 'react';
import { ColorsProvider } from './Color.provider';
import LoggerStateProvider  from './LoggerProvider/Logger.provider';
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
      <LoggerStateProvider>
        <ColorsProvider>{children}</ColorsProvider>
      </LoggerStateProvider>
    </ToastNotificationProvider>
  );
};

export default MainProvider;
