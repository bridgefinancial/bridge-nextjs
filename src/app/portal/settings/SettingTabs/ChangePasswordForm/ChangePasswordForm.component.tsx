"use client";

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import { Box, Typography } from "@mui/material";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";

// Interfaces for form values and errors
interface FormValues {
  password: string;
  password1: string;
  password2: string;
}

interface FormErrors {
  password?: string;
  password1?: string;
  password2?: string;
}

// Action types for reducer
type Action =
  | { type: "SET_FIELD"; field: string; value: string }
  | { type: "SET_ERRORS"; errors: FormErrors };

interface State {
  formValues: FormValues;
  formErrors: FormErrors;
}

const initialState: State = {
  formValues: {
    password: "",
    password1: "",
    password2: "",
  },
  formErrors: {
    password: "",
    password1: "",
    password2: "",
  },
};

// Reducer function to manage form state
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

const ChangePasswordForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle change in form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Validate form fields
  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!state.formValues.password) {
      errors.password = "Current password is required";
    }
    if (!state.formValues.password1) {
      errors.password1 = "New password is required";
    }
    if (state.formValues.password1 !== state.formValues.password2) {
      errors.password2 = "Passwords do not match";
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
      }}
    >
      {/* Personal Info Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          marginBottom: 0.1,
        }}
      >
        <TitleText sx={{ fontSize: 20 }} component="h3">
          Change Password
        </TitleText>
        <ParagraphText sx={{ fontWeight: 600 }}>
          Select a secure new password to protect your account.
        </ParagraphText>
      </Box>

      {/* Current Password Input */}
      <TextInputGroup
        label="Current password"
        type="password"
        fullWidth={true}
        margin="normal"
        name="password"
        value={state.formValues.password}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.password)}
        helperText={state.formErrors?.password}
      />

      {/* New Password Input */}
      <TextInputGroup
        label="New password"
        type="password"
        fullWidth={true}
        margin="normal"
        name="password1"
        value={state.formValues.password1}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.password1)}
        helperText={state.formErrors?.password1}
      />

      {/* Confirm Password Input */}
      <TextInputGroup
        label="Confirm password"
        type="password"
        fullWidth={true}
        margin="normal"
        name="password2"
        value={state.formValues.password2}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.password2)}
        helperText={state.formErrors?.password2}
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
        />
      </Box>
    </Box>
  );
};

export default ChangePasswordForm;
