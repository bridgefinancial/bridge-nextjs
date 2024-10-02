import { fetchWithAuth } from "@/services/authorized-request.service";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";

export const useGetCompaniesFilesQuery = (queryKey: string = "") => {
  // query key is useful if you want to cache these later for offline use
  return useQuery({
    queryFn: () => getCompanyFiles(),
    queryKey: [`useCompanyFilesQuery${queryKey ? queryKey : "KeyForQuery"}`],
  });
};

export const getCompanyFiles = async () => {
  const url = `/api/company-files/`;

  const response = await fetchWithAuth(url, {
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

type DeleteFileRequest = {
  fileId: number;
};

export const deleteCompanyFile = async ({ fileId }: DeleteFileRequest) => {
  const url = `/api/company-files/${fileId}`;

  const response = await fetchWithAuth(url, {
    method: "DELETE",
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

export const useDeleteFileMutation = (): UseMutationResult<
  {
    fileId: any
  },
  Error,
  DeleteFileRequest,
  unknown
> => {
  return useMutation({
    mutationFn: deleteCompanyFile,
  });
};

interface UploadDocumentResponse {
  files: File[];
}

interface UploadDocumentsDto {
  files: File[];
}

export const useUploadDocumentsMutation = (): UseMutationResult<{
  responses: any[];
  errors: unknown[];
}, Error, UploadDocumentResponse, unknown> => {
  return useMutation({
    mutationFn: handleUploadDocuments,
  })
};

export const handleUploadDocuments = async ({
  files,
}: UploadDocumentResponse) => {
  const url = `/api/company-files/`;

  const responses = [];
  const errors = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", file.name); // Using file name as description

    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
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
