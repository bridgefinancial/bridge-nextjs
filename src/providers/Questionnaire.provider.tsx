'use client';

import { default as useScrollTo } from '@/hooks/useScrollTo.hook';
import { FieldInformationService } from '@/services/fields.service';
import {
  getFormSubmission,
  useSubmitForm,
} from '@/services/form-submissions.service';
import {
  Condition,
  FormField,
  FormidableForm,
  Page,
  Questionnaire,
} from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import { getLandingConfigKey } from '@/utils/local-storage';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useErrors } from './Errors.provider';

const QUESTIONNAIRE_SUCCESS_REDIRECT_PARAM = 'redirectTo';

export type LandingConfig = {
  formIndex?: number;
  pageIndex?: number;
};

// Define the context
export const QuestionnaireContext = createContext<{
  form?: FormidableForm;
  page?: Page;
  pageIndex: number;
  formIndex: number;
  formsCount: number;
  isSubmitting: boolean;
  isLoading: boolean;
  fieldRefsByName?: MutableRefObject<Record<string, HTMLInputElement | null>>;
  fieldErrorsByName: Record<string, string>;
  formValues: Record<string, any>;
  bodyRef: RefObject<HTMLDivElement> | null;
  showIntro: boolean;
  goTo: ({
    pageIndex,
    formIndex,
  }: {
    pageIndex?: number;
    formIndex?: number;
  }) => void;
  submit: React.FormEventHandler;
  checkPageValidity: (page?: Page) => boolean;
  checkConditions: (conditions?: Condition[]) => boolean;
  handleChange: (name: string, value: any) => void;
  saveAndExit: () => void;
  begin: () => void;
}>({
  form: undefined,
  page: undefined,
  pageIndex: -1,
  formIndex: -1,
  formsCount: 0,
  isSubmitting: false,
  isLoading: true,
  fieldRefsByName: undefined,
  fieldErrorsByName: {},
  formValues: {},
  bodyRef: null,
  showIntro: true,
  goTo: () => {},
  submit: () => {},
  checkPageValidity: () => {
    return false;
  },
  checkConditions: () => {
    return false;
  },
  handleChange: () => {},
  saveAndExit: () => {},
  begin: () => {},
});

type QuestionnaireProviderProps = {
  children: ReactNode;
  questionnaire: Questionnaire;
};

