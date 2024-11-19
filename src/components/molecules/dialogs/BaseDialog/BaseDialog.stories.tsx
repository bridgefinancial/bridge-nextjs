// src/components/design-system/molecules/BaseDialog/BaseDialog.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import BaseDialog, { BaseDialogProps } from './BaseDialog.component';

export default {
  title: 'components/molecules/BaseDialog',
  component: BaseDialog,
  parameters: {
    layout: 'centered',
  },
} as Meta<BaseDialogProps>;

const Template: StoryObj<BaseDialogProps> = {
  args: {
    open: true,
    onClose: () => alert('Dialog closed'),
    titleProps: {
      titleText: 'Example Dialog Title',
      titleStyles: { fontWeight: 600 },
    },
    children: <p>This is the dialog content.</p>,
    actions: <button onClick={() => alert('Action clicked')}>Action</button>,
    ariaDescribedBy: 'example-dialog',
  },
};

export const Default = Template;
