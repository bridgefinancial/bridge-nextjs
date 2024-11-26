// src/components/design-system/molecules/CardWithTitle/CardWithTitle.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import type { CardWithTitleProps } from './CardWithTitle.component';
import CardWithTitle from './CardWithTitle.component';
export default {
  title: 'components/molecules/cards/CardWithTitle',
  component: CardWithTitle,
  parameters: {
    layout: 'centered',
  },
} as Meta<CardWithTitleProps>;

const Template: StoryObj<CardWithTitleProps> = {
  args: {
    titleProps: {
      text: 'Example Title',
      variant: 'h4',
      sx: { fontWeight: 600 },
    },
    children: <p>Example content inside the card.</p>,
    containerStyle: { backgroundColor: '#f9fafb', padding: '20px' },
  },
};

export const Default = Template;
