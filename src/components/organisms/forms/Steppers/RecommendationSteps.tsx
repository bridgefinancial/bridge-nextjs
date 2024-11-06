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

  const formSubmissionQueries = useFormSubmissions(
    RECOMMENDATION_QUESTIONNAIRES.map((q) => {
      return {
        formId: q.formId,
      };
    })
  );

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
            isCompleted: formSubmissionQueries[index].isSuccess,
            href: RECOMMENDATION_QUESTIONNAIRE_SLUGS[index],
          };
          return step;
        }).flat()}
      />
    </div>
  );
};

export default RecommendationSteps;
