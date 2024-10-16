/* eslint-disable @next/next/no-img-element */

import React, { useMemo } from "react";
import { Avatar, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { colors } from "@/theme/theme";
import PersonIcon from "@mui/icons-material/Person";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";
import { ToastState } from "@/reducers/toast.reducer";

/**
 * A form component for managing the user's avatar.
 * Allows uploading, updating, and deleting the avatar, with toast notifications for feedback.
 *
 * @returns A JSX element that renders the avatar form with buttons to upload, save, and delete the avatar.
 */

export interface AvatarFormProps {
  avatarSourceImage: string | ArrayBuffer | null;
  initialImage: string | null;
  toastState: ToastState;
  submittingAvatarChanges: boolean;
  removingAvatar: boolean;
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarSubmit: () => void;
  handleDeleteAvatar: () => void;
  handleHideToast: () => void;
}

const AvatarForm: React.FC<AvatarFormProps> = (props: AvatarFormProps) => {
  const {
    avatarSourceImage,
    initialImage,
    toastState,
    submittingAvatarChanges,
    removingAvatar,
    handlePhotoChange,
    handleAvatarSubmit,
    handleDeleteAvatar,
    handleHideToast,
  } = props;

  console.log(props, "this is props");

  const buttonTextToDisplay = useMemo(
    () =>
      submittingAvatarChanges
        ? "Saving..."
        : avatarSourceImage && avatarSourceImage !== initialImage
          ? "Save Image"
          : "Add Image",
    [avatarSourceImage, initialImage, submittingAvatarChanges],
  );
  const buttonAction = useMemo(
    () =>
      submittingAvatarChanges
        ? () => console.log("saving")
        : avatarSourceImage !== initialImage
          ? () => handleAvatarSubmit()
          : () => document.getElementById("avatar-input")?.click(),
    [
      avatarSourceImage,
      handleAvatarSubmit,
      initialImage,
      submittingAvatarChanges,
    ],
  );
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar
          alt="Avatar"
          sx={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            objectFit: "contain",
            backgroundColor: "#f9fafb",
          }}
        >
          {avatarSourceImage ? (
            <img
              src={avatarSourceImage as string}
              alt="User avatar"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <PersonIcon sx={{ color: "#212121" }} fontSize="medium" />
          )}
        </Avatar>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ContainedButton
            text={<strong>{buttonTextToDisplay}</strong>}
            backgroundColor={colors.bridgeDarkPurple}
            onClick={buttonAction}
            disabled={submittingAvatarChanges}
          />

          <TextButton
            startIcon={<DeleteIcon />}
            text={<strong>Delete</strong>}
            onClick={handleDeleteAvatar}
            disabled={removingAvatar}
          />
          <input
            type="file"
            id="avatar-input"
            hidden={true}
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </Box>
      </Box>

      <ToastNotification
        severity={toastState.severity}
        autoHideDisabled={true}
        open={toastState.open}
        setOpen={() => handleHideToast()}
        message={toastState.message}
      />
    </>
  );
};

export default AvatarForm;
