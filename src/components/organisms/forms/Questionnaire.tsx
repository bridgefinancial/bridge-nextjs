"use client";

import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import React, { ReactNode, useRef, useState } from "react";
import Form from "./Form";
import { FormActionConfig } from "./FormAction";
import { ArrowForward } from "@mui/icons-material";
import FormIntro from "./FormIntro";

type QuestionnaireProps = {
  stepper?: ReactNode;
};

const Questionnaire = ({ stepper }: QuestionnaireProps) => {
  // HOOKS
  const {
    formsCount,
    form,
    page,
    formIndex,
    pageIndex,
    goTo,
    checkPageValidity,
    isSubmitting,
  } = useQuestionnaire();

  // STATE
  const [showIntro, setShowIntro] = useState(!!form?.intro);

  // REFS
  const formRef = useRef<HTMLFormElement>(null);

  // CALCULATED
  const isFirstPage = pageIndex === 0;
  const isLastPage = !!form && pageIndex === form?.definition.pages.length - 1;
  const isFirstForm = formIndex === 0;
  const isLastForm = formIndex === formsCount - 1;
  const progress = form ? pageIndex + 1 / form.definition.pages.length : 0;
  const nextButtonConfig: FormActionConfig = {
    hidden: isLastPage,
    disabled: isSubmitting,
    isLoading: false,
    text: "Next",
    onClick: () => {
      if (checkPageValidity(page)) {
        goTo({ pageIndex: pageIndex + 1 });
      }
    },
    endIcon: <ArrowForward />,
  };

  const previousButtonConfig: FormActionConfig = {
    hidden: false,
    disabled: isSubmitting || (isFirstPage && isFirstForm),
    isLoading: false,
    text: "Back",
    onClick: () => {
      if (pageIndex === 0 && !isFirstForm) {
        goTo({ formIndex: formIndex - 1, pageIndex: pageIndex - 1 });
      } else {
        goTo({ pageIndex: pageIndex - 1 });
      }
    },
    variant: "text",
  };

  const submitButtonConfig: FormActionConfig = {
    type: "submit",
    hidden: !isLastPage,
    disabled: isSubmitting,
    isLoading: isSubmitting,
    text: isLastForm ? "Submit" : "Next",
    onClick: (e) => {
      if (!checkPageValidity()) {
        e.preventDefault();
      }
    },
  };

  // DOM

  if (!form) {
    return <></>;
  }

  if (!!form.intro && showIntro) {
    return (
      <FormIntro
        {...form.intro}
        onClick={() => {
          setShowIntro(false);
        }}
        stepper={stepper}
      />
    );
  }

  return (
    <Form
      ref={formRef}
      nextButtonConfig={nextButtonConfig}
      previousButtonConfig={previousButtonConfig}
      submitButtonConfig={submitButtonConfig}
    />
  );
};

export default Questionnaire;
