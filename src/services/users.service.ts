import { User } from "@/types/users.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWithAuth } from "./authorized-request.service";
import { useRouter, useSearchParams } from "next/navigation";
import { routePaths } from "@/types/routes.enum";

export const fetchSession: () => Promise<User> = async () => {
  const url = `/api/session/`;

  const response = await fetchWithAuth(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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
    queryKey: ["session"],
    retry: () => {
      return false;
    },
  });
};

type LoginRequest = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginRequest) => {
  const url = `/api/login/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useLoginUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      const landingUrl = decodeURIComponent(
        searchParams.get("navigateTo") ?? ""
      );
      router.push(landingUrl || routePaths.ROOT);
    },
  });
};

export const logoutUser = async () => {
  const url = `/api/logout/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
    body: JSON.stringify({}), // Empty object
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push(routePaths.LOGIN);
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

export const signUp = async (requestBody: SignUpRequest) => {
  const url = `/api/users/`;

  const transformedRequestBody = {
    ...requestBody,
    password1: requestBody.password,
    password2: requestBody.password,
  };

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
    body: JSON.stringify(transformedRequestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return;
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

type VerifyEmailRequest = {
  token: string;
  uid: string;
};

export const verifyEmail = async ({ token, uid }: VerifyEmailRequest) => {
  const url = `/api/verify-email/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  return useMutation({
    mutationFn: verifyEmail,
  });
};

type PasswordResetRequest = {
  email: string;
};

export const passwordReset = async ({ email }: PasswordResetRequest) => {
  const url = `/api/password-reset/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  return useMutation({
    mutationFn: passwordReset,
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
}: PasswordResetConfirmRequest) => {
  const url = `/api/password-reset-confirm/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export const usePasswordResetConfirm = () => {
  return useMutation({
    mutationFn: passwordResetConfirm,
  });
};

type UpdateUserRequest = {
  attributes: Partial<User>;
  id: string;
};

export const updateUser = async ({ attributes, id }: UpdateUserRequest) => {
  const url = `/api/users/${id}/`;

  const response = await fetchWithAuth(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
  const url = `/api/password-change/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  userId: number;
};
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      // Perform any additional actions on success, like showing a success message
      console.log("Password changed successfully:", data);
    },
    onError: (error) => {
      // Handle any errors, like showing an error message
      console.error("Error changing password:", error);
    },
  });
};
export const updatePhoto = async ({ image, userId }: UpdatePhotoRequest) => {
  const formData = new FormData();
  formData.append("image", image);

  const url = `/api/users/${userId}/`;

  const response = await fetchWithAuth(url, {
    method: "PATCH",
    body: formData,
    // Note: FormData sets Content-Type to multipart/form-data automatically
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type ClearUserImageRequest = {
  userId: number;
};

export const clearUserImage = async ({ userId }: ClearUserImageRequest) => {
  const url = `/api/users/${userId}/`;

  const response = await fetchWithAuth(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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
