import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { colors } from '@/theme/theme';
import { CloudUpload } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { ChangeEvent, forwardRef, ReactNode } from 'react';

type UploadProps = {
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
};

const Upload = forwardRef(
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
    const acceptFormats = supportedFormats
      .map((format) => `.${format}`)
      .join(',');
    return (
      <Box className="space-y-2">
        {/* Hidden File Input */}
        <input
          type="file"
          multiple={true}
          accept={acceptFormats}
          style={{ display: 'none' }}
          ref={ref}
          onChange={onFileChange}
          {...inputProps}
        />

        {/* Clickable Upload Box */}
        <Box
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
          <Box className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            <CloudUpload color="primary" />
            <ParagraphText sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              {dropzoneText}
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

export default Upload;
