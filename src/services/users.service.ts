import { useToastNotification } from '@/providers/ToastNotification.provider';
import { routePaths } from '@/types/routes.enum';
import { User } from '@/types/users.types';
import { clearQuestionnaireData } from '@/utils/local-storage';
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchWithAuth } from './authorized-request.service';

export const fetchSession: () => Promise<User> = async () => {
  const url = '/api/session/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = (await response.json()) as User;
  return data;
};

export const useSessionUser = () => {
  return useQuery({
    queryFn: fetchSession,
    queryKey: ['session'],
    retry: () => {
      return false;
    },
  });
};

type LoginRequest = {
  email: string;
  password: string;
};

export const loginUser = async ({
  email,
  password,
}: LoginRequest): Promise<any> => {
  const url = '/api/login/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (!data) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      throw new Error(
        data.error?.non_field_errors?.[0]?.message ??
          'An unknown error occurred',
      );
    }
  }

  return data;
};

export const useLoginUser = (): UseMutationResult<
  any,
  Error,
  LoginRequest,
  unknown
> => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open } = useToastNotification();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      const landingUrl = decodeURIComponent(
        searchParams.get('navigateTo') ?? '',
      );
      router.push(landingUrl || routePaths.ROOT);
    },
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

export const logoutUser = async () => {
  const url = '/api/logout/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify({}), // Empty object
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useLogoutUser = (): UseMutationResult<
  void,
  Error,
  void,
  unknown
> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearQuestionnaireData();
      queryClient.invalidateQueries({ queryKey: ['session'] });
      router.push(routePaths.LOGIN);
    },
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

export type SignUpRequest = {
  first_name: string;
  last_name: string;
  company_name: string;
  industry: string;
  email: string;
  password: string;
  terms: boolean;
};

export const signUp = async (requestBody: SignUpRequest): Promise<void> => {
  const url = '/api/users/';

  const transformedRequestBody = {
    ...requestBody,
    password1: requestBody.password,
    password2: requestBody.password,
  };

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify(transformedRequestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useSignUp = (): UseMutationResult<
  void,
  Error,
  SignUpRequest,
  unknown
> => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

interface VerifyEmailRequest {
  token: string;
  uid: string;
}

export const verifyEmail = async ({
  token,
  uid,
}: VerifyEmailRequest): Promise<void> => {
  const url = '/api/verify-email/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify({
      token,
      uid,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useVerifyEmail = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: verifyEmail,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

type PasswordResetRequest = {
  email: string;
};

export const passwordReset = async ({ email }: PasswordResetRequest) => {
  const url = '/api/password-reset/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify({
      email,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useResetPassword = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: passwordReset,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

type PasswordResetConfirmRequest = {
  newPassword1: string;
  newPassword2: string;
  token: string;
  uid: string;
};

export const passwordResetConfirm = async ({
  newPassword1,
  newPassword2,
  token,
  uid,
}: PasswordResetConfirmRequest): Promise<void> => {
  const url = '/api/password-reset-confirm/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
    body: JSON.stringify({
      new_password1: newPassword1,
      new_password2: newPassword2,
      token,
      uid,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const usePasswordResetConfirm = (): UseMutationResult<
  void,
  Error,
  PasswordResetConfirmRequest,
  unknown
> => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: passwordResetConfirm,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

type UpdateUserRequest = {
  attributes: Partial<User>;
  id: string;
};

// Hook to use for updating the user
export const useUpdateUser = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

export const updateUser = async ({
  attributes,
  id,
}: UpdateUserRequest): Promise<User> => {
  const url = `/api/users/${id}/`;

  const response = await fetchWithAuth(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed, like Authorization
    },
    body: JSON.stringify(attributes),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = (await response.json()) as User;
  return data;
};

type ChangePasswordRequest = {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
};

export const changePassword = async ({
  oldPassword,
  newPassword1,
  newPassword2,
}: ChangePasswordRequest) => {
  const url = '/api/password-change/';

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed, like Authorization
    },
    body: JSON.stringify({
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type UpdatePhotoRequest = {
  image: File;
  userId: string;
};
export const useChangePassword = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: changePassword,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};
export const updatePhoto = async ({ image, userId }: UpdatePhotoRequest) => {
  const formData = new FormData();
  formData.append('image', image);

  const url = `/api/users/${userId}/`;

  const response = await fetchWithAuth(url, {
    method: 'PATCH',
    body: formData,
    // Note: FormData sets Content-Type to multipart/form-data automatically
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = {};
  return data;
};

export const useChangeUserAvatar = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: updatePhoto,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};

type ClearUserImageRequest = {
  userId: number;
};

export const clearUserImage = async ({ userId }: ClearUserImageRequest) => {
  const url = `/api/users/${userId}/`;

  const response = await fetchWithAuth(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed, like Authorization
    },
    body: JSON.stringify({ image: null }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useRemoveUserAvatar = () => {
  const { open } = useToastNotification();
  return useMutation({
    mutationFn: clearUserImage,
    onError: (error) => {
      open(error.message, 'error');
    },
  });
};
