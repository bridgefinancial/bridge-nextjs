import { Meta, StoryObj } from '@storybook/react';
import TestimonialItem from './TestimonialItem.component';

const meta: Meta<typeof TestimonialItem> = {
  title: 'components/molecules/display-data/TestimonialItem',
  component: TestimonialItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TestimonialItem>;

export const Default: Story = {
  args: {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
  },
};

export const CustomStyles: Story = {
  args: {
    quote: 'This testimonial has customized styles.',
    author: 'Jane Smith',
    role: 'Product Manager',
  },
};

export const WithoutRole: Story = {
  args: {
    quote: 'This testimonial has no role information.',
    author: 'Anonymous',
  },
};

export const WithAuthorAndRole: Story = {
  args: {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
    author: 'John Doe',
    role: 'Software Engineer',
  },
};
