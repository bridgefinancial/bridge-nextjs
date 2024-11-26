import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent } from 'react';
import UploadBox from './UploadBox.component';

const meta: Meta<typeof UploadBox> = {
  title: 'components/organisms/forms/UploadBox',
  component: UploadBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A reusable upload box component for handling file uploads with drag-and-drop functionality.',
      },
    },
  },
  argTypes: {
    supportedFormats: {
      description: 'List of file formats supported by the uploader.',
    },
    dropzoneText: {
      control: 'text',
      description: 'Text displayed inside the drop zone.',
    },
    onFileChange: {
      action: 'fileChanged',
      description: 'Callback for handling file input changes.',
    },
    onUploadClicked: {
      action: 'uploadClicked',
      description: 'Callback triggered when the upload box is clicked.',
    },
    handleRemoveFile: {
      action: 'fileRemoved',
      description: 'Callback for removing a file.',
    },
    children: {
      control: false,
      description:
        'Additional React elements to be rendered inside the component.',
    },
    inputProps: {
      control: 'object',
      description: 'Additional props for the input element.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadBox>;

export const Default: Story = {
  args: {
    supportedFormats: ['pdf', 'docx', 'jpg'],
    dropzoneText: 'Drag and drop your documents here',
    onFileChange: (event: ChangeEvent<HTMLInputElement>) =>
      console.log('Files changed:', event.target.files),
    onUploadClicked: () => console.log('Upload clicked'),
    handleRemoveFile: (index: number) =>
      console.log(`File removed at index: ${index}`),
  },
};

export const WithChildren: Story = {
  args: {
    ...Default.args,
    children: <div>Additional content here</div>,
  },
};
