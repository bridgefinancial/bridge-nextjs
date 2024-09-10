import { fetchWithAuth } from "./authorized-request.service";

export const getIndustries = async () => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = new URL("/api/industries/");
  url.searchParams.append("page_size", "1000");

  const response = await fetchWithAuth(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
