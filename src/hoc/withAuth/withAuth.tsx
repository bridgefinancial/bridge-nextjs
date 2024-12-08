import { useLoggerActions } from '@/hooks/useLoggerActions.hook';
import { useLogoutUser, useSessionUser } from '@/services/users.service';
import { routePaths } from '@/types/routes.enum';
import { User } from '@/types/users.types'; // Adjust import based on your User type location
import { UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ComponentType, memo, useEffect } from 'react';

interface WithAuthProps {
  redirectPath?: string;
  disableRedirect?: boolean;
}

export interface AuthInjectedProps {
  sessionQuery: UseQueryResult<User | undefined, Error>;
  logout: () => void
  isLoading: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P & AuthInjectedProps>
) => {
  const ComponentWithAuth = ({
    redirectPath = routePaths.LOGIN,
    disableRedirect = false,
    ...props
  }: WithAuthProps & P) => {
    const {logError, logInfo} = useLoggerActions()
    const sessionQuery = useSessionUser();
    const { data: user, isLoading: isLoadingUser } = sessionQuery;

    const logoutMutation = useLogoutUser();
    const { isPending: isLoadingLogout, isSuccess: isLogoutSuccess, mutateAsync: logout } = logoutMutation;

    const router = useRouter();

    useEffect(() => {
      if (!disableRedirect && !isLoadingUser && !user) {
        // Redirect if user session is invalid
        router.replace(redirectPath);
      }
    }, [user, isLoadingUser, router, redirectPath, disableRedirect]);




    const handleLogout = () => {

        logout()
        .then(() => {
            router.replace(redirectPath);     
        
            logInfo({message: "logged out successfully"}, "handleLogout", true, "You are now logged out")
        })
            .catch((err) => {
                logError(err, "handleLogout", true, 
                    "Failed to logout"
                )
            })
    }


    return (
      <WrappedComponent
        {...(props as P)}
        sessionQuery={sessionQuery}
        logout={handleLogout}
        isLoading={isLoadingUser || isLoadingLogout}
      />
    );
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return memo(ComponentWithAuth);
};

export default withAuth;
