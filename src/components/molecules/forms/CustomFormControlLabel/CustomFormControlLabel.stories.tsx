import { Meta, StoryObj } from '@storybook/react';
import CustomFormControlLabel from './CustomFormControlLabel.component';
const meta: Meta<typeof CustomFormControlLabel> = {
  title: 'components/molecules/forms/CustomFormControlLabel',
  component: CustomFormControlLabel,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof CustomFormControlLabel>;

export const Default: Story = {
  args: {
    label: 'Agree to terms',
    checked: false,
    value: 'agree',
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};
