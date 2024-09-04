import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import React, { forwardRef } from "react";
import FormPage from "./FormPage";
import FormAction, { FormActionConfig } from "./FormAction";
import clsx from "clsx";
import { environment } from "../../../../environments/environment";

type FormProps = {
  previousButtonConfig: FormActionConfig;
  nextButtonConfig: FormActionConfig;
  submitButtonConfig: FormActionConfig;
};

const Form = forwardRef(
  (
    { previousButtonConfig, nextButtonConfig, submitButtonConfig }: FormProps,
    ref: React.ForwardedRef<HTMLFormElement>
  ) => {
    const { form, pageIndex, defaultValues, submit } = useQuestionnaire();

    if (!form) {
      return <></>;
    }

    return (
      <form
        action={`${
          environment["DJANGO_API_BASE_URL"] ?? "http://localhost:8000"
        }/api/submit-form/${form.id}/`}
        onSubmit={submit}
        ref={ref}
      >
        {form.definition.pages.map((page, index) => (
          <div
            key={page.name}
            className={clsx("px-6 pb-32", { hidden: index !== pageIndex })}
          >
            <FormPage
              pageIndex={index}
              page={page}
              defaultValues={defaultValues}
            />
          </div>
        ))}

        <div className="fmd-form-actions flex items-center justify-end gap-4">
          {/* Previous */}
          <FormAction {...previousButtonConfig} />

          {/* Next Page */}
          <FormAction {...nextButtonConfig} />

          {/* Submit */}
          <FormAction {...submitButtonConfig} />
        </div>
      </form>
    );
  }
);

export default Form;
