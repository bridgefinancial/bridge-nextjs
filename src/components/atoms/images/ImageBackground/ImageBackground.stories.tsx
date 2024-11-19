// src/components/design-system/atoms/ImageBackground.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ImageBackground, {
  ImageBackgroundProps,
} from './ImageBackground.component';

const meta: Meta<ImageBackgroundProps> = {
  title: 'components/atoms/images/ImageBackground',
  component: ImageBackground,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ImageBackgroundProps>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/600x400', // Placeholder image
    alt: 'Default Background',
    children: <div style={{ width: 100, height: 100 }}></div>,
  },
};

export const CustomFit: Story = {
  args: {
    src: 'https://via.placeholder.com/800x600', // Placeholder image
    alt: 'Custom Fit Background',
    objectFit: 'contain',
    children: <div style={{ width: 100, height: 100 }}></div>,
  },
};

export const StyledContainer: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300', // Placeholder image
    alt: 'Styled Background',
    containerStyle: {
      borderRadius: '15px',
      overflow: 'hidden',
      width: '400px',
      height: '300px',
    },
    children: <div style={{ width: 100, height: 100 }}></div>,

    innerContainerStyle: { padding: '20px', color: 'white', fontSize: '18px' },
  },
};
