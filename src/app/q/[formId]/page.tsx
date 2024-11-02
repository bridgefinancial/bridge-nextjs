import Questionnaire from '@/components/organisms/forms/Questionnaire';
import RecommendationSteps from '@/components/organisms/forms/Recommendations/RecommendationSteps';
import QuestionnaireLayoutV2 from '@/components/templates/layouts/QuestionnaireLayout/QuestionnaireLayoutV2';
import { QuestionnaireProvider } from '@/providers/Questionnaire.provider';
import { getFormById } from '@/services/forms.service';
import {
  QUESTIONNAIRE_BY_SLUG,
  QuestionnaireSlugs,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
} from '@/services/questionnaires.service';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';

const Page = async ({ params }: { params: { formId: QuestionnaireSlugs } }) => {
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

  const form = await getFormById(questionnaire.formId);

  if (!form) {
    notFound();
  }

  return (
    <QuestionnaireProvider form={form} questionnaire={questionnaire}>
      <QuestionnaireLayoutV2>
        <Questionnaire stepper={stepper} />
      </QuestionnaireLayoutV2>
    </QuestionnaireProvider>
  );
};

export default Page;
