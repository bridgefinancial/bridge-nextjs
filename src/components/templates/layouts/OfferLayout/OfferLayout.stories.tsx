// src/components/design-system/molecules/AvatarForm/AvatarForm.stories.tsx
import { TestimonialItemProps } from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import { Meta, StoryObj } from '@storybook/react';
import { OfferLayout, OfferLayoutProps } from './OfferLayout.component';
const testimonials: TestimonialItemProps[] = [
  {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
    author: 'Rebecca H.',
    role: 'Retail Business Owner',
  },
  {
    quote:
      'The Business Health Check gave us clear insights into what we were doing right and where we could improve. Bridge helped us create a roadmap for real growth.',
    author: 'Linda M.',
    role: 'Tech Startup Founder',
  },
];
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
