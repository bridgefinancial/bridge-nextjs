// Define a generic form state and error structure
export interface FormState<TFormValues> {
  formValues: TFormValues;
  formErrors: Partial<Record<keyof TFormValues, any>>; // Allow any type for formErrors
}

// Type definition for FormAction with dynamic value handling
export type FormAction<TFormValues> =
  | { type: "SET_FIELD"; field: keyof TFormValues; value: TFormValues[keyof TFormValues] }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof TFormValues, string>> }
  | { type: "RESET_FORM"; values: TFormValues };

// Generic reducer function for form state management
export function formReducer<TFormValues>(
  state: FormState<TFormValues>,
  action: FormAction<TFormValues>
): FormState<TFormValues> {
  switch (action.type) {
    case "SET_FIELD": {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value,
        },
      };
    }

    case "SET_ERRORS": {
      return {
        ...state,
        formErrors: action.errors,
      };
    }

    case "RESET_FORM": {
      return {
        ...state,
        formValues: action.values,
        formErrors: {}, // Reset errors when resetting form
      };
    }

    default:
      return state;
  }
}
