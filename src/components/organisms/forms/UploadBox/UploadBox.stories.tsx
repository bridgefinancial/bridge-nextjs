import DocumentIcon from '@/components/atoms/images/DocumentIcon/DocumentIcon.component';
import LoadingSpinner from '@/components/atoms/loaders/LoadingSpinner';
import { colors } from '@/theme/theme';
import { CheckCircle, Close as CloseIcon } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import ListItemWithStatus from '../../lists/ListItemWithStatus';
import UploadBox from './UploadBox.component';

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

export const DragAndDropWithStatus: Story = {
  render: () => {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileStatuses, setFileStatuses] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const formatFileSize = (size: number) => `${(size / 1024).toFixed(2)} KB`;

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

    const handleUploadClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    return (
      <UploadBox
        supportedFormats={['pdf', 'docx', 'jpg', 'csv']}
        dropzoneText="Drag and drop your files here"
        onFileChange={handleFileChange}
        onUploadClicked={handleUploadClick}
        handleRemoveFile={handleRemoveFile}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />

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
