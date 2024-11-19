import { Meta, StoryObj } from '@storybook/react';
import DocumentIcon from './DocumentIcon.component';

export default {
  title: 'components/atoms/images/DocumentIcon',
  component: DocumentIcon,
  argTypes: {
    fileName: {
      control: 'text',
      description: 'File name to determine the document icon',
      defaultValue: 'example.pdf',
    },
  },
} as Meta<typeof DocumentIcon>;

type Story = StoryObj<typeof DocumentIcon>;

export const Default: Story = {
  args: {
    fileName: 'example.pdf',
  },
};

export const CSV: Story = {
  args: {
    fileName: 'example.csv',
  },
};

export const DOCX: Story = {
  args: {
    fileName: 'example.docx',
  },
};

export const Unsupported: Story = {
  args: {
    fileName: 'example.unknown',
  },
};
