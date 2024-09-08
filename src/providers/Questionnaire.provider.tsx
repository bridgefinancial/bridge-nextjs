"use client";

import { FormField, FormidableForm, Page } from "@/types/forms.types";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import { useErrors } from "./Errors.provider";
import {
  useFormSubmission,
  useSubmitForm,
} from "@/services/form-submissions.service";

// Define the context
export const QuestionnaireContext = createContext<{
  form?: FormidableForm;
  page?: Page;
  pageIndex: number;
  formIndex: number;
  formsCount: number;
  defaultValues?: Record<string, any>;
  isSubmitting: boolean;
  isLoading: boolean;
  fieldRefsByName?: MutableRefObject<Record<string, HTMLInputElement | null>>;
  fieldErrorsByName: Record<string, string>;
  goTo: ({
    pageIndex,
    formIndex,
  }: {
    pageIndex?: number;
    formIndex?: number;
  }) => void;
  submit: React.FormEventHandler;
  checkPageValidity: () => boolean;
}>({
  form: undefined,
  page: undefined,
  pageIndex: -1,
  formIndex: -1,
  formsCount: 0,
  defaultValues: undefined,
  isSubmitting: false,
  isLoading: true,
  fieldRefsByName: undefined,
  fieldErrorsByName: {},
  goTo: () => {},
  submit: () => {},
  checkPageValidity: () => {
    return false;
  },
});

type QuestionnaireProviderProps = {
  children: ReactNode;
  forms: FormidableForm[];
};

// Define the context provider
export const QuestionnaireProvider = ({
  children,
  forms,
}: QuestionnaireProviderProps) => {
  // STATE
  const [formIndex, setFormIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [fieldErrorsByName, setFieldErrorsByName] = useState<
    Record<string, string>
  >({});

  // CALCULATED
  const form = forms[formIndex];
  const page = forms[formIndex].definition.pages[pageIndex];

  // HOOKS
  const fieldRefsByName = useRef<Record<string, HTMLInputElement | null>>({});
  const { setErrorsFunc } = useErrors();
  const { data: formSubmission, isLoading } = useFormSubmission({
    formId: form.id,
  });
  const { mutateAsync: submitForm, isPending: isSubmitting } = useSubmitForm();

  // HANDLERS
  const handleComplete = (data: any) => {
    console.log("form complete!");
  };

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
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    if (!form || !handleCheckPageValidity()) {
      return;
    }
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form element from the event
    const formElement = event.target as HTMLFormElement;

    // Create a FormData object from the form element
    const formData = new FormData(formElement);

    // Convert the FormData object to a plain object
    const formDataObject: Record<string, any> = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    submitForm(
      {
        formId: form.id,
        formData: { data: formDataObject },
      },
      {
        onSuccess: (responseData) => {
          if (formIndex === forms.length - 1) {
            handleComplete(responseData);
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
    if ((field.internal_fields?.length ?? 0) > 0) {
      return !!field.internal_fields?.every((internal) =>
        handleCheckFieldValidity(internal)
      );
    } else {
      const input = fieldRefsByName?.current[field.name];
      const validityState = input?.validity;
      if (!validityState?.valid) {
        let message = "Please fix errors";
        // Check each type of validity error
        if (validityState?.valueMissing) {
          message = "This field is required";
        } else if (validityState?.typeMismatch) {
          message = "Input type is incorrect";
        } else if (validityState?.patternMismatch) {
          message =
            field.pattern?.message ??
            "Input does not match the required pattern";
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

        console.log(message);

        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: message };
        });
      } else {
        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: "" };
        });
      }
      return !!validityState?.valid;
    }
  };

  const handleCheckPageValidity = () => {
    return !!page?.fields
      .map((field) => handleCheckFieldValidity(field))
      .every(Boolean);
  };

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
        defaultValues: flattenObject(formSubmission?.json_blob ?? {}),
        isLoading: isLoading,
        goTo,
        submit: handleSubmit,
        checkPageValidity: handleCheckPageValidity,
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
      "useQuestionnaire must be used within a QuestionnaireProvider"
    );
  }
  return context;
};

function flattenObject(obj: any, result: any = {}): any {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (
        typeof obj[key] === "object" &&
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
