import React from "react";
import { Box } from "@mui/material";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";
import { colors } from "@/theme/theme";
import { PersonalInfoFormReturn } from "../../../../hooks/usePersonalInfoForm.hook";

/**
 * A form component for managing personal information like name, email, and phone number.
 *
 * @param formValues - An object containing the current values for the form fields.
 * @param formErrors - An object containing validation errors for each form field.
 * @param isPending - A boolean indicating whether the form submission is pending.
 * @param isSuccess - A boolean indicating if the form submission was successful.
 * @param isError - A boolean indicating if there was an error in form submission.
 * @param toastOpen - A boolean controlling the visibility of the toast notification.
 * @param onTextInputChange - A function to handle changes to input fields.
 * @param onSubmit - A function to handle the form submission event.
 * @param onToastClose - A function to close the toast notification.
 *
 * @returns A JSX element that renders a personal info form.
 *
 * @example
 * <PersonalInfoForm
 *   formValues={{ firstName: '', lastName: '', email: '', phoneNumber: '' }}
 *   formErrors={{ firstName: '', email: '' }}
 *   isPending={false}
 *   isSuccess={false}
 *   isError={false}
 *   toastOpen={true}
 *   onTextInputChange={handleChange}
 *   onSubmit={handleSubmit}
 *   onToastClose={handleClose}
 * />
 */
interface PersonalInfoFormProps extends PersonalInfoFormReturn {}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formState,
  isPending,
  isSuccess,
  isError,
  toastOpen,
  handleChange,
  setToastOpen,
  handleSubmit,
}) => {
  const { formValues, formErrors } = formState;
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
        <TitleText sx={{ fontSize: 20 }} component="h3">
          Personal Info
        </TitleText>
        <ParagraphText sx={{ fontWeight: 600 }}>
          Only name and image will be displayed publicly.
        </ParagraphText>
      </Box>

      {/* First Name Input */}
      <TextInputGroup
        label="First name"
        type="text"
        shrinkLabel={true}
        fullWidth={true}
        margin="normal"
        name="firstName"
        placeholder="Enter first name"
        value={formValues.firstName}
        onChange={handleChange}
        error={Boolean(formErrors.firstName)}
        helperText={formErrors.firstName}
        disabled={isPending}
      />

      {/* Last Name Input */}
      <TextInputGroup
        label="Last name"
        type="text"
        fullWidth={true}
        shrinkLabel={true}
        margin="normal"
        name="lastName"
        placeholder="Enter last name"
        value={formValues.lastName}
        onChange={handleChange}
        error={Boolean(formErrors.lastName)}
        helperText={formErrors.lastName}
        disabled={isPending}
      />

      {/* Email Input */}
      <TextInputGroup
        label="Email"
        type="email"
        shrinkLabel={true}
        fullWidth={true}
        margin="normal"
        name="email"
        placeholder="Enter email"
        value={formValues.email}
        onChange={handleChange}
        error={Boolean(formErrors.email)}
        helperText={formErrors.email}
        disabled={isPending}
      />

      {/* Phone Number Input */}
      <TextInputGroup
        label="Phone number"
        type="text"
        fullWidth={true}
        shrinkLabel={true}
        margin="normal"
        name="phoneNumber"
        placeholder="Enter phone number"
        value={formValues.phoneNumber}
        onChange={handleChange}
        error={Boolean(formErrors.phoneNumber)}
        helperText={formErrors.phoneNumber}
        disabled={isPending}
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
