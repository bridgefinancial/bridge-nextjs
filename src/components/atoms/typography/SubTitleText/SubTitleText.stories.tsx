import { Meta, StoryObj } from '@storybook/react';
import SubTitleText from './SubTitleText.component';

const meta: Meta<typeof SubTitleText> = {
  title: 'components/atoms/typography/SubTitleText',
  component: SubTitleText,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content for the subtitle',
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
      description: 'Font weight of the subtitle text',
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

export const ExtraLightText: Story = {
  args: {
    children: 'This is an extra-light subtitle.',
    fontWeight: '200',
  },
};

export const LightText: Story = {
  args: {
    children: 'This is a light-weight subtitle.',
    fontWeight: '300',
  },
};

export const RegularText: Story = {
  args: {
    children: 'This is a regular-weight subtitle.',
    fontWeight: '400',
  },
};

export const MediumText: Story = {
  args: {
    children: 'This is a medium-weight subtitle.',
    fontWeight: '500',
  },
};

export const SemiBoldText: Story = {
  args: {
    children: 'This is a semi-bold subtitle.',
    fontWeight: '600',
  },
};

export const BoldText: Story = {
  args: {
    children: 'This is a bold subtitle.',
    fontWeight: '700',
  },
};

export const ExtraBoldText: Story = {
  args: {
    children: 'This is an extra-bold subtitle.',
    fontWeight: '800',
  },
};
