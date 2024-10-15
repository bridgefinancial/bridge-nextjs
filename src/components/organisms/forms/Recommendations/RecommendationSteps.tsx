"use client";

import {
  QuestionnaireSlugs,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
  RECOMMENDATION_QUESTIONNAIRES,
} from "@/services/questionnaires.service";
import Steps, { Step } from "../Steps";
import { useFormSubmissions } from "@/services/form-submissions.service";

type RecommendationStepsProps = {
  slug: QuestionnaireSlugs;
};

const RecommendationSteps = ({ slug }: RecommendationStepsProps) => {
  const recommendationSlugIndex =
    RECOMMENDATION_QUESTIONNAIRE_SLUGS.indexOf(slug);

  const formSubmissionQueries = useFormSubmissions(
    RECOMMENDATION_QUESTIONNAIRES.map((q) => {
      return q.forms.map((f) => {
        return {
          formId: f.id,
        };
      });
    }).flat(),
  );

  if (recommendationSlugIndex === -1) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Steps
        activeStepIndex={recommendationSlugIndex}
        steps={RECOMMENDATION_QUESTIONNAIRES.map((q, index) => {
          return q.forms.map((f, formIndex) => {
            const step: Step = {
              label: f.definition.name,
              isCompleted: formSubmissionQueries[index + formIndex].isSuccess,
            };
            return step;
          });
        }).flat()}
      />
    </div>
  );
};

export default RecommendationSteps;
