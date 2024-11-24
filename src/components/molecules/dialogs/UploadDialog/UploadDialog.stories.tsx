import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, FormEvent } from 'react';
import UploadDialog from './UploadDialog.component';

const meta: Meta<typeof UploadDialog> = {
  title: 'components/molecules/UploadDialog',
  component: UploadDialog,
  parameters: {
    docs: {
      description: {
        component:
          'A dialog component designed for uploading and managing files with customizable behavior.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dialog is open.',
    },
    filesToProcess: {
      description: 'Files queued for upload.',
    },
    existingFiles: { description: 'Files already uploaded.' },
    dropzoneText: {
      control: 'text',
      description: 'Text displayed in the drop zone.',
    },
    supportedFormats: {
      description: 'Supported file formats for upload.',
    },
    completeText: {
      control: 'text',
      description: 'Text displayed when an upload is complete.',
    },
    cancelText: { control: 'text', description: 'Text for the cancel button.' },
    saveText: { control: 'text', description: 'Text for the save button.' },
    isSaving: {
      control: 'boolean',
      description: 'Indicates whether files are being uploaded.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback for closing the dialog.',
    },
    onFileChange: {
      action: 'fileChanged',
      description: 'Callback when files are selected.',
    },
    handleSave: { action: 'saved', description: 'Callback for saving files.' },
    onUploadClicked: {
      action: 'uploadClicked',
      description: 'Callback for opening the file selector.',
    },
    handleRemoveFile: {
      action: 'fileRemoved',
      description: 'Callback for removing a file.',
    },
    titleProps: {
      control: 'object',
      description: 'Custom properties for the dialog title.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UploadDialog>;

export const Default: Story = {
  args: {
    open: true,
    filesToProcess: [],
    existingFiles: [
      {
        id: 1,
        description: 'example1.pdf',
        company: 0,
        created_at: '',
        updated_at: '',
        file: '',
      },
    ],
    dropzoneText: 'Drag and drop your documents here',
    supportedFormats: ['pdf', 'docx', 'csv'],
    completeText: 'Upload Complete',
    cancelText: 'Cancel',
    saveText: 'Save',
    isSaving: false,
    titleProps: {
      titleText: 'Upload Files',
      titleStyles: { fontSize: 18, fontWeight: 600 },
    },
    onClose: () => console.log('Dialog closed'),
    onFileChange: (e: ChangeEvent<HTMLInputElement>) =>
      console.log('Files changed:', e.target.files),
    handleSave: (e: FormEvent<HTMLFormElement>) =>
      console.log('Files saved', e),
    onUploadClicked: () => console.log('Upload clicked'),
    handleRemoveFile: (index: number) =>
      console.log(`File removed at index: ${index}`),
  },
};
