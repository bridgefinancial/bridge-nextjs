import { Meta, StoryObj } from '@storybook/react';
import LandingLayout from './LandingLayout.component';

const meta: Meta<typeof LandingLayout> = {
  title: 'components/templates/layouts/LandingLayout',
  component: LandingLayout,
  args: {
    pathForHome: '/',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof LandingLayout>;

// Default Story
export const Default: Story = {
  args: {
    children: <div>Welcome to the Landing Layout</div>,
  },
};

// Story with Overflow Content
export const OverflowContent: Story = {
  args: {
    children: (
      <div style={{ height: '200vh' }}>
        <p>Content that exceeds the screen height.</p>
        <p>Scroll down to see the full content.</p>
      </div>
    ),
  },
};

// Story in Mobile View
export const MobileView: Story = {
  args: {
    children: <div>Landing Layout in mobile view</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: 'smallDevicePortrait',
    },
  },
};

// Story with Centered Message
export const CenteredMessage: Story = {
  args: {
    children: (
      <div style={{ textAlign: 'center' }}>
        Centered content inside the Landing Layout
      </div>
    ),
  },
};
