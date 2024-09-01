"use client";

import {
  FormField,
  FormidableForm,
  FormSubmission,
  Page,
} from "@/types/forms.types";
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useErrors } from "./Errors.provider";

// Define the context
export const QuestionnaireContext = createContext<{
  form?: FormidableForm;
  page?: Page;
  pageIndex: number;
  formIndex: number;
  formsCount: number;
  defaultValues?: Object;
  isSubmitting: boolean;
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
  // TODO: Fetch defaultValues
  // TODO: Add authentication
  // STATE
  const [formIndex, setFormIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completionPercent, setCompletionPercent] = useState(0);
  const [fieldErrorsByName, setFieldErrorsByName] = useState<
    Record<string, string>
  >({});

  // CALCULATED
  const form = forms[formIndex];
  const page = forms[formIndex].definition.pages[pageIndex];

  // HOOKS
  const fieldRefsByName = useRef<Record<string, HTMLInputElement | null>>({});
  const { setToastOpen, setErrorsFunc, state } = useErrors();

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
    setIsSubmitting(true);
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

    try {
      // Get the form ID from the environment or a default value
      const apiUrl = `${
        process.env.REACT_APP_DJANGO_API_BASE_URL ?? "http://localhost:8000"
      }/api/submit-form/${form.id}/`;

      // Send a POST request to the server with the form data
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Assuming the server expects JSON
          Accept: "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      // Handle success
      const responseData = await response.json();
      if (formIndex === forms.length - 1) {
        handleComplete(responseData);
      } else {
        goTo({ pageIndex: 0, formIndex: formIndex + 1 });
      }

      // You can redirect or show a success message here
      // For example: window.location.href = '/success-page';
    } catch (error) {
      // Handle errors
      console.log("error");
      setErrorsFunc(
        { Error: `Something went wrong: ${error}` },
        undefined,
        true
      );
      setTimeout(() => {
        setErrorsFunc({});
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
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
        let message = "Please fix any errors";
        // Check each type of validity error
        if (validityState?.valueMissing) {
          message = "Input is required.";
        } else if (validityState?.typeMismatch) {
          message = "Input type is incorrect.";
        } else if (validityState?.patternMismatch) {
          message =
            field.pattern?.message ??
            "Input does not match the required pattern";
        }

        setFieldErrorsByName((prev) => {
          return { ...prev, [field.name]: message };
        });
      }
      return !!validityState?.valid;
    }
  };

  const handleCheckPageValidity = () => {
    return !!page?.fields.every((field) => handleCheckFieldValidity(field));
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
