const BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ?? "http://localhost:8000";

// Utility function to get a specific cookie by name
export const getCookie = (cookieString: string, name: string): string | null => {
  let cookieValue: string | null = null;
  if (cookieString && cookieString !== "") {
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

export interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

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

// Example usage for fetching company files
export const getCompanyFiles = async () => {
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

// Example usage for deleting a company file
export const deleteCompanyFile = async ({ fileId }: { fileId: number }) => {
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

// Interface for uploading documents (files)
interface UploadDocumentResponse {
  files: File[];
}

// Example usage for uploading files
export const handleUploadDocuments = async ({
  files,
}: UploadDocumentResponse) => {
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
        body: formData, // FormData for file upload
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
