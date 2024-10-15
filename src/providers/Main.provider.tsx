import { ReactNode } from 'react';
import { AuthProvider } from './Auth.provider';
import { ColorsProvider } from './Color.provider';
import { ErrorsProvider } from './Errors.provider';

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = (
  props: MainProviderProps
) => {
  const { children } = props;
  return (
    <ErrorsProvider>
      <AuthProvider>
        <ColorsProvider>{children}</ColorsProvider>
      </AuthProvider>
    </ErrorsProvider>
  );
};

export default MainProvider;
