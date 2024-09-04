import { FormSubmission } from "@/types/forms.types";

type GetFormSubmissionVariables = {
  formId: string;
};

export const getFormSubmission: (
  variables: GetFormSubmissionVariables
) => Promise<FormSubmission> = async ({
  formId,
}: GetFormSubmissionVariables) => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/form-submission/${formId}/`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission;
  return responseBody;
};

type SubmitFormVariables = {
  formId: string;
  formData: Record<string, any>;
};

export const submitForm: (
  variables: SubmitFormVariables
) => Promise<FormSubmission> = async ({
  formId,
  formData,
}: SubmitFormVariables) => {
  const url = `${
    process.env.DJANGO_API_BASE_URL ?? "http://localhost:8000"
  }/api/submit-form/${formId}/`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission;
  return responseBody;
};
