import { Meta, StoryObj } from '@storybook/react';
import MappedTabs from './MappedTabs.component';

const meta: Meta<typeof MappedTabs> = {
  title: 'components/molecules/tabs/MappedTabs',
  component: MappedTabs,
  argTypes: {
    tabs: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof MappedTabs>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Tab 1', content: <div>Content for Tab 1</div> },
      { label: 'Tab 2', content: <div>Content for Tab 2</div> },
      { label: 'Tab 3', content: <div>Content for Tab 3</div> },
    ],
  },
};
