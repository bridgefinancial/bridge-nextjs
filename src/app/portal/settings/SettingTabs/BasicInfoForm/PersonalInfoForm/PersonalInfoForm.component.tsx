"use client";

import React, { useReducer, ChangeEvent, FormEvent } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import { Box, Typography, Alert } from "@mui/material";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";

// Interfaces for form values and errors
interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
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
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  },
  formErrors: {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
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

const PersonalInfoForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handle change in form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Validate form fields
  const validate = (): boolean => {
    let errors: FormErrors = {};

    if (!state.formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.formValues.email)) {
      errors.email = "Invalid email address";
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
      {/* Personal Info Header */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, marginBottom: 0.1, }}>
        <TitleText  sx={{ 
          fontSize: 20
         }} component="h3">
          Personal Info
        </TitleText>
        <ParagraphText sx={{ 
          fontWeight: 600
         }}  >
          Only name and image will be displayed publicly.
        </ParagraphText>
      </Box>

      {/* First Name Input */}
      <TextInputGroup
        label="First name"
        type="text"
        fullWidth
        margin="normal"
        name="firstName"
        value={state.formValues.firstName}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.firstName)}
        helperText={state.formErrors?.firstName}
      />

      {/* Last Name Input */}
      <TextInputGroup
        label="Last name"
        type="text"
        fullWidth
        margin="normal"
        name="lastName"
        value={state.formValues.lastName}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.lastName)}
        helperText={state.formErrors?.lastName}
      />

      {/* Email Input */}
      <TextInputGroup
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        name="email"
        value={state.formValues.email}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.email)}
        helperText={state.formErrors?.email}
      />

      {/* Phone Number Input */}
      <TextInputGroup
        label="Phone number"
        type="text"
        fullWidth
        margin="normal"
        name="phoneNumber"
        value={state.formValues.phoneNumber}
        onChange={handleChange}
        error={Boolean(state.formErrors && state.formErrors.phoneNumber)}
        helperText={state.formErrors?.phoneNumber}
      />

    
      {/* Save Changes Button */}
      <Box sx={{ alignSelf: "flex-end" }}>
        <ContainedButton
          textProps={{ 
            sx: {
              fontWeight: 'bold',
              color: "white",
              fontSize: 14
            }
           }}
          fullWidth
          backgroundColor={colors.bridgeDarkPurple}
          text={<strong>Save Changes</strong>}
          type="submit"
        />
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;