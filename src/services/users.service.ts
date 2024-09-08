import { User } from "@/types/users.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "./authorized-request.service";

export const fetchSession: () => Promise<User> = async () => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/session/`;

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
  });
};

type LoginRequest = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/login/`;

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
  return useMutation({
    mutationFn: loginUser,
  });
};

export const logoutUser = async () => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/logout/`;

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

  // Optionally handle any response data if needed
  const data = await response.json();
  return data;
};

type SignUpRequest = {
  first_name: string;
  last_name: string;
  company_name: string;
  industry: string;
  email: string;
  password1: string;
  password2: string;
};

export const signUp = async (requestBody: SignUpRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/users/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type VerifyEmailRequest = {
  token: string;
  uid: string;
};

export const verifyEmail = async ({ token, uid }: VerifyEmailRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/verify-email/`;

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

  const data = await response.json();
  return data;
};

type PasswordResetRequest = {
  email: string;
};

export const passwordReset = async ({ email }: PasswordResetRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/password-reset/`;

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

  const data = await response.json();
  return data;
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
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/password-reset-confirm/`;

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

  const data = await response.json();
  return data;
};

type UpdateUserRequest = {
  attributes: Partial<User>;
  id: string;
};

export const updateUser = async ({ attributes, id }: UpdateUserRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/users/${id}/`;

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
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/password-change/`;

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

export const updatePhoto = async ({ image, userId }: UpdatePhotoRequest) => {
  const formData = new FormData();
  formData.append("image", image);

  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/users/${userId}/`;

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
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/users/${userId}/`;

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
