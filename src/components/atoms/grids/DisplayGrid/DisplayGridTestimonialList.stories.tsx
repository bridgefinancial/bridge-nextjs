// src/components/design-system/molecules/DisplayGrid.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import DisplayGrid, { DisplayGridProps } from './DisplayGrid.component';

import TestimonialItem, {
  TestimonialItemProps,
} from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';

const meta: Meta<DisplayGridProps<TestimonialItemProps>> = {
  title: 'components/atoms/grids/DisplayGrid/TestimonialList',
  component: DisplayGrid,
  argTypes: {
    data: { control: { disable: true } },
    renderItem: { control: { disable: true } },
    config: { control: { type: 'object' } },
    spacing: { control: { type: 'number' } },
    containerStyle: { control: { type: 'object' } },
    itemStyle: { control: { type: 'object' } },
    keyExtractor: { control: { disable: true } },
  },
};

const sampleTestimonialListData: TestimonialItemProps[] = [
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

export default meta;

type Story = StoryObj<DisplayGridProps<TestimonialItemProps>>;

export const Default: Story = {
  args: {
    itemStyle: {
      width: '100%',
    },
    config: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6 },
    data: sampleTestimonialListData,
    renderItem: (item) => <TestimonialItem {...item} />,
    containerStyle: {
      maxWidth: 1080,
    },
  },
};
