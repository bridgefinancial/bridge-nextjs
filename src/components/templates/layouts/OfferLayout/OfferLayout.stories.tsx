// src/components/design-system/molecules/AvatarForm/AvatarForm.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { OfferLayout, OfferLayoutProps } from './OfferLayout.component';

export default {
  title: 'components/templates/layouts/OfferLayout',
  component: OfferLayout,
  parameters: {
    layout: 'centered',
  },
} as Meta<OfferLayoutProps>;

const Template: StoryObj<OfferLayoutProps> = {
  args: {},
};

export const Default = Template;
