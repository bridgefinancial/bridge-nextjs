// src/components/design-system/atoms/TextButton.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import TextButton, { TextButtonProps } from './TextButton.component';

const meta: Meta<TextButtonProps> = {
  title: 'components/atoms/buttons/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<TextButtonProps>;

export const Default: Story = {
  args: {
    text: 'Default Text Button',
    onClick: () => console.log('Button clicked'),
  },
};

export const Loading: Story = {
  args: {
    text: 'Loading Button',
    isLoading: true,
    disabled: false,
  },
};

export const CustomColors: Story = {
  args: {
    text: 'Colored Text Button',
    textColor: '#ffffff',
    backgroundColor: '#3f51b5',
    sx: { padding: '8px 16px' },
    onClick: () => console.log('Custom Colors Clicked'),
  },
};

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true,
    textColor: '#fff',
    backgroundColor: '#ff5722',
    onClick: () => console.log('Full Width Clicked'),
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
    textColor: '#999',
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
