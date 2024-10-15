import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import FormFooter from "../FormFooter/FormFooter.component";
import { FormActionConfig } from "./FormAction";
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

    // State to track if the user is scrolling
    const [isScrolling, setIsScrolling] = useState<boolean>(false);

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

    // Scroll event listener
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        // Optional: Set a timer to reset the state after scrolling stops
        const scrollTimeout = setTimeout(() => {
          setIsScrolling(false);
        }, 1000); // Adjust the delay as needed
        return () => clearTimeout(scrollTimeout);
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
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
        className="bg-white"
        style={{ minHeight: `${formHeight}px` }} // Set the form height dynamically
        onChange={(e) => {
          // force rerender each time a form input value changes
        }}
      >
        <div className="px-6 mx-auto max-w-xl bg-white">
          {isLoading ? (
            <div className="flex flex-col gap-4 bg-white">
              <div className="bg-gray-200 animate-pulse w-full rounded-xl h-20" />
              <div className="bg-gray-200 animate-pulse w-1/2 rounded-xl h-20" />
              <div className="bg-gray-200 animate-pulse w-1/2 rounded-xl h-10" />
            </div>
          ) : (
            <>
              {form.definition.pages.map((page, index) => (
                <div
                  key={page.name}
                  className={clsx("pb-2 bg-white", {
                    hidden: index !== pageIndex,
                  })}
                >
                  <FormPage pageIndex={index} page={page} />
                </div>
              ))}
            </>
          )}
        </div>
        <FormFooter
          isScrolling={isScrolling}
          previousButtonConfig={previousButtonConfig}
          nextButtonConfig={nextButtonConfig}
          submitButtonConfig={submitButtonConfig}
        />
        {/* Optional: Display whether the user is scrolling */}
      </form>
    );
  },
);

export default Form;
