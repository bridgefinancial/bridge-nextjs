import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import UploadBox from './UploadBox.component';
import ListItemWithStatus from '../../lists/ListItemWithStatus';
import { CheckCircle, Close as CloseIcon } from '@mui/icons-material';
import LoadingSpinner from '@/components/atoms/loaders/LoadingSpinner';
import DocumentIcon from '@/components/atoms/images/DocumentIcon/DocumentIcon.component';
import { colors } from '@/theme/theme';

const meta: Meta<typeof UploadBox> = {
  title: 'components/organisms/forms/UploadBox',
  component: UploadBox,
  parameters: {
    docs: {
      description: {
        component:
          'A reusable upload box component for handling file uploads with drag-and-drop functionality and file removal.',
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
  },
};

export default meta;

type Story = StoryObj<typeof UploadBox>;

const formatFileSize = (size: number) => `${(size / 1024).toFixed(2)} KB`;

export const DragAndDropWithStatus: Story = {
  render: () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileStatuses, setFileStatuses] = useState<string[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
        setFileStatuses((prevStatuses) => [
          ...prevStatuses,
          ...files.map(() => 'readyToUpload'),
        ]);
      }
    };

    const handleRemoveFile = (index: number) => {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
      setFileStatuses((prevStatuses) =>
        prevStatuses.filter((_, i) => i !== index)
      );
    };

    return (
      <UploadBox
        supportedFormats={['pdf', 'docx', 'jpg']}
        dropzoneText="Drag and drop your files here"
        onFileChange={handleFileChange}
        onUploadClicked={() => console.log('Upload clicked')}
        handleRemoveFile={handleRemoveFile}
      >
        <div>
          <h3>Uploaded Files:</h3>
          <ul>
            {uploadedFiles.map((file, index) => {
              const status = fileStatuses[index];
              const statusColor =
                status === 'complete'
                  ? colors.bridgeDarkGreen
                  : status === 'uploading'
                  ? colors.bridgeDarkPurple
                  : colors.bridgeDarkBlue;

              return (
                <ListItemWithStatus
                  key={file.name}
                  title={file.name}
                  status={
                    status === 'complete'
                      ? 'Uploaded'
                      : status === 'uploading'
                      ? 'Uploading...'
                      : 'Ready to upload'
                  }
                  onAction={() => handleRemoveFile(index)}
                  statusColor={statusColor}
                  actionIcon={
                    status === 'complete' ? (
                      <CheckCircle />
                    ) : status === 'uploading' ? (
                      <LoadingSpinner spinnerProps={{ size: 15 }} />
                    ) : (
                      <CloseIcon />
                    )
                  }
                  iconSrc={<DocumentIcon fileName={file.name} />}
                  subtitle={formatFileSize(file.size)}
                />
              );
            })}
          </ul>
        </div>
      </UploadBox>
    );
  },
};

export const WithFileRemoval: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    };

    const handleRemoveFile = (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
      <UploadBox
        supportedFormats={['pdf', 'docx', 'jpg']}
        dropzoneText="Drag and drop files to upload and manage them"
        onFileChange={handleFileChange}
        onUploadClicked={() => console.log('Upload clicked')}
        handleRemoveFile={handleRemoveFile}
      >
        <div>
          <h3>File List:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({formatFileSize(file.size)}){' '}
                <button onClick={() => handleRemoveFile(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </UploadBox>
    );
  },
};