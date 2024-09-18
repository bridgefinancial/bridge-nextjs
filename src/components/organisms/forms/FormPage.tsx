import { Page } from "@/types/forms.types";
import React from "react";
import FormField from "./FormField";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";

type PageProps = {
  page: Page;
  pageIndex: number;
};

const FormPage = ({ page }: PageProps) => {
  const { fieldRefsByName, fieldErrorsByName, checkConditions } =
    useQuestionnaire();

  if (!checkConditions(page.conditions)) {
    return null;
  }

  return (
    <>
      <h1>{page.header}</h1>

      {/* Form inputs */}
      <div className="flex flex-col gap-8 py-8">
        {page.fields.map((formField, index) => {
          if (formField.hidden) {
            return null;
          }

          return (
            <FormField
              key={index}
              ref={(el: HTMLInputElement) => {
                if (fieldRefsByName) {
                  fieldRefsByName.current[formField.name] = el;
                }
              }}
              formField={formField}
              error={fieldErrorsByName[formField.name]}
            />
          );
        })}
      </div>
    </>
  );
};

export default FormPage;
