// src/components/design-system/atoms/ContainedButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ContainedButton, {
  ContainedButtonProps,
} from './ContainedButton.component';

const meta: Meta<ContainedButtonProps> = {
  title: 'components/atoms/buttons/ContainedButton',
  component: ContainedButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ContainedButtonProps>;

export const Default: Story = {
  args: {
    text: 'Default Contained Button',
    onClick: () => console.log('Button clicked'),
  },
};

export const Loading: Story = {
  args: {
    text: 'Loading Button',
    isLoading: true,
  },
};

export const CustomColors: Story = {
  args: {
    text: 'Colored Button',
    textColor: '#ffffff',
    backgroundColor: '#3f51b5',
    sx: { padding: '8px 16px' },
  },
};

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true,
    backgroundColor: '#ff5722',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
    backgroundColor: '#999999',
  },
};

export const WithIcons: Story = {
  args: {
    text: 'Button with Icons',
    startIcon: <span>🌟</span>,
    endIcon: <span>➡️</span>,
    onClick: () => console.log('With Icons Clicked'),
  },
};

export const LinkButton: Story = {
  args: {
    text: 'Link Button',
    href: '/example',
    backgroundColor: '#4caf50',
    textColor: '#ffffff',
  },
};
