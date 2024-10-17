import { DocumentFileItem } from "@/app/portal/documents/DocumentList/DocumentList.component";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";
import LoadingSpinner from "@/components/atoms/loaders/LoadingSpinner";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import withLogging, {
  WithLoggingOptions,
} from "@/hoc/withLogging/withLogging.hoc";
import { colors } from "@/theme/theme";
import { CheckCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Grid, List } from "@mui/material";
import { File } from "buffer";
import React, { ChangeEvent, FormEvent, useMemo, useRef } from "react"; // Use ChangeEvent instead of SyntheticEvent
import { BaseTypographyProps } from "../../../../types/base-typography-props.interface";
import ListItemWithStatus from "../../lists/ListItemWithStatus";
import BaseDialog from "../BaseDialog";
import { BaseDialogProps } from "../BaseDialog/BaseDialog.component";

export interface UploadDialogProps
  extends Partial<BaseDialogProps>,
    WithLoggingOptions {
  open: boolean;
  filesToProcess: File[];
  existingFiles?: DocumentFileItem[];
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
}

const UploadDialog: React.FC<UploadDialogProps> = withLogging(
  ({
    open = false,
    onClose = () => {},
    dropzoneText = "Drag and drop your documents here",
    supportedFormats = ["pdf", "docx", "csv"],
    completeText = "Upload Complete",
    cancelText = "Cancel",
    saveText = "Save",
    existingFiles = [],
    handleSave,
    isSaving = false,
    handleRemoveFile,
    onFileChange,
    ariaDescribedBy,
    filesToProcess,
    titleProps = {
      titleText: "Upload files",
      titleStyles: {
        fontSize: 18,
        fontWeight: 600,
      },
    },
  }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Generate the accept attribute based on supported formats
    const acceptFormats = supportedFormats
      .map((format) => `.${format}`)
      .join(",");

    // Format file size for display
    const formatFileSize = (size: number) =>
      `${(size / 1024 / 1024).toFixed(2)} MB`;

    // Check if there are no files uploaded or all files are uploaded
    const noFilesReadyToUpload = useMemo(() => {
      return (
        filesToProcess.length === 0 ||
        filesToProcess.every((file) =>
          existingFiles.some((item) => item.description === file.name),
        )
      );
    }, [filesToProcess, existingFiles]);

    const dialogActions = useMemo(
      () =>
        noFilesReadyToUpload ? null : (
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={4}>
              <TextButton
                sx={{ width: "100%" }}
                text={cancelText}
                onClick={onClose}
                disabled={isSaving}
              />
            </Grid>
            <Grid item={true} xs={4} />
            <Grid item={true} xs={4}>
              <ContainedButton
                backgroundColor={colors.bridgeDarkPurple}
                sx={{ width: "100%", opacity: isSaving ? 0.5 : 1 }}
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
      ],
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
          <Box className="space-y-2">
            {/* Hidden File Input */}
            <input
              type="file"
              multiple={true}
              accept={acceptFormats}
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileChange}
            />

            {/* Clickable Upload Box */}
            <Box
              component="label"
              className="flex flex-col items-center justify-center w-full"
              sx={{
                border: "2px dashed #ddd",
                borderRadius: "12px",
                padding: "16px",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Box className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
                <CloudUploadIcon color="primary" />
                <ParagraphText sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
                  {dropzoneText}
                </ParagraphText>
              </Box>
              <ParagraphText sx={{ color: colors.bridgeDarkPurple }}>
                Choose files
              </ParagraphText>
            </Box>

            <ParagraphText sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: 13 }}>
              Supported formats: {supportedFormats.join(", ")}
            </ParagraphText>

            {/* List of Uploaded Files */}
            {filesToProcess.length > 0 && (
              <Box className="space-y-10">
                <List>
                  {filesToProcess.map((file, index) => {
                    const fileHasBeenUploaded = existingFiles.find(
                      (item) => item.description === file.name,
                    );
                    const uploadText = "Uploading...";
                    const readyToUpload = "Ready to upload";
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
          </Box>
        </BaseDialog>
      </form>
    );
  },
);

UploadDialog.defaultProps = {
  shouldLog: true,
};

export default UploadDialog;
