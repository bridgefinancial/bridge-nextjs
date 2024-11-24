import { Meta, StoryObj } from '@storybook/react';
import ParagraphText from './ParagraphText.component';

const meta: Meta<typeof ParagraphText> = {
  title: 'components/atoms/typography/ParagraphText',
  component: ParagraphText,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content for the paragraph',
    },
    className: {
      control: 'text',
      description: 'Custom class for the component',
    },
    sx: { control: 'object', description: 'Custom styles using MUI sx prop' },
    fontWeight: {
      control: {
        type: 'select',
        options: ['200', '300', '400', '500', '600', '700', '800'],
      },
      description: 'Font weight of the paragraph text',
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

export const ExtraLightText: Story = {
  args: {
    children: 'This is extra-light text.',
    fontWeight: '200',
  },
};

export const LightText: Story = {
  args: {
    children: 'This is light-weight text.',
    fontWeight: '300',
  },
};

export const RegularText: Story = {
  args: {
    children: 'This is regular-weight text.',
    fontWeight: '400',
  },
};

export const MediumText: Story = {
  args: {
    children: 'This is medium-weight text.',
    fontWeight: '500',
  },
};

export const SemiBoldText: Story = {
  args: {
    children: 'This is semi-bold text.',
    fontWeight: '600',
  },
};

export const BoldText: Story = {
  args: {
    children: 'This is bold text.',
    fontWeight: '700',
  },
};

export const ExtraBoldText: Story = {
  args: {
    children: 'This is extra-bold text.',
    fontWeight: '800',
  },
};
