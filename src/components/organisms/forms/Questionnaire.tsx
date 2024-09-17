"use client";

import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import React, { useRef } from "react";
import Form from "./Form";
import { FormActionConfig } from "./FormAction";

const Questionnaire = () => {
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
  };

  const previousButtonConfig: FormActionConfig = {
    hidden: isFirstPage && isFirstForm,
    disabled: isSubmitting,
    isLoading: false,
    text: "Previous",
    onClick: () => {
      if (pageIndex === 0 && !isFirstForm) {
        goTo({ formIndex: formIndex - 1, pageIndex: pageIndex - 1 });
      } else {
        goTo({ pageIndex: pageIndex - 1 });
      }
    },
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
