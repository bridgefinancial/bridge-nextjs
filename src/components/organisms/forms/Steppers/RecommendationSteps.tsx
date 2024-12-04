'use client';

import { useFormSubmissions } from '@/services/form-submissions.service';
import {
  QuestionnaireSlugs,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
  RECOMMENDATION_QUESTIONNAIRES,
} from '@/services/questionnaires.service';
import Steps, { Step } from '../Steps';

type RecommendationStepsProps = {
  slug: QuestionnaireSlugs;
};

const RecommendationSteps = ({ slug }: RecommendationStepsProps) => {
  const recommendationSlugIndex =
    RECOMMENDATION_QUESTIONNAIRE_SLUGS.indexOf(slug);

  const formSubmissions = useFormSubmissions({
    formIds: RECOMMENDATION_QUESTIONNAIRES.map((q) => q.formId),
  });

  if (recommendationSlugIndex === -1) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Steps
        activeStepIndex={recommendationSlugIndex}
        steps={RECOMMENDATION_QUESTIONNAIRES.map((q, index) => {
          const step: Step = {
            label: q.stepperLabel,
            isCompleted: !!formSubmissions.data?.some(
              (f) => f.form === q.formId
            ),
            href: RECOMMENDATION_QUESTIONNAIRE_SLUGS[index],
          };
          return step;
        }).flat()}
      />
    </div>
  );
};

export default RecommendationSteps;
