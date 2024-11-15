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
    src: '/path/to/default-image.jpg',
    alt: 'Default Background',
    children: (
      <div style={{ color: 'white', fontSize: '20px' }}>Centered Content</div>
    ),
  },
};

export const CustomFit: Story = {
  args: {
    src: '/path/to/custom-fit-image.jpg',
    alt: 'Custom Fit Background',
    objectFit: 'contain',
    children: (
      <div style={{ color: 'white', fontSize: '20px' }}>
        Contain Fit Content
      </div>
    ),
  },
};

export const StyledContainer: Story = {
  args: {
    src: '/path/to/styled-image.jpg',
    alt: 'Styled Background',
    containerStyle: {
      borderRadius: '15px',
      overflow: 'hidden',
      width: '400px',
      height: '300px',
    },
    innerContainerStyle: { padding: '20px', color: 'white', fontSize: '18px' },
    children: <div>Styled Container Content</div>,
  },
};
