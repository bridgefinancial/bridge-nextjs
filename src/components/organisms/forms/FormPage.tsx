import TitleText from '@/components/atoms/typography/TitleText';
import { useQuestionnaire } from '@/providers/Questionnaire.provider';
import { Page } from '@/types/forms.types';
import { useMemo } from 'react';
import FormField from './FormField';

type PageProps = {
  page: Page;
  pageIndex: number;
};

const FormPage = ({ page }: PageProps) => {
  const { header = '', fields = [] } = page;
  const { fieldRefsByName, fieldErrorsByName, checkConditions } =
    useQuestionnaire();

  // Check the conditions for the page before rendering
  if (!checkConditions(page.conditions)) {
    return null;
  }

  // Function to render the header, which could be a string or JSX returned by a function
  const renderHeader = useMemo(() => {
    if (typeof header === 'string') {
      return (
        <TitleText sx={{ fontSize: 28, paddingTop: 2 }}>{header}</TitleText>
      );
    } else if (typeof header === 'function') {
      return header(); // If it's a function, invoke it and return JSX
    }
    return null; // Fallback in case header is undefined
  }, [header]);

  return (
    <>
      {renderHeader}

      {/* Form inputs */}
      <div className="flex flex-col gap-8 py-8">
        {fields.map((formField, index) => {
          if (formField.hidden) {
            return null; // Skip rendering if the field is hidden
          }

          return (
            <FormField
              key={index}
              ref={(el: HTMLInputElement | null) => {
                if (el && fieldRefsByName) {
                  fieldRefsByName.current[formField.name] = el; // Assigning refs for the input fields
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
