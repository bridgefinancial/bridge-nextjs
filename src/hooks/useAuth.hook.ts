import { useLoggerActions } from '@/hooks/useLoggerActions.hook';
import { useLogoutUser, useSessionUser } from '@/services/users.service';
import { routePaths } from '@/types/routes.enum';
import { User } from '@/types/users.types';
import { UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

interface UseAuthOptions {
  redirectPath?: string;
  disableRedirect?: boolean;
}

export interface AuthInjectedProps {
  sessionQuery: UseQueryResult<User | undefined, Error>;
  logout: () => void;
  isLoading: boolean;
}
// this is the same thing as withAuth HOC, but as a hook if you guys are bitter about HOCs
export const useAuth = ({
  redirectPath = routePaths.LOGIN,
  disableRedirect = false,
}: UseAuthOptions = {}): AuthInjectedProps => {
  const { logError, logInfo } = useLoggerActions();
  const sessionQuery = useSessionUser();
  const { data: user, isLoading: isLoadingUser } = sessionQuery;

  const logoutMutation = useLogoutUser();
  const {
    isPending: isLoadingLogout,
    isSuccess: isLogoutSuccess,
    mutateAsync: logout,
  } = logoutMutation;

  const router = useRouter();

  useEffect(() => {
    if (!disableRedirect && !isLoadingUser && !user) {
      router.replace(redirectPath);
    }
  }, [disableRedirect, isLoadingUser, user, redirectPath, router]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.replace(redirectPath);
      logInfo(
        { message: 'Logged out successfully' },
        'handleLogout',
        true,
        'You are now logged out'
      );
    } catch (err) {
      logError(
        err as Record<string, any>,
        'handleLogout',
        true,
        'Failed to logout'
      );
    }
  }, [logout, logInfo, logError, router, redirectPath]);

  return {
    sessionQuery,
    logout: handleLogout,
    isLoading: isLoadingUser || isLoadingLogout,
  };
};
