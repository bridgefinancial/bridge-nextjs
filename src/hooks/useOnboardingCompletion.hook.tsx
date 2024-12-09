'use client';

import { LandingConfig } from '@/providers/Questionnaire.provider';
import { useFormSubmissions } from '@/services/form-submissions.service';
import { QUESTIONNAIRE_BY_FORM_ID } from '@/services/questionnaires.service';
import { FormidableForm } from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import { getLandingConfigKey } from '@/utils/local-storage';
import { useMemo } from 'react';

export const useOnboardingCompletion = (forms: FormidableForm[]) => {
  const formSubmissionsQuery = useFormSubmissions({
    formIds: forms.map((f) => f.id),
  });

  // CALCULATED
  // Only started onboarding when they have finished one of the recommendation forms, which excludes the valuation form (index 0)
  const hasStartedOnboarding = (formSubmissionsQuery.data?.length ?? 0) > 0;
  const hasCompletedOnboarding =
    (formSubmissionsQuery.data?.length ?? 0) === forms.length;
  const completion: {
    title?: string;
    completionPercentage: number;
    href: string;
  }[] = useMemo(() => {
    return forms.map((form, index) => {
      const formSubmission = formSubmissionsQuery.data?.find(
        (formSubmission) => formSubmission.form === form.id
      );
      const questionnaire = QUESTIONNAIRE_BY_FORM_ID.get(form.id);
      const hasFormSubmission = !!formSubmission;
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
  }, [formSubmissionsQuery, forms]);

  return {
    isLoading: formSubmissionsQuery.isLoading,
    hasStartedOnboarding,
    hasCompletedOnboarding,
    completion,
  };
};
