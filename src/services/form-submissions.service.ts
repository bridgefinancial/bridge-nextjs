import { FormSubmission } from "@/types/forms.types";
import { fetchWithAuth } from "./authorized-request.service";
import { useMutation, useQuery } from "@tanstack/react-query";

type GetFormSubmissionVariables = {
  formId: number;
};

export const getFormSubmission: (
  variables: GetFormSubmissionVariables
) => Promise<FormSubmission> = async ({
  formId,
}: GetFormSubmissionVariables) => {
  const url = `/api/form-submission/${formId}/`;
  const response = await fetchWithAuth(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission;
  return responseBody;
};

export const useFormSubmission = (
  variables: GetFormSubmissionVariables,
  options?: { onError?: () => void }
) => {
  return useQuery({
    queryKey: ["form-submission", variables.formId],
    queryFn: () => getFormSubmission(variables),
    retry: (_, error) => {
      if (error.message.includes("404")) {
        return false;
      }
      return true;
    },
    ...options,
  });
};

type SubmitFormVariables = {
  formId: number;
  formData: Record<string, any>;
};

export const submitForm: (
  variables: SubmitFormVariables
) => Promise<void> = async ({ formId, formData }: SubmitFormVariables) => {
  const url = `/api/submit-form/${formId}/`;
  const response = await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return;
};

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: submitForm,
  });
};
