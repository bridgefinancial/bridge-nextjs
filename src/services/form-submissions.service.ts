import { FormSubmission } from '@/types/forms.types';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetchWithAuth } from './authorized-request.service';

type GetFormSubmissionVariables = {
  formId: number;
};

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

export const useFormSubmissions = (variables: GetFormSubmissionVariables[]) => {
  return useQueries({
    queries: variables.map((v) => getFormSubmissionQueryVariables(v)),
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
