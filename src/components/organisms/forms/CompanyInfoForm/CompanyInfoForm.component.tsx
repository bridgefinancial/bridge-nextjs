import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import { UseCompanyFormReturn } from "@/hooks/useCompanyForm.hook";
import { colors } from "@/theme/theme";
import { Industry } from "@/types/industries.types";
import { Autocomplete, Box, TextField } from "@mui/material";
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface CompanyFormInfoProps extends UseCompanyFormReturn {
  formState: UseCompanyFormReturn["formState"];
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
  industries: Industry[];
  onIndustryChange: UseCompanyFormReturn["onIndustryChange"];
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  currentCompanyIndustry: Industry | undefined;
  handleTextInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CompanyInfoForm: React.FC<CompanyFormInfoProps> = ({
  formState,
  toastOpen,
  setToastOpen,
  industries,
  onIndustryChange,
  isSuccess,
  isError,
  isPending,
  currentCompanyIndustry,
  handleTextInputChange,
  handleSubmit,
}) => {
  const { formValues, formErrors } = formState;

  const selectedIndustry = formValues.industry;
  const industryValue = selectedIndustry
    ? industries.find((ind) => ind.id === selectedIndustry)
    : currentCompanyIndustry;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        maxWidth: 500,
        paddingTop: 4,
      }}
    >
      {/* Company Info Header */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          marginBottom: 1,
        }}
      >
        <TitleText component="h3" sx={{ fontSize: 22 }}>
          Company Information
        </TitleText>
        <ParagraphText sx={{ fontWeight: 600 }}>
          Provide accurate information about your company.
        </ParagraphText>
      </Box>

      {/* Company Name Input */}
      <TextInputGroup
        label="Company Name"
        type="text"
        fullWidth={true}
        margin="normal"
        name="businessName" // Make sure this is businessName, not companyName
        placeholder="Enter company name"
        value={formValues.businessName}
        onChange={handleTextInputChange} // Correct handling for text input
        error={Boolean(formErrors.businessName)}
        helperText={formErrors.businessName}
        disabled={isPending}
      />

      {/* Industry Autocomplete */}
      <Autocomplete
        options={industries ?? []} // Provide industry options
        getOptionLabel={(industry: Industry) => industry.name} // Display the industry name
        value={industryValue || null} // Handle selected industry
        onChange={onIndustryChange} // This handles selection change, specific for Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            label="Industry" // Set the label for the input
            variant="filled" // Set the variant
            fullWidth={true}
            margin="normal"
            name="industry"
            error={Boolean(formErrors.industry)}
            helperText={formErrors.industry}
          />
        )}
        disabled={isPending} // Disable if form is pending
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
          fullWidth={true}
          backgroundColor={colors.bridgeDarkPurple}
          text={<strong>{isPending ? "Saving..." : "Save Changes"}</strong>}
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
            ? "Company Information Updated Successfully"
            : isError
              ? "Failed to update company information."
              : "Updating..."
        }
      />
    </Box>
  );
};

export default CompanyInfoForm;
