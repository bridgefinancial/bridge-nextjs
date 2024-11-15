import { DefaultLogoProps } from '@/components/atoms/images/LogoImage/LogoImage.component';
import type { Meta, StoryObj } from '@storybook/react';
import MobileLayoutBar from './MobileLayoutBar.component';

const meta: Meta<typeof MobileLayoutBar> = {
  title: 'components/organisms/headers/LayoutBar/MobileLayoutBar',
  component: MobileLayoutBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    handleDrawerToggle: { action: 'drawer toggled' },
    logout: { action: 'logout clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoProps: DefaultLogoProps,
  },
};

export const CustomLogo: Story = {
  args: {
    logoProps: {
      src: '/custom-logo.png',
      alt: 'Custom Logo',
      width: 120,
      height: 30,
    },
  },
};
