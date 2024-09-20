import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import React, { useEffect, useRef, forwardRef } from "react";
import ReactDOM from "react-dom";
import FormPage from "./FormPage";
import FormAction, { FormActionConfig } from "./FormAction";
import clsx from "clsx";
import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import { Box } from "@mui/material";

type FormProps = {
  previousButtonConfig: FormActionConfig;
  nextButtonConfig: FormActionConfig;
  submitButtonConfig: FormActionConfig;
};

interface FormFooterProps extends FormProps {
  pageIndex: number;
  form: any; // Adjust this type based on the structure of the form object
}

const FormFooter = (props: FormFooterProps) => {
  const {
    form,
    pageIndex,
    previousButtonConfig,
    nextButtonConfig,
    submitButtonConfig,
  } = props;

  // Create a ref for the portal container div
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create a div element and append it to the document body
    const portalDiv = document.createElement("div");
    portalContainerRef.current = portalDiv;
    document.body.appendChild(portalDiv);

    // Clean up the div element when the component unmounts
    return () => {
      if (portalDiv) {
        document.body.removeChild(portalDiv);
      }
    };
  }, []);

  if (!portalContainerRef.current) {
    return null;
  }

  // Render the FormFooter via a portal
  return ReactDOM.createPortal(
    <Box sx={{ position: "fixed", bottom: 0, width: "100%" }}>
      <div className="w-full absolute bottom-0">
        {/* Progress */}
        <div className="w-full flex items-center justify-center gap-2">
          {form.definition.pages.map((_: any, index: number) => {
            return (
              <div
                key={`page-indicator-${index}`}
                className={clsx("basis-0 shrink grow rounded-full h-2", {
                  "bg-bridge-dark-purple": index < pageIndex,
                  "bg-gray-300": index >= pageIndex,
                })}
              />
            );
          })}
        </div>
        <Box>
          <div
           
            className="w-full flex items-center justify-between bg-white py-6 px-16"
          >
            {/* Previous */}
            <FormAction {...previousButtonConfig} />

            {/* Next Page */}
            <FormAction {...nextButtonConfig} />

            {/* Submit */}
            <FormAction {...submitButtonConfig} />
          </div>
        </Box>
      </div>
    </Box>,
    portalContainerRef.current // Dynamically created portal container
  );
};

const Form = forwardRef(
  (
    { previousButtonConfig, nextButtonConfig, submitButtonConfig }: FormProps,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { form, pageIndex, submit, isLoading } = useQuestionnaire();

    if (isLoading) {
      return (
        <div className="w-full h-full">
          <LoadingSpinner />
        </div>
      );
    }

    if (!form) {
      return <></>;
    }

    return (
      <form
        onSubmit={submit}
        ref={ref}
        onChange={(e) => {
          // force rerender each time a form input value changes
        }}
      >
        <div className="px-6 mx-auto max-w-xl">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-200 animate-pulse w-full rounded-xl h-20" />
              <div className="bg-gray-200 animate-pulse w-1/2 rounded-xl h-20" />
              <div className="bg-gray-200 animate-pulse w-1/2 rounded-xl h-10" />
            </div>
          ) : (
            <>
              {form.definition.pages.map((page, index) => (
                <div
                  key={page.name}
                  className={clsx("pb-32", { hidden: index !== pageIndex })}
                >
                  <FormPage pageIndex={index} page={page} />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer is now rendered through a portal */}
        <FormFooter
          previousButtonConfig={previousButtonConfig}
          nextButtonConfig={nextButtonConfig}
          submitButtonConfig={submitButtonConfig}
          form={form}
          pageIndex={pageIndex}
        />
      </form>
    );
  }
);

export default Form;
