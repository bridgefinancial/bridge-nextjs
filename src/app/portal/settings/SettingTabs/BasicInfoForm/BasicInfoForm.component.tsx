import React from "react";
import { useCompanyForm } from "@/hooks/useCompanyForm.hook";
import CompanyInfoForm from "@/components/organisms/forms/CompanyInfoForm/";
import { usePersonalInfoForm } from "@/hooks/usePersonalInfoForm.hook";
import PersonalInfoForm from "@/components/organisms/forms/PersonalInfoForm/PersonalInfoForm.component";

const BasicInfoForm: React.FC = () => {
  // const companyFormData = useCompanyForm();
  const personalFormData = usePersonalInfoForm();
  // const avatarFormData = useAvatarForm();
  const companyFormData = useCompanyForm();
  return (
    <>
      {/* Avatar Form */}
      {/* <AvatarForm
        avatarSourceImage={avatarFormData.avatarSourceImage}
        initialImage={avatarFormData.initialImage}
        toastState={avatarFormData.toastState}
        submittingAvatarChanges={avatarFormData.submittingAvatarChanges}
        removingAvatar={avatarFormData.removingAvatar}
        handlePhotoChange={avatarFormData.handlePhotoChange}
        handleAvatarSubmit={avatarFormData.handleAvatarSubmit}
        handleDeleteAvatar={avatarFormData.handleDeleteAvatar}
        handleHideToast={avatarFormData.handleHideToast}
      /> */}

      <PersonalInfoForm
        formState={personalFormData.formState}
        toastOpen={personalFormData.toastOpen}
        setToastOpen={personalFormData.setToastOpen}
        isLoadingUserSession={personalFormData.isLoadingUserSession}
        handleSubmit={personalFormData.handleSubmit}
        handleChange={personalFormData.handleChange}
        isError={personalFormData.isError}
        isSuccess={personalFormData.isSuccess}
        isPending={personalFormData.isPending}
      />
      <CompanyInfoForm {...companyFormData} />
      {/* <Box sx={{ mt: 4 }}>
        <Typography
          variant="body1"
          sx={{ color: "primary.main", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => {
            // Handle edit survey responses logic here
            console.log("Edit survey responses clicked");
          }}
        >
          Edit survey responses
        </Typography>
      </Box> */}
    </>
  );
};

export default BasicInfoForm;
