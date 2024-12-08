import { FormSubmission } from '@/types/forms.types';
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetchWithAuth } from './authorized-request.service';

interface GetFormSubmissionVariables {
  formId: number;
}

interface GetFormSubmissionWithFields extends GetFormSubmissionVariables {
  formId: number;
  fields: string[];
}

export const getFormSubmission: (
  variables: GetFormSubmissionVariables
) => Promise<FormSubmission> = async ({
  formId,
}: GetFormSubmissionVariables) => {
  const url = `/api/form-submission/${formId}/`;
  const response = await fetchWithAuth(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission;
  return responseBody;
};

export const getFormSubmissionWithFields: (
  variables: GetFormSubmissionWithFields
) => Promise<FormSubmission> = async (variables) => {
  const { formId, fields } = variables;

  // Join the fields array into a comma-separated string
  const fieldsQuery = fields?.join(',') || '';
  const url = `/api/form-submission/${formId}?fields=${encodeURIComponent(fieldsQuery)}/`;

  const response = await fetchWithAuth(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission;
  return responseBody;
};

const getFormSubmissionQueryVariables = (
  variables: GetFormSubmissionVariables
): UseQueryOptions<FormSubmission> => {
  return {
    queryKey: ['form-submission', variables.formId],
    queryFn: () => getFormSubmission(variables),
    retry: (_, error) => {
      console.log(error.message);
      if (error.message.includes('404')) {
        return false;
      }
      return true;
    },
  };
};

export const useFormSubmission = (
  variables: GetFormSubmissionVariables,
  options?: {
    onSuccess?: (submission: FormSubmission) => void;
    onError?: () => void;
  }
) => {
  return useQuery({
    ...getFormSubmissionQueryVariables(variables),
    ...options,
  });
};

type GetFormSubmissionsVariables = {
  formIds: number[];
};

export const getFormSubmissions: (
  variables: GetFormSubmissionsVariables
) => Promise<FormSubmission[]> = async (variables) => {
  const url = `/api/form-submissions/`;
  const params = new URLSearchParams(
    variables.formIds.map((id) => ['ids', id.toString()])
  );
  const response = await fetchWithAuth(`${url}?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const responseBody = (await response.json()) as FormSubmission[];
  return responseBody;
};

export const useFormSubmissions = (
  variables: GetFormSubmissionsVariables,
  options?: {
    onSuccess?: (submissions: FormSubmission[]) => void;
    onError?: () => void;
  }
) => {
  return useQuery({
    queryFn: () => getFormSubmissions(variables),
    retry: (_, error) => {
      console.log(error.message);
      if (error.message.includes('404')) {
        return false;
      }
      return true;
    },
    queryKey: ['form-submissions', variables],
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
    method: 'POST',
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return;
};

export const useSubmitForm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['form-submission'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({
        queryKey: ['next-action-recommendation'],
      });
      queryClient.invalidateQueries({
        queryKey: ['improvement-categories'],
      });
    },
  });
};
