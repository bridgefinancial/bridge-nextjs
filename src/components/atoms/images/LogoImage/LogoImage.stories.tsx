// src/components/design-system/atoms/LogoImage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import LogoImage, {
  DefaultLogoProps,
  LogoImageProps,
} from './LogoImage.component';

const meta: Meta<LogoImageProps> = {
  title: 'components/atoms/images/LogoImage',
  component: LogoImage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<LogoImageProps>;

export const Default: Story = {
  args: {
    src: DefaultLogoProps.src,
    alt: DefaultLogoProps.alt,
  },
};

export const CustomSize: Story = {
  args: {
    src: DefaultLogoProps.src,
    alt: DefaultLogoProps.alt,
    width: 180,
    height: 50,
  },
};

export const StyledContainer: Story = {
  args: {
    src: DefaultLogoProps.src,
    alt: DefaultLogoProps.alt,
    containerStyle: {
      padding: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      display: 'inline-block',
    },
  },
};

export const NoImageSource: Story = {
  args: {
    alt: 'Missing Logo',
    width: 120,
    height: 34.23,
  },
};

export const CustomAltText: Story = {
  args: {
    src: DefaultLogoProps.src,
    alt: 'Custom Logo Alt Text',
  },
};
