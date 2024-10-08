import { QuestionnaireProvider } from "@/providers/Questionnaire.provider";
import {
  QUESTIONNAIRE_BY_SLUG,
  QuestionnaireSlugs,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
  RECOMMENDATION_QUESTIONNAIRES,
} from "@/services/questionnaires.service";
import React, { useMemo } from "react";
import { notFound } from "next/navigation";
import Questionnaire from "@/components/organisms/forms/Questionnaire";
import QuestionnaireLayoutV2 from "@/components/templates/layouts/QuestionnaireLayout/QuestionnaireLayoutV2";
import Steps, { Step } from "@/components/organisms/forms/Steps";
import RecommendationSteps from "@/components/organisms/forms/Recommendations/RecommendationSteps";

const Page = ({ params }: { params: { formId: QuestionnaireSlugs } }) => {
  const questionnaireId = params.formId;
  const questionnaire = QUESTIONNAIRE_BY_SLUG[questionnaireId];

  const recommendationSlugIndex =
    RECOMMENDATION_QUESTIONNAIRE_SLUGS.indexOf(questionnaireId);

  const isRecommendationQuestionnaire = recommendationSlugIndex !== -1;

  const stepper = useMemo(() => {
    if (isRecommendationQuestionnaire) {
      return <RecommendationSteps slug={questionnaireId} />;
    }
    return undefined;
  }, []);

  if (!questionnaire) {
    notFound();
  }

  return (
    <QuestionnaireProvider questionnaire={questionnaire}>
      <QuestionnaireLayoutV2>
        <Questionnaire stepper={stepper} />
      </QuestionnaireLayoutV2>
    </QuestionnaireProvider>
  );
};

export default Page;
