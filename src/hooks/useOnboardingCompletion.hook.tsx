'use client';

import { ALL_ONBOARDING_QUESTIONNAIRES } from '@/app/portal/dashboard/page';
import { LandingConfig } from '@/providers/Questionnaire.provider';
import { useFormSubmissions } from '@/services/form-submissions.service';
import { ONBOARDING_SLUGS } from '@/services/questionnaires.service';
import { FormidableForm } from '@/types/forms.types';
import { getLandingConfigKey } from '@/utils/local-storage';
import { useMemo } from 'react';

export const useOnboardingCompletion = (forms: FormidableForm[]) => {
  const formSubmissionQueries = useFormSubmissions(
    ALL_ONBOARDING_QUESTIONNAIRES.map((q) => {
      return {
        formId: q.formId,
      };
    })
  );

  // CALCULATED
  // Only started onboarding when they have finished one of the recommendation forms, which excludes the valuation form (index 0)
  const hasStartedOnboarding = formSubmissionQueries.some(
    (query, index) => index !== 0 && !!query.data?.json_blob
  );
  const hasCompletedOnboarding = formSubmissionQueries.every((query) => {
    return !!query.data?.json_blob;
  });
  const completion = useMemo(() => {
    return ALL_ONBOARDING_QUESTIONNAIRES.map((q, index) => {
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
        ((landingConfig?.pageIndex ?? 0) /
          forms[index].definition.pages.length) *
        100;
      return {
        title: q.stepperLabel,
        completionPercentage: hasFormSubmission ? 100 : landingProgress,
        href: `/q/${ONBOARDING_SLUGS[index]}`,
      };
    });
  }, [formSubmissionQueries, forms]);

  return { hasStartedOnboarding, hasCompletedOnboarding, completion };
};
