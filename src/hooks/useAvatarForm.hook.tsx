import { useReducer, useState } from "react";
import {
  useChangeUserAvatar,
  useRemoveUserAvatar,
  useSessionUser,
} from "@/services/users.service";
import {
  initialToastState,
  toastReducer,
  ToastState,
} from "@/reducers/toast.reducer";

// Toast tate is missing

interface UseAvatarFormReturn {
  avatarSourceImage: any;
  initialImage: any;
  toastState: ToastState;
  submittingAvatarChanges: boolean;
  removingAvatar: boolean;
  handlePhotoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAvatarSubmit: () => void;
  handleDeleteAvatar: () => void;
  handleHideToast: () => void;
}
// toast reducer is missing
export const useAvatarForm = (): UseAvatarFormReturn => {
  const { data: userData } = useSessionUser();
  const userId = userData?.id;

  const { mutate: submitChangeAvatar, isPending: isSubmittingChangeAvatar } =
    useChangeUserAvatar();
  const {
    mutate: submitRemoveUserAvatar,
    isPending: isSubmittingRemoveUserAvatar,
  } = useRemoveUserAvatar();

  const [avatarSourceImage, setAvatarSourceImage] = useState<any>(null);
  const [initialImage, setInitialImage] = useState<any>(null);

  const [toastState, dispatchToast] = useReducer(
    toastReducer,
    initialToastState,
  );

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSourceImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSubmit = () => {
    console.log(userId, "this is userId to submit");
    console.log(avatarSourceImage, "this is user source image to submit");
    if (!avatarSourceImage || !userId) return;

    submitChangeAvatar({ image: avatarSourceImage, userId } as any, {
      onSuccess: () => {
        dispatchToast({
          type: "SHOW_SUCCESS",
          message: "Avatar updated successfully!",
        });
      },
      onError: () => {
        dispatchToast({
          type: "SHOW_ERROR",
          message: "Failed to update avatar.",
        });
      },
    });
  };

  const handleDeleteAvatar = () => {
    if (!userId) return;

    submitRemoveUserAvatar({ userId } as any, {
      onSuccess: () => {
        setAvatarSourceImage(null);
        setInitialImage(null);
        dispatchToast({
          type: "SHOW_SUCCESS",
          message: "Avatar deleted successfully!",
        });
      },
      onError: () => {
        dispatchToast({
          type: "SHOW_ERROR",
          message: "Failed to delete avatar.",
        });
      },
    });
  };

  const handleHideToast = () => {
    dispatchToast({ type: "HIDE_TOAST" });
  };

  return {
    avatarSourceImage,
    initialImage,
    toastState,
    submittingAvatarChanges: isSubmittingChangeAvatar,
    removingAvatar: isSubmittingRemoveUserAvatar,
    handlePhotoChange,
    handleAvatarSubmit,
    handleDeleteAvatar,
    handleHideToast,
  };
};
