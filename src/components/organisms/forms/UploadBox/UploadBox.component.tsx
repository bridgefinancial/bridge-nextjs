import React, { ChangeEvent, forwardRef, ReactNode } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { colors } from '@/theme/theme';

export interface UploadProps {
  supportedFormats: string[];
  dropzoneText?: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  onUploadClicked: () => void;
  children?: ReactNode;
  inputProps?: Partial<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
}

const UploadBox = forwardRef(
  (
    {
      supportedFormats,
      onFileChange,
      dropzoneText = 'Drag and drop your documents here',
      onUploadClicked,
      children,
      inputProps,
    }: UploadProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const acceptFormats = supportedFormats.reduce((acc, format) => {
      const mimeType = format === 'pdf' ? 'application/pdf' :
                      format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                      format === 'jpg' ? 'image/jpeg' : '';
      if (mimeType) acc[mimeType] = [];
      return acc;
    }, {} as { [key: string]: string[] });

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: acceptFormats,
      onDrop: (acceptedFiles) => {
        const event = {
          target: {
            files: acceptedFiles,
          },
        } as unknown as ChangeEvent<HTMLInputElement>;
        onFileChange(event);
      },
    });

    return (
      <Box className="space-y-2">
        {/* Hidden File Input */}
        <input
          type="file"
          multiple={true}
          accept={supportedFormats.map((format) => {
            return format === 'pdf' ? 'application/pdf' :
                   format === 'docx' ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' :
                   format === 'jpg' ? 'image/jpeg' : '';
          }).join(',')}
          style={{ display: 'none' }}
          ref={ref}
          onChange={onFileChange}
          {...inputProps}
        />

        {/* Clickable Upload Box */}
        <Box
          {...getRootProps()}
          data-testid="upload-dropzone"
          component="label"
          className="flex flex-col items-center justify-center w-full"
          sx={{
            border: '2px dashed #ddd',
            borderRadius: '12px',
            padding: '16px',
            cursor: 'pointer',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
          }}
          onClick={onUploadClicked}
        >
          <input {...getInputProps()} />
          <Box className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            <CloudUpload color="primary" />
            <ParagraphText sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {isDragActive ? 'Drop the files here ...' : dropzoneText}
            </ParagraphText>
          </Box>
          <ParagraphText sx={{ color: colors.bridgeDarkPurple }}>
            Choose files
          </ParagraphText>
        </Box>

        <ParagraphText sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 13 }}>
          Supported formats: {supportedFormats.join(', ')}
        </ParagraphText>

        {children}
      </Box>
    );
  }
);

export default UploadBox;
