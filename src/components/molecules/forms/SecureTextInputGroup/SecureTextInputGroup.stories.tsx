import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import SecureTextInputGroup, {
  SecureTextInputGroupProps,
} from './SecureTextInputGroup.component';

const meta: Meta<typeof SecureTextInputGroup> = {
  title: 'components/molecules/forms/SecureTextInputGroup',
  component: SecureTextInputGroup,
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    value: { control: 'text' },
    margin: {
      control: 'select',
      options: ['none', 'dense', 'normal'],
    },
    error: { control: 'boolean' },
    helperText: { control: 'text' },

    fullWidth: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'Password',
    name: 'password',
    value: '',
    margin: 'normal',
    fullWidth: true,
    helperText: '',
  },
};

export default meta;

type Story = StoryObj<SecureTextInputGroupProps>;

export const Default: Story = {
  args: {
    label: 'Password',
    helperText: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    helperText: 'Password must be at least 8 characters',
    error: true,
    value: '123',
  },
};

export const CustomIcons: Story = {
  args: {
    label: 'Password',
    helperText: 'Click the icon to toggle visibility',
    SecureTextOnIcon: VisibilityOff,
    SecureTextOffIcon: Visibility,
  },
};

export const CustomMargin: Story = {
  args: {
    label: 'Password',
    helperText: 'This input has custom margin',
    margin: 'dense',
  },
};

export const WithoutHelperText: Story = {
  args: {
    label: 'Password',
    helperText: '',
  },
};
