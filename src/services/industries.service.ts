import { PaginatedResponse } from "@/types/api.types";
import { fetchWithAuth } from "./authorized-request.service";
import { Industry } from "@/types/industries.types";
import { useQuery } from "@tanstack/react-query";

export const getIndustries = async (): Promise<PaginatedResponse<Industry>> => {
  const url = "/api/industries/";
  const params = new URLSearchParams({ page_size: "1000" });

  const response = await fetchWithAuth(`${url}?${params.toString()}`, {
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

export const useIndustries = () => {
  return useQuery({
    queryFn: () => getIndustries(),
    queryKey: ["industries"],
  });
};
