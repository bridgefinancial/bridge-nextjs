'use client';

import { LandingConfig } from '@/providers/Questionnaire.provider';
import { useFormSubmissions } from '@/services/form-submissions.service';
import {
  ONBOARDING_SLUGS,
  RECOMMENDATION_QUESTIONNAIRES,
  VALUATION_QUESTIONNAIRE,
} from '@/services/questionnaires.service';
import { getLandingConfigKey } from '@/utils/local-storage';

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
    let landingConfig: LandingConfig | undefined = undefined;
    // only access localStorage on client-side
    if (typeof window !== 'undefined') {
      const rawLandingConfig = localStorage.getItem(getLandingConfigKey(q));
      landingConfig = rawLandingConfig
        ? (JSON.parse(rawLandingConfig) as LandingConfig)
        : undefined;
    }
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
