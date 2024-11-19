import { Meta, StoryObj } from '@storybook/react';
import SubTitleText from './SubTitleText.component';

const meta: Meta<typeof SubTitleText> = {
  title: 'components/atoms/typography/SubTitleText',

  component: SubTitleText,
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

type Story = StoryObj<typeof SubTitleText>;

export const Default: Story = {
  args: {
    children: 'This is a default subtitle.',
  },
};

export const CustomStyles: Story = {
  args: {
    children: 'This is a subtitle with custom styles.',
    sx: { color: 'green', textAlign: 'right' },
    fontWeight: '700',
  },
};
