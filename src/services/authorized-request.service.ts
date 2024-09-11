const BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ?? "http://localhost:8000";

// Utility function to get a specific cookie by name
export const getCookie = (
  cookieString: string,
  name: string
): string | null => {
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

export const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {},
  cookieString = document.cookie
): Promise<Response> => {
  const headers = new Headers({
    "Content-Type": "application/json",
    ...options.headers,
  });

  // Get the CSRF token from the cookies
  const csrfToken = getCookie(cookieString, "csrftoken");

  // If the CSRF token exists, include it in the headers
  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  // Perform the fetch request
  const response = await fetch(`${BASE_URL}${url}`, {
    method: "GET",
    credentials: "include", // To send cookies with requests
    cache: "no-store",
    ...options,
    headers: headers,
  });

  return response;
};
