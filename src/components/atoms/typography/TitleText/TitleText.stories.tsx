import { Meta, StoryObj } from '@storybook/react';
import TitleText from './TitleText.component';

const meta: Meta<typeof TitleText> = {
  title: 'components/atoms/typography/TitleText',
  component: TitleText,
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
    sx: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof TitleText>;

export const Default: Story = {
  args: {
    children: 'This is a default title.',
  },
};

export const CustomStyles: Story = {
  args: {
    children: 'This is a title with custom styles.',
    sx: { color: 'red', textAlign: 'center' },
  },
};
