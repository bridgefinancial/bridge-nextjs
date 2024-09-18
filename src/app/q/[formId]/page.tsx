import { QuestionnaireProvider } from "@/providers/Questionnaire.provider";
import { QUESTIONNAIRE_BY_SLUG } from "@/services/questionnaires.service";
import React from "react";
import { notFound } from "next/navigation";
import Questionnaire from "@/components/organisms/forms/Questionnaire";
import QuestionnaireLayoutV2 from "@/components/templates/layouts/QuestionnaireLayout/QuestionnaireLayoutV2";

const Page = ({ params }: { params: { formId: string } }) => {
  const questionnaireId = params.formId;
  const questionnaire = QUESTIONNAIRE_BY_SLUG[questionnaireId];

  if (!questionnaire) {
    notFound();
  }

  return (
    <QuestionnaireProvider questionnaire={questionnaire}>
      <QuestionnaireLayoutV2>
        <Questionnaire />
      </QuestionnaireLayoutV2>
    </QuestionnaireProvider>
  );
};

export default Page;
