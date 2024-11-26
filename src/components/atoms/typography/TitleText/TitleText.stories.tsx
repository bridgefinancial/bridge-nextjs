import { Meta, StoryObj } from '@storybook/react';
import TitleText from './TitleText.component';

const meta: Meta<typeof TitleText> = {
  title: 'components/atoms/typography/TitleText',
  component: TitleText,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content for the title',
    },
    className: {
      control: 'text',
      description: 'Custom class for the component',
    },
    sx: {
      control: 'object',
      description: 'Custom styles using MUI sx prop',
    },
    fontWeight: {
      control: {
        type: 'select',
        options: ['200', '300', '400', '500', '600', '700', '800'],
      },
      description: 'Font weight of the title text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TitleText>;

export const Default: Story = {
  args: {
    children: 'This is a default title.',
  },
};

export const ExtraLightText: Story = {
  args: {
    children: 'This is an extra-light title.',
    fontWeight: '200',
  },
};

export const LightText: Story = {
  args: {
    children: 'This is a light-weight title.',
    fontWeight: '300',
  },
};

export const RegularText: Story = {
  args: {
    children: 'This is a regular-weight title.',
    fontWeight: '400',
  },
};

export const MediumText: Story = {
  args: {
    children: 'This is a medium-weight title.',
    fontWeight: '500',
  },
};

export const SemiBoldText: Story = {
  args: {
    children: 'This is a semi-bold title.',
    fontWeight: '600',
  },
};

export const BoldText: Story = {
  args: {
    children: 'This is a bold title.',
    fontWeight: '700',
  },
};

export const ExtraBoldText: Story = {
  args: {
    children: 'This is an extra-bold title.',
    fontWeight: '800',
  },
};
