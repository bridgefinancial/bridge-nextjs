import { Company } from "@/types/users.types";
import { fetchWithAuth } from "./authorized-request.service";

type UpdateCompanyRequest = {
  attributes: Partial<Company>;
  id: Company["id"];
};

export const updateCompany = async ({
  attributes,
  id,
}: UpdateCompanyRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/companies/${id}/`;

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

  const data = (await response.json()) as Company;
  return data;
};

type CreateCompanyRequest = {
  name: string;
  industry: string;
};

export const createCompany = async ({
  name,
  industry,
}: CreateCompanyRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/companies/`;

  const response = await fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed, like Authorization
    },
    body: JSON.stringify({
      name,
      industry,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
