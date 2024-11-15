// src/components/design-system/atoms/GradientBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GradientBox, { GradientBoxProps } from './GradientBox.component';

const meta: Meta<GradientBoxProps> = {
  title: 'components/atoms/containers/GradientBox',
  component: GradientBox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<GradientBoxProps>;

export const Default: Story = {
  args: {
    children: 'Default GradientBox',
  },
};

export const CustomColors: Story = {
  args: {
    colors: ['#ff5722', '#4caf50', '#2196f3'],
    direction: 'to bottom',
    children: 'Custom Colors Gradient',
  },
};

export const WithContainerStyle: Story = {
  args: {
    colors: ['#673ab7', '#e91e63'],
    direction: 'to left',
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Styled GradientBox',
  },
};
