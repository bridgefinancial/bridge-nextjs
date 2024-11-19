import { Meta, StoryObj } from '@storybook/react';
import ConfirmationDialog from './ConfirmationDialog.component';

export default {
  title: 'components/molecules/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: StoryObj = {
  args: {
    open: true,
    onClose: () => alert('Dialog closed'),
    messageText: 'Are you sure you want to proceed?',
    onCancelButtonProps: {
      text: 'Cancel',
      onClick: () => alert('Cancel clicked'),
    },
    onConfirmButtonProps: {
      text: 'Confirm',
      onClick: () => alert('Confirm clicked'),
    },
    titleProps: {
      titleText: 'Confirmation',
    },
  },
};

export const Default = Template;
