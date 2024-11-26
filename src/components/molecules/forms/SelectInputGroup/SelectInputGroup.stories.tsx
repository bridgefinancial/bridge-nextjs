import { Meta, StoryObj } from '@storybook/react';
import SelectInputGroup from './SelectInputGroup.component';

const meta: Meta<typeof SelectInputGroup> = {
  title: 'components/molecules/forms/SelectInputGroup',
  component: SelectInputGroup,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    margin: {
      control: { type: 'select', options: ['none', 'dense', 'normal'] },
    },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof SelectInputGroup>;

export const Default: Story = {
  args: {
    label: 'Select an option',
    value: '',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    helperText: 'Please select an option',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'This field is required',
  },
};
