import { FilledTextFieldProps } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import TextInputGroup from './TextInputGroup.component';

const meta: Meta<typeof TextInputGroup> = {
  title: 'components/molecules/forms/TextInputGroup',
  component: TextInputGroup,
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    margin: {
      control: 'select',
      options: ['none', 'dense', 'normal'],
    },
    error: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    helperText: { control: 'text' },
    shrinkLabel: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: {
    fullWidth: true,
    margin: 'none',
  },
};

export default meta;

type Story = StoryObj<FilledTextFieldProps & { shrinkLabel?: boolean }>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    name: 'default',
    value: '',
    helperText: 'This is a default text input',
  },
};

export const WithError: Story = {
  args: {
    label: 'Error Input',
    name: 'errorInput',
    value: 'Invalid value',
    error: true,
    helperText: 'This is an error message',
  },
};

export const WithCustomColors: Story = {
  args: {
    label: 'Custom Colors Input',
    name: 'customColors',
    value: '',
    helperText: 'Hover or focus to see custom colors',
  },
};

export const WithShrinkLabel: Story = {
  args: {
    label: 'Shrink Label Input',
    name: 'shrinkLabel',
    value: 'Pre-filled value',
    helperText: 'The label stays shrunk due to shrinkLabel=true',
    shrinkLabel: true,
  },
};

export const WithoutHelperText: Story = {
  args: {
    label: 'No Helper Text',
    name: 'noHelperText',
    value: '',
  },
};

export const WithCustomMargin: Story = {
  args: {
    label: 'Custom Margin Input',
    name: 'customMargin',
    value: '',
    margin: 'normal', // Options: 'none', 'dense', 'normal'
    helperText: 'This input has custom margin',
  },
};
