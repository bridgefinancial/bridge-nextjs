import { LandingConfig } from '@/providers/Questionnaire.provider';
import { FormSubmission } from '@/types/forms.types';
import { getLandingConfigKey } from '@/utils/local-storage';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { fetchWithAuth } from './authorized-request.service';
import {
  ONBOARDING_SLUGS,
  RECOMMENDATION_QUESTIONNAIRES,
  VALUATION_QUESTIONNAIRE,
} from './questionnaires.service';

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

export const useOnboardingCompletion = () => {
  const allOnboardingQuestionnaires = [
    VALUATION_QUESTIONNAIRE,
    ...RECOMMENDATION_QUESTIONNAIRES,
  ];
  const formSubmissionQueries = useFormSubmissions(
    allOnboardingQuestionnaires
      .map((q) => {
        return q.forms.map((f) => {
          return {
            formId: f.id,
          };
        });
      })
      .flat()
  );

  // CALCULATED
  // Only started onboarding when they have finished one of the recommendation forms, which excludes the valuation form (index 0)
  const hasStartedOnboarding = formSubmissionQueries.some(
    (query, index) => index !== 0 && !!query.data?.json_blob
  );
  const hasCompletedOnboarding = formSubmissionQueries.every((query) => {
    return !!query.data?.json_blob;
  });
  const completion = allOnboardingQuestionnaires.map((q, index) => {
    const hasFormSubmission = !!formSubmissionQueries[index].data?.json_blob;
    const rawLandingConfig = localStorage.getItem(getLandingConfigKey(q));
    const landingConfig = rawLandingConfig
      ? (JSON.parse(rawLandingConfig) as LandingConfig)
      : undefined;
    const landingProgress =
      ((landingConfig?.pageIndex ?? 0) / q.forms[0].definition.pages.length) *
      100;
    return {
      title: q.forms[0].name,
      completionPercentage: hasFormSubmission ? 100 : landingProgress,
      href: `/q/${ONBOARDING_SLUGS[index]}`,
    };
  });

  return { hasStartedOnboarding, hasCompletedOnboarding, completion };
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
