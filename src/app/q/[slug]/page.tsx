import Questionnaire from '@/components/organisms/forms/Questionnaire';
import RecommendationSteps from '@/components/organisms/forms/Steppers/RecommendationSteps';
import SellerReadinessSteps from '@/components/organisms/forms/Steppers/SellerReadinessSteps';
import QuestionnaireLayoutV2 from '@/components/templates/layouts/QuestionnaireLayout/QuestionnaireLayoutV2';
import { QuestionnaireProvider } from '@/providers/Questionnaire.provider';
import { getFormById } from '@/services/forms.service';
import {
  QUESTIONNAIRE_BY_SLUG,
  QuestionnaireSlugs,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
  SELLER_READINESS_SLUGS,
} from '@/services/questionnaires.service';
import { notFound } from 'next/navigation';

const Page = async ({ params }: { params: { slug: QuestionnaireSlugs } }) => {
  const slug = params.slug;
  const questionnaire = QUESTIONNAIRE_BY_SLUG[slug];

  if (!questionnaire) {
    notFound();
  }

  const form = await getFormById(questionnaire.formId);

  if (!form) {
    notFound();
  }

  const recommendationSlugIndex =
    RECOMMENDATION_QUESTIONNAIRE_SLUGS.indexOf(slug);

  const isRecommendationQuestionnaire = recommendationSlugIndex !== -1;

  const sellerReadinessSlugIndex = SELLER_READINESS_SLUGS.indexOf(slug);

  const isSellerReadinessQuestionnaire = sellerReadinessSlugIndex !== -1;

  const getStepper = () => {
    if (isRecommendationQuestionnaire) {
      return <RecommendationSteps slug={slug} />;
    } else if (isSellerReadinessQuestionnaire) {
      return <SellerReadinessSteps slug={slug} />;
    }
    return undefined;
  };

  return (
    <QuestionnaireProvider form={form} questionnaire={questionnaire}>
      <QuestionnaireLayoutV2>
        <Questionnaire stepper={getStepper()} />
      </QuestionnaireLayoutV2>
    </QuestionnaireProvider>
  );
};

export default Page;
