// src/components/design-system/atoms/GradientBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import GradientBox, {
  GradientBoxProps,
  GradientDirection,
} from './GradientBox.component';

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

export const GradientToLeft: Story = {
  args: {
    direction: GradientDirection.TO_LEFT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Left',
  },
};

export const GradientToRight: Story = {
  args: {
    direction: GradientDirection.TO_RIGHT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Right',
  },
};

export const GradientToTop: Story = {
  args: {
    direction: 'to top',
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Top',
  },
};

export const GradientToBottom: Story = {
  args: {
    direction: GradientDirection.TO_BOTTOM,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Bottom',
  },
};

export const GradientToTopLeft: Story = {
  args: {
    direction: GradientDirection.TO_TOP_LEFT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Top Left',
  },
};

export const GradientToTopRight: Story = {
  args: {
    direction: GradientDirection.TO_TOP_RIGHT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Top Right',
  },
};

export const GradientToBottomLeft: Story = {
  args: {
    direction: GradientDirection.TO_BOTTOM_LEFT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Bottom Left',
  },
};

export const GradientToBottomRight: Story = {
  args: {
    direction: GradientDirection.TO_BOTTOM_RIGHT,
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Bottom Right',
  },
};

export const BridgePurpleGradient: Story = {
  args: {
    direction: GradientDirection.TO_RIGHT,
    colors: ['#A395F7', '#6A5ACE'],
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Bottom Right',
  },
};

export const BridgeBlueGreen: Story = {
  args: {
    direction: GradientDirection.TO_BOTTOM,
    colors: ['#82C4F4', '#BCE762'],
    containerStyle: {
      padding: '20px',
      borderRadius: '8px',
      color: 'white',
    },
    children: 'Gradient to Bottom Right',
  },
};
