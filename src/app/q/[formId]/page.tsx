import QuestionnaireLayout from "@/components/templates/layouts/QuestionnaireLayout/QuestionnaireLayout";
import { QuestionnaireProvider } from "@/providers/Questionnaire.provider";
import { QUESTIONNAIRE_BY_SLUG } from "@/services/questionnaires.service";
import React from "react";
import { notFound } from "next/navigation";
import Questionnaire from "@/components/organisms/forms/Questionnaire";

const Page = ({ params }: { params: { formId: string } }) => {
  const questionnaireId = params.formId;

  if (!QUESTIONNAIRE_BY_SLUG[questionnaireId]) {
    notFound();
  }

  return (
    <QuestionnaireProvider forms={QUESTIONNAIRE_BY_SLUG[questionnaireId]}>
      <QuestionnaireLayout>
        <Questionnaire></Questionnaire>
      </QuestionnaireLayout>
    </QuestionnaireProvider>
  );
};

export default Page;
