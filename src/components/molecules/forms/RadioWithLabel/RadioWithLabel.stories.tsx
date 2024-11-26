import { Meta, StoryObj } from '@storybook/react';
import RadioWithLabel from './RadioWithLabel.component';

const meta: Meta<typeof RadioWithLabel> = {
  title: 'components/molecules/forms/RadioWithLabel',
  component: RadioWithLabel,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof RadioWithLabel>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    ...Default.args,
    checked: true,
  },
};
