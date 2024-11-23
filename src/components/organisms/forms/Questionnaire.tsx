'use client';

import { useQuestionnaire } from '@/providers/Questionnaire.provider';
import { ArrowForward } from '@mui/icons-material';
import { ReactNode, useMemo, useRef } from 'react';
import Form from './Form';
import { FormActionConfig } from './FormAction';
import FormIntro from './FormIntro';

// Define types for props
interface QuestionnaireProps {
  stepper?: ReactNode;
}

const Questionnaire = ({ stepper }: QuestionnaireProps) => {
  // HOOKS
  const {
    form,
    page,
    pageIndex,
    goTo,
    checkPageValidity,
    isSubmitting,
    begin,
    showIntro,
  } = useQuestionnaire();

  // REFS
  const formRef = useRef<HTMLFormElement>(null);

  // MEMOIZED CALCULATED VALUES
  const isFirstPage = useMemo(() => pageIndex === 0, [pageIndex]);
  const isLastPage = useMemo(
    () => !!form && pageIndex === form.definition.pages.length - 1,
    [form, pageIndex]
  );
  const progress = useMemo(
    () => (form ? (pageIndex + 1) / form.definition.pages.length : 0),
    [form, pageIndex]
  );

  // BUTTON CONFIGS MEMOIZED
  const nextButtonConfig: FormActionConfig = useMemo(
    () => ({
      hidden: isLastPage,
      disabled: isSubmitting,
      isLoading: false,
      text: 'Next',
      onClick: () => {
        if (checkPageValidity(page)) {
          goTo({ pageIndex: pageIndex + 1 });
        }
      },
      endIcon: <ArrowForward />,
    }),
    [isLastPage, isSubmitting, page, checkPageValidity, pageIndex, goTo]
  );

  const previousButtonConfig: FormActionConfig = useMemo(
    () => ({
      hidden: false,
      disabled: isSubmitting || isFirstPage,
      isLoading: false,
      text: 'Back',
      onClick: () => {
        goTo({ pageIndex: pageIndex - 1 });
      },
      variant: 'text',
    }),
    [isSubmitting, isFirstPage, pageIndex, goTo]
  );

  const submitButtonConfig: FormActionConfig = useMemo(
    () => ({
      type: 'submit',
      hidden: !isLastPage,
      disabled: isSubmitting,
      isLoading: isSubmitting,
      text: 'Submit',
      onClick: (e) => {
        if (!checkPageValidity()) {
          e.preventDefault();
        }
      },
    }),
    [isLastPage, isSubmitting, checkPageValidity]
  );

  // DOM

  if (!form) {
    return null;
  }

  if (form.intro && showIntro) {
    return (
      <FormIntro
        {...form.intro}
        onClick={() => {
          begin();
          goTo({ pageIndex: 0 });
        }}
        stepper={stepper}
      />
    );
  }

  return (
    <Form
      progress={progress}
      ref={formRef}
      nextButtonConfig={nextButtonConfig}
      previousButtonConfig={previousButtonConfig}
      submitButtonConfig={submitButtonConfig}
    />
  );
};

export default Questionnaire;
