'use client';

import { useFormSubmissions } from '@/services/form-submissions.service';
import {
  QuestionnaireSlugs,
  SELLER_READINESS_QUESTIONNAIRES,
  SELLER_READINESS_SLUGS,
} from '@/services/questionnaires.service';
import Steps, { Step } from '../Steps';

type RecommendationStepsProps = {
  slug: QuestionnaireSlugs;
};

const RecommendationSteps = ({ slug }: RecommendationStepsProps) => {
  const recommendationSlugIndex = SELLER_READINESS_SLUGS.indexOf(slug);

  const formSubmissions = useFormSubmissions({
    formIds: SELLER_READINESS_QUESTIONNAIRES.map((q) => q.formId),
  });

  if (recommendationSlugIndex === -1) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Steps
        activeStepIndex={recommendationSlugIndex}
        steps={SELLER_READINESS_QUESTIONNAIRES.map((q, index) => {
          const step: Step = {
            label: q.stepperLabel,
            isCompleted: !!formSubmissions.data?.some(
              (f) => f.form === q.formId
            ),
            href: SELLER_READINESS_SLUGS[index],
          };
          return step;
        }).flat()}
      />
    </div>
  );
};

export default RecommendationSteps;
