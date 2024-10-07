import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { FetchOptions, getCookie } from "./authorized-request.service";

const BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ?? "http://localhost:8000";

export const customFetchWithAuth = async (
  url: string,
  options: FetchOptions = {},
  cookieString = document.cookie,
): Promise<Response> => {
  const headers = new Headers({
    ...options.headers,
  });

  // Get the CSRF token from the cookies
  const csrfToken = getCookie(cookieString, "csrftoken");

  // If the CSRF token exists, include it in the headers
  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  // Handle form data automatically for file uploads, otherwise default to JSON
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    method: options.method || "GET",
    credentials: "include", // Include cookies in the request
    cache: "no-cache",
    ...options,
    headers,
  });

  return response;
};

// Fetch company files
export const getCompanyFiles = async (): Promise<any> => {
  const url = `/api/company-files/`;

  const response = await customFetchWithAuth(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Delete a company file
export const deleteCompanyFile = async ({
  fileId,
}: {
  fileId: number;
}): Promise<any> => {
  const url = `/api/company-files/${fileId}`;

  const response = await customFetchWithAuth(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Upload documents using FormData
interface UploadDocumentResponse {
  files: File[];
}

export const handleUploadDocuments = async ({
  files,
}: UploadDocumentResponse): Promise<{ responses: any[]; errors: any[] }> => {
  const url = `/api/company-files/`;

  const responses = [];
  const errors = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", file.name);

    try {
      const response = await customFetchWithAuth(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const responseBody = await response.text();
        console.error("Response body:", responseBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      responses.push(data);
    } catch (error) {
      console.error("Error uploading document:", error);
      errors.push(error);
    }
  }

  return { responses, errors };
};

// Fetch company files with cacheable query
export const useGetCompaniesFilesQuery = (queryKey: string = "") => {
  return useQuery({
    queryFn: getCompanyFiles,
    queryKey: [`useCompanyFilesQuery${queryKey ? queryKey : "KeyForQuery"}`],
  });
};

// Use mutation to delete a file
export const useDeleteFileMutation = (): UseMutationResult<
  any,
  Error,
  { fileId: number },
  unknown
> => {
  return useMutation({
    mutationFn: deleteCompanyFile,
  });
};

// Use mutation to upload files
export const useUploadDocumentsMutation = (): UseMutationResult<
  { responses: any[]; errors: unknown[] },
  Error,
  UploadDocumentResponse,
  unknown
> => {
  return useMutation({
    mutationFn: handleUploadDocuments,
  });
};
