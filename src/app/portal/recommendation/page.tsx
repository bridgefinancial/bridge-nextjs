"use client";

import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";
import { getFormSubmission } from "@/services/form-submissions.service";
import {
  QuestionnaireSlugs,
  RECOMMENDATION_FORM_IDS,
  RECOMMENDATION_QUESTIONNAIRE_SLUGS,
} from "@/services/questionnaires.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RecommendationPage = () => {
  // HOOKS
  const router = useRouter();
  // EFFECTS
  useEffect(() => {
    Promise.all(
      RECOMMENDATION_FORM_IDS.map((id) => {
        try {
          getFormSubmission({ formId: id });
        } catch (error) {
          return null;
        }
      }),
    ).then((submissions) => {
      let questionnaireSlug: QuestionnaireSlugs =
        QuestionnaireSlugs.RECOMMENDATION_GENERAL_INFO;
      const firstUnsubmittedFormIndex = submissions.findIndex((s) => !s);
      if (firstUnsubmittedFormIndex !== -1) {
        questionnaireSlug = RECOMMENDATION_QUESTIONNAIRE_SLUGS[
          firstUnsubmittedFormIndex
        ] as QuestionnaireSlugs;
      }

      router.push(`/q/${questionnaireSlug}`);
    });
  }, []);

  return (
    <CardWithTitle titleProps={{ text: "" }}>
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </CardWithTitle>
  );
};

export default RecommendationPage;
