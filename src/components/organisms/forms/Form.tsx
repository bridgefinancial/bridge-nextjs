import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import FormAction, { FormActionConfig } from "./FormAction";
import FormPage from "./FormPage";

type FormProps = {
  previousButtonConfig: FormActionConfig;
  nextButtonConfig: FormActionConfig;
  submitButtonConfig: FormActionConfig;
};

const Form = forwardRef(
  (
    { previousButtonConfig, nextButtonConfig, submitButtonConfig }: FormProps,
    ref: React.ForwardedRef<HTMLFormElement>,
  ) => {
    const { form, pageIndex, submit, isLoading } = useQuestionnaire();

    // State to track the window height
    const [formHeight, setFormHeight] = useState<number>(0);

    // Calculate the form height based on the window size
    useEffect(() => {
      const updateFormHeight = () => {
        if (typeof window !== "undefined") {
          setFormHeight(window.innerHeight);
        }
      };

      // Set the initial form height
      updateFormHeight();

      // Listen to the window resize event to update the height dynamically
      window.addEventListener("resize", updateFormHeight);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("resize", updateFormHeight);
      };
    }, []);

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
        style={{ height: `${formHeight}px` }} // Set the form height dynamically
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

        <div className="w-full absolute bottom-0 z-20 border-t border-solid border-bridge-gray-border">
          {/* Progress */}
          {/* <div className="w-full flex items-center justify-center gap-2">
            {form.definition.pages.map((_, index) => {
              return (
                <div
                  key={`page-indicator-${index}`}
                  className={clsx("basis-0 shrink grow rounded-full h-2", {
                    "bg-bridge-dark-purple": index < pageIndex,
                    "bg-gray-300": index >= pageIndex,
                  })}
                ></div>
              );
            })}
          </div> */}
          <div className="w-full flex items-center justify-between bg-white py-6 px-16">
            {/* Previous */}
            <FormAction {...previousButtonConfig} />

            {/* Next Page */}
            <FormAction {...nextButtonConfig} />

            {/* Submit */}
            <FormAction {...submitButtonConfig} />
          </div>
          
            </div>
      </form>
    );
  },
);

export default Form;
