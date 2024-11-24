// src/components/design-system/molecules/AvatarForm/AvatarForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import AvatarForm, { AvatarFormProps } from './AvatarForm.component';

export default {
  title: 'components/organisms/forms/AvatarForm',
  component: AvatarForm,
  parameters: {
    layout: 'centered',
  },
} as Meta<AvatarFormProps>;

const Template: StoryObj<AvatarFormProps> = {
  args: {
    avatarSourceImage: null,
    initialImage: null,
    toastState: {
      severity: 'success',
      open: true,
      message: 'This is a toast message.',
    },
    submittingAvatarChanges: false,
    removingAvatar: false,
    handlePhotoChange: () => alert('Photo changed'),
    handleAvatarSubmit: () => alert('Avatar submitted'),
    handleDeleteAvatar: () => alert('Avatar deleted'),
    handleHideToast: () => alert('Toast hidden'),
  },
};

export const Default = Template;
