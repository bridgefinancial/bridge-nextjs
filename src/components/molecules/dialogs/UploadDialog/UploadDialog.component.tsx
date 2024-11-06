import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import TextButton from '@/components/atoms/buttons/TextButton/TextButton.component';
import LoadingSpinner from '@/components/atoms/loaders/LoadingSpinner';
import { WithLoggingOptions } from '@/hoc/withLogging/withLogging.hoc';
import { colors } from '@/theme/theme';
import { CompanyFile } from '@/types/users.types';
import { CheckCircle } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, List } from '@mui/material';
import { File } from 'buffer';
import React, { ChangeEvent, FormEvent, forwardRef, useMemo } from 'react'; // Use ChangeEvent instead of SyntheticEvent
import { BaseTypographyProps } from '../../../../types/base-typography-props.interface';
import ListItemWithStatus from '../../lists/ListItemWithStatus';
import BaseDialog from '../BaseDialog';
import { BaseDialogProps } from '../BaseDialog/BaseDialog.component';
import Upload from './Upload';

export interface UploadDialogProps
  extends Partial<BaseDialogProps>,
    WithLoggingOptions {
  open: boolean;
  filesToProcess: File[];
  existingFiles?: CompanyFile[];
  onClose: () => void;
  submitting?: boolean;
  dropzoneText?: string;
  titleProps?: {
    titleText: string;
    titleStyles: BaseTypographyProps;
  };
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void; // Updated type here
  callback?: () => void;
  handleSave: (e: FormEvent<HTMLFormElement | any>) => Promise<void> | void;
  supportedFormats?: string[];
  completeText?: string;
  isSaving?: boolean;
  cancelText?: string;
  saveText?: string;
  ariaDescribedBy?: string;
  handleRemoveFile: (index: number) => void;
  onUploadClicked: () => void;
}

// Format file size for display
export const formatFileSize = (size: number) =>
  `${(size / 1024 / 1024).toFixed(2)} MB`;

const UploadDialog = forwardRef(
  (
    {
      open = false,
      onClose = () => {},
      dropzoneText = 'Drag and drop your documents here',
      supportedFormats = ['pdf', 'docx', 'csv'],
      completeText = 'Upload Complete',
      cancelText = 'Cancel',
      saveText = 'Save',
      existingFiles = [],
      handleSave,
      isSaving = false,
      handleRemoveFile,
      onFileChange,
      ariaDescribedBy,
      filesToProcess,
      titleProps = {
        titleText: 'Upload files',
        titleStyles: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
      onUploadClicked,
    }: UploadDialogProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    // Check if there are no files uploaded or all files are uploaded
    const noFilesReadyToUpload = useMemo(() => {
      return (
        filesToProcess.length === 0 ||
        filesToProcess.every((file) =>
          existingFiles.some((item) => item.description === file.name)
        )
      );
    }, [filesToProcess, existingFiles]);

    const dialogActions = useMemo(
      () =>
        noFilesReadyToUpload ? null : (
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={4}>
              <TextButton
                sx={{ width: '100%' }}
                text={cancelText}
                onClick={onClose}
                disabled={isSaving}
              />
            </Grid>
            <Grid item={true} xs={4} />
            <Grid item={true} xs={4}>
              <ContainedButton
                backgroundColor={colors.bridgeDarkPurple}
                sx={{ width: '100%', opacity: isSaving ? 0.5 : 1 }}
                text={saveText}
                onClick={(e) => handleSave(e)}
                type="submit"
                disabled={isSaving}
              />
            </Grid>
          </Grid>
        ),
      [
        isSaving,
        saveText,
        handleSave,
        cancelText,
        onClose,
        noFilesReadyToUpload,
      ]
    );

    return (
      <form id={`upload-${ariaDescribedBy}`}>
        <BaseDialog
          maxWidth={600}
          fullWidth={true}
          ariaDescribedBy={`upload-${ariaDescribedBy}`}
          titleProps={titleProps}
          open={open}
          onClose={onClose}
          actions={dialogActions}
        >
          <Upload
            supportedFormats={supportedFormats}
            onFileChange={onFileChange}
            onUploadClicked={onUploadClicked}
            handleRemoveFile={handleRemoveFile}
            dropzoneText={dropzoneText}
            ref={ref}
          >
            {/* List of Uploaded Files */}
            {filesToProcess.length > 0 && (
              <Box className="space-y-10">
                <List>
                  {filesToProcess.map((file, index) => {
                    const fileHasBeenUploaded = existingFiles.find(
                      (item) => item.description === file.name
                    );
                    const uploadText = 'Uploading...';
                    const readyToUpload = 'Ready to upload';
                    const status = fileHasBeenUploaded
                      ? completeText
                      : isSaving
                        ? uploadText
                        : readyToUpload;

                    return (
                      <ListItemWithStatus
                        key={index}
                        title={file.name}
                        status={status}
                        onAction={
                          status === completeText
                            ? () => {}
                            : status === uploadText
                              ? () => {}
                              : () => handleRemoveFile(index)
                        }
                        statusColor={
                          status === completeText
                            ? colors.bridgeDarkGreen
                            : status === uploadText
                              ? colors.bridgeDarkPurple
                              : colors.bridgeDarkBlue
                        }
                        actionIcon={
                          status === completeText ? (
                            <CheckCircle />
                          ) : status === uploadText ? (
                            <LoadingSpinner
                              spinnerProps={{
                                size: 15,
                              }}
                            />
                          ) : (
                            <CloseIcon />
                          )
                        }
                        subtitle={formatFileSize(file.size)}
                      />
                    );
                  })}
                </List>
              </Box>
            )}
          </Upload>
        </BaseDialog>
      </form>
    );
  }
);

export default UploadDialog;
