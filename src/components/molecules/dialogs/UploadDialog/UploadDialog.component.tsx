import React from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import BaseDialog from '../BaseDialog';
import { BaseDialogProps } from '../BaseDialog/BaseDialog.component';
import { BaseTypographyProps } from '../../../../types/base-typography-props.interface';

interface UploadDialogProps  extends Partial<BaseDialogProps>{
  open: boolean;
  onClose: () => void;
  onNewFilesProvided: (files: File[]) => void;
  uploadedFiles: File[];
  handleRemoveFileAtIndex: (index: number) => void;
  handleSave: () => void;
  submitting?: boolean;
  avatarIcon?: string;
  dropzoneText?: string;
  titleProps?: {
    titleText: string,
    titleStyles: BaseTypographyProps
  },
  supportedFormatsText?: string;
  completeText?: string;
  cancelText?: string;
  saveText?: string;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  open,
  onClose,
  onNewFilesProvided,
  uploadedFiles,
  handleRemoveFileAtIndex,
  handleSave,
  submitting = false,
  avatarIcon = '/assets/images/pdf-file-icon.png',
  dropzoneText = 'Drag and drop your document here',
  supportedFormatsText = 'Supported formats: PDF & XLSX',
  completeText = 'Complete',
  cancelText = 'Cancel',
  saveText = 'Save',
  titleProps = {
    titleText: "Upload files",
    titleStyles: {
      fontWeight: 600
    }
  }
}) => {
  const handleFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onNewFilesProvided(Array.from(event.target.files));
    }
  };

  const formatFileSize = (size: number) => {
    return `${(size / 1024 / 1024).toFixed(2)} MB`; // Formats size in MB
  };

  return (
    <BaseDialog
    titleProps={titleProps}
      open={open}
      onClose={onClose}
      actions={
        <Box className="w-full flex items-center justify-center gap-2">
          <Button variant="contained" className="w-full" onClick={onClose} disabled={submitting}>
            {cancelText}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="w-full"
            onClick={handleSave}
            disabled={submitting}
          >
            {saveText}
          </Button>
        </Box>
      }
    >
      <Box className="space-y-2">
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
        >
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileDrop}
          />
          <Box className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            <CloudUploadIcon color="primary" />
            <Typography>{dropzoneText}</Typography>
          </Box>
          <Typography className="text-bridge-dark-purple text-center cursor-pointer">
            Choose files
          </Typography>
        </Box>
        <Typography color="textSecondary">{supportedFormatsText}</Typography>
        {uploadedFiles.length > 0 && (
          <Box className="space-y-10">
            <List>
              {uploadedFiles.map((file, index) => (
                <ListItem
                  key={index}
                  sx={{
                    border: '1px solid',
                    borderColor: 'bridge-black',
                    borderRadius: '12px',
                    padding: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <Box className="flex items-center justify-start gap-2">
                    <Avatar
                      src={avatarIcon}
                      alt="File Icon"
                      sx={{ width: 24, height: 24 }}
                    />
                    <Box>
                      <Typography variant="body1">{file.name}</Typography>
                      <Box className="flex items-center justify-start gap-4">
                        <Typography variant="body2" color="textSecondary">
                          {formatFileSize(file.size)}
                        </Typography>
                        <Typography variant="body2" color="green">
                          {completeText}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemoveFileAtIndex(index)}>
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </BaseDialog>
  );
};

export default UploadDialog;
