"use client";

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import SelectInputGroup from "@/components/molecules/forms/SelectInputGroup";
import { SelectChangeEvent, Box, Typography, Alert } from "@mui/material";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";

// Industries data
const industries = {
  count: 130,
  results: [
    { id: 49, name: "Accounting and Tax Practices" },
    { id: 108, name: "Architecture and Engineering Firms" },
    { id: 42, name: "Art Galleries" },
    // Add more industries as needed...
  ],
};

// Extract the industry names into an array for the select options
const industryOptions = industries.results.map((industry) => ({
  value: industry.id,
  label: industry.name,
}));

interface FormValues {
  businessName?: string;
  industry?: string;
}

interface FormErrors {
  businessName?: string;
  industry?: string;
}

type Action =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors };

interface State {
  formValues: FormValues;
  formErrors: FormErrors;
}

const initialState: State = {
  formValues: {
    businessName: "",
    industry: "",
  },
  formErrors: {
    businessName: "",
    industry: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value,
        },
      };
    case "SET_ERRORS":
      return {
        ...state,
        formErrors: action.errors,
      };
    default:
      return state;
  }
}

const CompanyInfoForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle change for text inputs
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Handle change for select inputs
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    const { name, value } = e.target;
    dispatch({
      type: "SET_FIELD",
      field: name as string,
      value: value as string,
    });
  };

  // Validate form fields
  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!state.formValues.businessName) {
      errors.businessName = "Business name is required";
    }

    if (!state.formValues.industry) {
      errors.industry = "Industry is required";
    }

    dispatch({ type: "SET_ERRORS", errors });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Process the form
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 430,
        paddingTop: 4,
      }}
    >
      {/* Company Info Header */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <TitleText
          sx={{
            fontSize: 20,
          }}
          component="h3"
        >
          Company Info
        </TitleText>
      </Box>

      {/* Business Name Input */}
      <TextInputGroup
        label="Business Name"
        type="text"
        fullWidth={true}
        margin="normal"
        name="businessName"
        value={state.formValues.businessName}
        onChange={handleTextInputChange} // Handles text input changes
        error={Boolean(state.formErrors.businessName)}
        helperText={state.formErrors.businessName}
      />

      {/* Industry Selection Input */}
      <SelectInputGroup
        label="Industry"
        name="industry"
        value={state.formValues.industry}
        onChange={handleSelectChange} // Handles select input changes
        options={industryOptions}
        error={Boolean(state.formErrors.industry)}
        helperText={state.formErrors.industry}
      />

      {/* Save Changes Button */}
      <Box sx={{ alignSelf: "flex-end" }}>
        <ContainedButton
          textProps={{
            sx: {
              fontWeight: "bold",
              color: "white",
              fontSize: 14,
            },
          }}
          fullWidth={true}
          backgroundColor={colors.bridgeDarkPurple}
          text={<strong>Save Changes</strong>}
          type="submit"
        />{" "}
      </Box>
    </Box>
  );
};

export default CompanyInfoForm;
