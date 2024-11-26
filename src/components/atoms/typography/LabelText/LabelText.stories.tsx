import { Meta, StoryObj } from '@storybook/react';
import LabelText from './LabelText.component';

const meta: Meta<typeof LabelText> = {
  title: 'components/atoms/typography/LabelText',
  component: LabelText,
  argTypes: {
    htmlFor: { control: 'text' },
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof LabelText>;

export const Default: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Label Text',
  },
};

export const WithCustomClass: Story = {
  args: {
    htmlFor: 'input-id',
    children: 'Label with custom class',
    className: 'custom-label-class',
  },
};
