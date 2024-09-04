export const getCompanyFiles = async () => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/company-files/`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed
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
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/company-files/${fileId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Include other headers if needed, like Authorization
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Optionally handle any response data if needed
  const data = await response.json();
  return data;
};

type UploadDocumentsRequest = {
  files: File[];
};

export const handleUploadDocuments = async ({
  files,
}: UploadDocumentsRequest) => {
  const baseUrl = process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000";
  const url = `${baseUrl}/api/company-files/`;

  // Create a container to hold responses and errors
  const responses = [];
  const errors = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", file.name); // Using file name as description

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        // Note: FormData automatically sets Content-Type to multipart/form-data
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

  // Handle responses and errors as needed
  return { responses, errors };
};
