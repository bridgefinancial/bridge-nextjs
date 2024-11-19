// src/components/molecules/ToastNotification/ToastNotification.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import ToastNotification, {
  ToastNotificationProps,
} from './ToastNotification.component';

export default {
  title: 'components/molecules/ToastNotification',
  component: ToastNotification,
  parameters: {
    layout: 'centered',
  },
} as Meta<ToastNotificationProps>;

const Template: StoryObj<ToastNotificationProps> = {
  args: {
    message: 'This is a success notification!',
    severity: 'success',
    open: true,
    setOpen: () => alert('Toast state toggled'),
    autoHideDuration: 5000,
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    onActionProps: {
      text: 'Undo',
      onClick: () => alert('Undo action clicked'),
    },
  },
};

export const Default = Template;

export const ErrorNotification: StoryObj<ToastNotificationProps> = {
  args: {
    ...Template.args,
    message: 'This is an error notification.',
    severity: 'error',
  },
};

export const InfoNotification: StoryObj<ToastNotificationProps> = {
  args: {
    ...Template.args,
    message: 'This is an informational notification.',
    severity: 'info',
  },
};

export const AutoHideDisabled: StoryObj<ToastNotificationProps> = {
  args: {
    ...Template.args,
    autoHideDisabled: true,
    message: 'This notification will stay open until manually closed.',
  },
};

export const CustomAnchorPosition: StoryObj<ToastNotificationProps> = {
  args: {
    ...Template.args,
    message: 'This notification is anchored at the top-left.',
    anchorOrigin: { vertical: 'top', horizontal: 'left' },
  },
};
