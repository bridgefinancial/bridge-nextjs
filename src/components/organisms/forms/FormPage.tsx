import { Page } from "@/types/forms.types";
import React from "react";
import FormField from "./FormField";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";

type PageProps = {
  page: Page;
  pageIndex: number;
  defaultValues?: Record<string, any>;
};

const FormPage = ({ page, defaultValues }: PageProps) => {
  const { fieldRefsByName, fieldErrorsByName } = useQuestionnaire();
  return (
    <>
      <h1>{page.header}</h1>

      {/* Form inputs */}
      <div className="flex flex-col gap-8 py-8">
        {page.fields.map((formField, index) =>
          !formField.hidden ? (
            <FormField
              key={index}
              ref={(el: HTMLInputElement) => {
                if (fieldRefsByName) {
                  fieldRefsByName.current[formField.name] = el;
                }
              }}
              formField={formField}
              defaultValue={defaultValues?.[page.name]?.[formField.name]}
              error={fieldErrorsByName[formField.name]}
            />
          ) : null
        )}
      </div>
    </>
  );
};

export default FormPage;