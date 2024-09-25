"use client";

import React, { useReducer, ChangeEvent, FormEvent, useState } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import { Box } from "@mui/material";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";
import { useSessionUser, useUpdateUser } from "@/services/users.service";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";

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
  | { type: "SET_FIELD"; field: keyof FormValues; value: string }
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
  formErrors: {},
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

interface PersonalInfoFormProps {
  initialUserState?: Partial<FormValues>; // Allow partial input
  currentUserId?: number | string;
  refetchUser: () => void | any;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialUserState,
  currentUserId,
  refetchUser,
}) => {
  // Merge default initialState with provided initialUserState to ensure no undefined values
  const initialFormValues: FormValues = {
    email: initialUserState?.email || "",
    firstName: initialUserState?.firstName || "",
    lastName: initialUserState?.lastName || "",
    phoneNumber: initialUserState?.phoneNumber || "",
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    formValues: initialFormValues,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const {
    mutate: submitChanges,
    isSuccess,
    isError,
    isPending,
  } = useUpdateUser();
  // Handle change in form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name as keyof FormValues, value });
  };

  // Validate form fields
  const validate = (): boolean => {
    const errors: FormErrors = {};

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
    if (validate() && currentUserId !== undefined) {
      submitChanges(
        {
          attributes: {
            first_name: state.formValues.firstName,
            last_name: state.formValues.lastName,
            phone: state.formValues.phoneNumber,
            email: state.formValues.email,
          },
          id: currentUserId as string,
        },
        {
          onSuccess: () => {
            refetchUser();
          },
          onSettled: () => {
            setToastOpen(true);
          },
        }
      );
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          marginBottom: 0.1,
        }}
      >
        <TitleText
          sx={{
            fontSize: 20,
          }}
          component="h3"
        >
          Personal Info
        </TitleText>
        <ParagraphText
          sx={{
            fontWeight: 600,
          }}
        >
          Only name and image will be displayed publicly.
        </ParagraphText>
      </Box>

      {/* First Name Input */}
      <TextInputGroup
        label="First name"
        type="text"
        shrinkLabel={true}
        fullWidth
        margin="normal"
        name="firstName"
        placeholder={initialUserState?.firstName || "Enter first name"}
        value={state.formValues.firstName}
        onChange={handleChange}
        error={Boolean(state.formErrors.firstName)}
        helperText={state.formErrors?.firstName}
        disabled={isPending}
      />

      {/* Last Name Input */}
      <TextInputGroup
        label="Last name"
        type="text"
        fullWidth
        shrinkLabel={true}
        margin="normal"
        name="lastName"
        placeholder={initialUserState?.lastName || "Enter last name"}
        value={state.formValues.lastName}
        onChange={handleChange}
        error={Boolean(state.formErrors.lastName)}
        helperText={state.formErrors?.lastName}
        disabled={isPending}
      />

      {/* Email Input */}
      <TextInputGroup
        label="Email"
        type="email"
        shrinkLabel={true}
        fullWidth
        margin="normal"
        name="email"
        placeholder={initialUserState?.email || "Enter email"}
        value={state.formValues.email}
        onChange={handleChange}
        error={Boolean(state.formErrors.email)}
        helperText={state.formErrors?.email}
        disabled={isPending}
      />

      {/* Phone Number Input */}
      <TextInputGroup
        label="Phone number"
        type="text"
        fullWidth
        shrinkLabel={true}
        margin="normal"
        disabled={isPending}
        name="phoneNumber"
        placeholder={initialUserState?.phoneNumber || "Enter phone number"}
        value={state.formValues.phoneNumber}
        onChange={handleChange}
        error={Boolean(state.formErrors.phoneNumber)}
        helperText={state.formErrors?.phoneNumber}
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
          disabled={isPending}
          fullWidth
          backgroundColor={colors.bridgeDarkPurple}
          text={<strong>Save Chang{isPending ? "ing" : "e"}</strong>}
          type="submit"
        />
      </Box>

      {/* Toast Notification */}
      <ToastNotification
        setOpen={setToastOpen}
        open={toastOpen}
        severity={isSuccess ? "success" : isError ? "error" : "info"}
        message={
          isSuccess
            ? "Profile Updated Successfully"
            : isError
              ? "Failed to update profile."
              : "Updating..."
        }
      />
    </Box>
  );
};

export default PersonalInfoForm;
