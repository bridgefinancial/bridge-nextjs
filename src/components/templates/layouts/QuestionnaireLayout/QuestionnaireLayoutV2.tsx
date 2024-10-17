"use client";

import QuestionnaireHeader from "@/components/organisms/headers/QuestionnaireHeader";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import { ReactNode } from "react";

type QuestionnaireLayoutProps = {
  children?: ReactNode;
};

const QuestionnaireLayout = ({ children }: QuestionnaireLayoutProps) => {
  const { bodyRef } = useQuestionnaire();
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-stretch justify-stretch">
        <QuestionnaireHeader />

        {/* BODY */}
        <div
          className="grow bg-white w-full"
          id="questionnaire-body"
          ref={bodyRef}
        >
          {/* MOBILE PROGRESS */}
          {/* TODO: Implement mobile progress bar if needed */}
          <div className=" pt-4 box-border flex flex-col min-h-full mx-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireLayout;
