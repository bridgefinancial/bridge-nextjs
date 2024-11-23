'use client';

import { LandingConfig } from '@/providers/Questionnaire.provider';
import { useFormSubmissions } from '@/services/form-submissions.service';
import { QUESTIONNAIRE_BY_FORM_ID } from '@/services/questionnaires.service';
import { FormidableForm } from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import { getLandingConfigKey } from '@/utils/local-storage';
import { useMemo } from 'react';

export const useOnboardingCompletion = (forms: FormidableForm[]) => {
  const formSubmissionQueries = useFormSubmissions(
    forms.map((f) => {
      return {
        formId: f.id,
      };
    })
  );

  // CALCULATED
  // Only started onboarding when they have finished one of the recommendation forms, which excludes the valuation form (index 0)
  const hasStartedOnboarding = formSubmissionQueries.some(
    (query) => !!query.data?.json_blob
  );
  const hasCompletedOnboarding = formSubmissionQueries.every((query) => {
    return !!query.data?.json_blob;
  });
  const completion: {
    title?: string;
    completionPercentage: number;
    href: string;
  }[] = useMemo(() => {
    return forms.map((form, index) => {
      const questionnaire = QUESTIONNAIRE_BY_FORM_ID.get(form.id);
      const hasFormSubmission = !!formSubmissionQueries[index].data?.json_blob;
      let landingConfig: LandingConfig | undefined = undefined;
      // only access localStorage on client-side
      if (typeof window !== 'undefined') {
        const rawLandingConfig = localStorage.getItem(
          getLandingConfigKey(form.id)
        );
        landingConfig = rawLandingConfig
          ? (JSON.parse(rawLandingConfig) as LandingConfig)
          : undefined;
      }
      const landingProgress =
        ((landingConfig?.pageIndex ?? 0) /
          forms[index].definition.pages.length) *
        100;
      return {
        title: questionnaire?.stepperLabel,
        completionPercentage: hasFormSubmission ? 100 : landingProgress,
        href: questionnaire?.slug
          ? `/q/${questionnaire.slug}`
          : routePaths.DASHBOARD,
      };
    });
  }, [formSubmissionQueries, forms]);

  return { hasStartedOnboarding, hasCompletedOnboarding, completion };
};
