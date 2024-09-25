"use client";

import React, { useReducer, ChangeEvent, FormEvent, useState } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import {
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";
import { useIndustries } from "@/services/industries.service";
import { Industry } from "@/types/industries.types";
import { useUpdateCompany } from "@/services/companies.service";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";

interface FormValues {
  businessName?: string;
  [key: string]: any,
  industry?: string; // Stores the industry ID as a string
}

interface FormErrors {
  businessName?: string;
  industry?: string;
}

type Action =
  | { type: "SET_FIELD"; field: keyof FormValues; value: string }
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
  formErrors: {},
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

interface CompanyInfoProps {
  initialCompanyState?: Partial<FormValues>; // Allow partial input
  currentCompanyId?: number | string;
  refetchCompany: () => void | any;
}

const CompanyInfoForm: React.FC<CompanyInfoProps> = ({
  initialCompanyState,
  currentCompanyId,
  refetchCompany,
}: CompanyInfoProps) => {
  const initialFormValues: FormValues = {
    businessName: initialCompanyState?.businessName || "",
    industry: initialCompanyState?.industry || "",
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    formValues: initialFormValues,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const { data: industries } = useIndustries();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | undefined>(
    industries?.results.find(industry => industry.id.toString() === state.formValues.industry) || undefined
  );

  const {
    mutate: submitChanges,
    isSuccess,
    isError,
    isPending,
  } = useUpdateCompany();

  // Handle change for text inputs
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name as keyof FormValues, value });
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
    if (validate() && currentCompanyId !== undefined) {
      const updatedValues = {
        ...state.formValues,
        industry: selectedIndustry, // Ensure the industry is passed as an object (Industry) not just the id
      };

      submitChanges(
        {
          attributes: {
            name: updatedValues.businessName,
            industry: updatedValues.industry
          },
          id: currentCompanyId as any,
        },
        {
          onSuccess: () => {
            refetchCompany();
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
        fullWidth
        margin="normal"
        name="businessName"
        value={state.formValues.businessName}
        onChange={handleTextInputChange}
        error={Boolean(state.formErrors.businessName)}
        helperText={state.formErrors.businessName}
        disabled={isPending}
      />

      {/* Industry Autocomplete */}
      <Autocomplete
        options={industries?.results ?? []}
        getOptionLabel={(industry) => industry.name}
        value={selectedIndustry || null}
        onChange={(e, value) => {
          setSelectedIndustry(value || undefined);
          dispatch({
            type: "SET_FIELD",
            field: "industry",
            value: value ? value.id.toString() : "",
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Industry"
            variant="filled"
            fullWidth
            margin="normal"
            name="industry"
            error={Boolean(state.formErrors.industry)}
            helperText={state.formErrors.industry}
            disabled={isPending}
          />
        )}
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
            ? "Company Updated Successfully"
            : isError
              ? "Failed to update company."
              : "Updating..."
        }
      />
    </Box>
  );
};

export default CompanyInfoForm;
