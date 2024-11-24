import { Meta, StoryObj } from '@storybook/react';
import ParagraphText from './ParagraphText.component';

const meta: Meta<typeof ParagraphText> = {
  title: 'components/atoms/typography/ParagraphText',
  component: ParagraphText,
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    sx: { control: 'object' },
    fontWeight: {
      control: {
        type: 'select',
        options: ['200', '300', '400', '500', '600', '700', '800'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ParagraphText>;

export const Default: Story = {
  args: {
    children: 'This is a default paragraph.',
  },
};

export const CustomStyles: Story = {
  args: {
    children: 'This is a paragraph with custom styles.',
    sx: { color: 'blue', textAlign: 'center' },
    fontWeight: '600',
  },
};