// Define the context provider
export const QuestionnaireProvider = ({
  children,
  questionnaire,
}: QuestionnaireProviderProps) => {
  // LOCAL STORAGE
  const [localValues, setLocalValues, removeLocalValues] = useLocalStorage<
    Record<string, any>
  >(
    `questionnaire-responses-${questionnaire.key}`,
    {},
    {
      serializer: (value) => {
        return JSON.stringify(value);
      },
      deserializer: (value) => {
        try {
          return JSON.parse(value) || {};
        } catch (error) {
          console.log(error);
          return {};
        }
      },
    }
  );
  const [landingConfig, setLandingConfig, removeLandingConfig] =
    useLocalStorage<LandingConfig>(
      getLandingConfigKey(questionnaire),
      {},
      {
        serializer: (value) => {
          return JSON.stringify(value);
        },
        deserializer: (value) => {
          return JSON.parse(value);
        },
      }
    );

  // STATE
  const [formIndex, setFormIndex] = useState<number>(
    landingConfig.formIndex ?? 0
  );
  const [pageIndex, setPageIndex] = useState(landingConfig.pageIndex ?? 0);
  const [fieldErrorsByName, setFieldErrorsByName] = useState<
    Record<string, string>
  >({});
  const [formValues, setFormValues] =
    useState<Record<string, any>>(localValues);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // HOOKS
  const router = useRouter();
  const fieldRefsByName = useRef<Record<string, HTMLInputElement | null>>({});
  const { setErrorsFunc } = useErrors();
  const { mutateAsync: submitForm, isPending: isSubmitting } = useSubmitForm();
  const searchParams = useSearchParams();
  const questionnaireBodyRef = useRef<HTMLDivElement>(null);

  const { onChange: triggerScrollTo } = useScrollTo();
  // CALCULATED
  const { forms, redirectPath } = questionnaire;
  const form = forms[formIndex];
  const [showIntro, setShowIntro] = useState<boolean>(
    landingConfig.pageIndex === undefined && !!form?.intro
  );
  const page = forms[formIndex].definition.pages[pageIndex];
  const redirectTo = useMemo(() => {
    const redirectParam = searchParams.get(
      QUESTIONNAIRE_SUCCESS_REDIRECT_PARAM
    );
    if (redirectParam) {
      const decoded = decodeURIComponent(redirectParam);
      return `${decoded.startsWith('/') ? '' : '/'}${decodeURIComponent(redirectParam)}`;
    }
    return redirectPath ?? `${routePaths.DASHBOARD}?celebrate=t`;
  }, [redirectPath, searchParams]);

  // HANDLERS
  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleComplete = () => {
    removeLocalValues();
    removeLandingConfig();
    router.push(redirectTo);
  };

  const handleSaveAndExit = () => {
    setLocalValues(formValues);
    !showIntro &&
      setLandingConfig({ formIndex: formIndex, pageIndex: pageIndex });
    router.push(routePaths.DASHBOARD);
  };

  const handleBegin = () => {
    setShowIntro(false);
  };

  // const scrollToTop = () => {
  //   // console.log('scrolling');
  //   onTrigger();
  //   // questionnaireBodyRef.current?.scrollTo({
  //   //   top: 0,
  //   // });
  // };

  const goTo = ({
    pageIndex,
    formIndex,
  }: {
    pageIndex?: number;
    formIndex?: number;
  }) => {
    if (formIndex !== undefined) {
      setFormIndex(formIndex);
    }
    if (pageIndex === -1 && !!formIndex) {
      setPageIndex(forms[formIndex].definition.pages.length - 1);
    } else if (pageIndex !== undefined) {
      setPageIndex(pageIndex);
    }
    setTimeout(() => {
      triggerScrollTo();
    }, 100);
    setLandingConfig({ pageIndex, formIndex });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    if (!form || !handleCheckPageValidity()) {
      return;
    }
    // Prevent the default form submission behavior
    event.preventDefault();

    const formDataValues: Record<string, any> = formValues;

    form.definition.pages.forEach((page) => {
      if (handleCheckConditions(page.conditions)) {
        page.fields.forEach((field) => {
          if (
            handleCheckConditions(field.conditions) &&
            FieldInformationService.isNumber(field.type)
          ) {
            formDataValues[field.name] = parseFloat(
              formValues[field.name]?.replaceAll(',', '') ?? ''
            );
          }
        });
      }
    });

    submitForm(
      {
        formId: form.id,
        formData: { data: formDataValues },
      },
      {
        onSuccess: () => {
          if (formIndex === forms.length - 1) {
            handleComplete();
          } else {
            goTo({ pageIndex: 0, formIndex: formIndex + 1 });
          }
        },
        onError: (error) => {
          setErrorsFunc(
            { Error: `Something went wrong: ${error}` },
            undefined,
            true
          );
          setTimeout(() => {
            setErrorsFunc({});
          }, 5000);
        },
      }
    );
  };

  const handleCheckFieldValidity: (field: FormField) => boolean = (
    field: FormField
  ) => {
    // If the form field's conditions are hiding the field, skip validation check
    if (!handleCheckConditions(field.conditions)) {
      return true;
    }

    // check internal fields if those exist
    if ((field.internal_fields?.length ?? 0) > 0) {
      const validity = field.internal_fields?.map((internal) =>
        handleCheckFieldValidity(internal)
      );
      return !!validity?.every(Boolean);
    } else if (FieldInformationService.isDropdown(field.type)) {
      // The React Select component we use for dropdowns does not have a built in
      // input.validity compatibility. So we must use a custom check here.
      const input = fieldRefsByName?.current[field.name];
      const value = input?.value;
      const possibleValues = new Set(
        FieldInformationService.getDefaultSelections(field)?.map((f) => f.value)
      );
      if (field.required && (!value || !possibleValues.has(value))) {
        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: 'This field is required' };
        });
        return false;
      } else {
        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: '' };
        });
        return true;
      }
    } else {
      const input = fieldRefsByName?.current[field.name];
      const validityState = input?.validity;
      if (!validityState?.valid) {
        let message = 'Please fix errors';
        // Check each type of validity error
        if (validityState?.valueMissing) {
          message = 'This field is required';
        } else if (validityState?.typeMismatch) {
          message = 'Input type is incorrect';
        } else if (validityState?.patternMismatch) {
          message =
            field.pattern?.message ??
            'Input does not match the required pattern';
        } else if (validityState?.rangeOverflow) {
          message = `Value must be below ${field.max}`;
        } else if (validityState?.rangeUnderflow) {
          message = `Value must be above ${field.min}`;
        } else if (validityState?.tooLong) {
          message = `Too many characters (max ${field.max_length})`;
        } else if (validityState?.tooShort) {
          message = `Not enough characters (min ${field.min_length})`;
        } else if (validityState?.stepMismatch) {
          message = `Not a valid step value`;
        }

        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: message };
        });
      } else {
        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: '' };
        });
      }
      return !!validityState?.valid;
    }
  };

  const handleCheckPageValidity = (pageToCheck?: Page) => {
    const correctPage = pageToCheck ?? page;
    return !!correctPage?.fields
      .map((field) => handleCheckFieldValidity(field))
      .every(Boolean);
  };

  const handleCheckConditions = (conditions?: Condition[]) => {
    if (!conditions || conditions.length === 0) {
      return true;
    }

    return conditions.every((condition) => handleCheckCondition(condition));
  };

  const handleCheckCondition = (condition: Condition) => {
    if (condition.operator === 'equal') {
      return formValues[condition.dependant_on.name] === condition.value;
    } else if (condition.operator === 'includes') {
      return formValues[condition.dependant_on.name]?.includes(condition.value);
    }
    return false;
  };

  // EFFECTS
  useEffect(() => {
    setIsLoading(true);
    getFormSubmission({ formId: form.id })
      .then((submission) => {
        const defaultValues: Record<string, any> = {};
        const submissionValues = flattenObject(submission.json_blob);
        Object.keys(submissionValues).forEach((key) => {
          if (formValues[key] === undefined) {
            defaultValues[key] = submissionValues[key]?.toString();
          }
        });

        setFormValues((prev) => {
          return {
            ...prev,
            ...defaultValues,
            // Local values should override form submission values, since those are only saved when save & exit is clicked, and are cleared when form is submitted.
            ...localValues,
          };
        });
      })
      .catch(() => {
        console.log('no form submission found');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // DOM

  return (
    <QuestionnaireContext.Provider
      value={{
        formsCount: forms.length,
        form,
        formIndex,
        page,
        pageIndex,
        isSubmitting,
        fieldRefsByName,
        fieldErrorsByName,
        isLoading: isLoading,
        formValues,
        showIntro,
        goTo,
        submit: handleSubmit,
        checkPageValidity: handleCheckPageValidity,
        checkConditions: handleCheckConditions,
        handleChange,
        bodyRef: questionnaireBodyRef,
        saveAndExit: handleSaveAndExit,
        begin: handleBegin,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};

// Custom hook to use the context
export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error(
      'useQuestionnaire must be used within a QuestionnaireProvider'
    );
  }
  return context;
};

function flattenObject(obj: any, result: any = {}): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        // Recursively call flattenObject for nested objects
        flattenObject(obj[key], result);
      } else {
        // If it's a primitive value or an array, add the leaf key-value to the result
        result[key] = obj[key];
      }
    }
  }
  return result;
}
