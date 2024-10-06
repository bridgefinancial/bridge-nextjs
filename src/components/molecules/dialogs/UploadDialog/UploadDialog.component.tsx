import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import withLogging, {
  WithLoggingOptions,
} from "@/hoc/withLogging/withLogging.hoc";
import { colors } from "@/theme/theme";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Grid, List } from "@mui/material";
import React, { FormEvent, SyntheticEvent, useMemo, useRef } from "react";
import { BaseTypographyProps } from "../../../../types/base-typography-props.interface";
import ListItemWithStatus from "../../lists/ListItemWithStatus";
import BaseDialog from "../BaseDialog";
import { BaseDialogProps } from "../BaseDialog/BaseDialog.component";

interface UploadDialogProps
  extends Partial<BaseDialogProps>,
    WithLoggingOptions {
  open: boolean;
  filesToProcess: File[];
  onClose: () => void;
  submitting?: boolean;
  dropzoneText?: string;
  titleProps?: {
    titleText: string;
    titleStyles: BaseTypographyProps;
  };
  onFileChange: (
    event: SyntheticEvent<Element, Event>,
    value: File[] | null,
    callback?: () => void,
  ) => void;
  callback?: () => void;
  handleSave: (e: FormEvent<HTMLFormElement>) => Promise<void>;
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
    completeText = "Complete",
    cancelText = "Cancel",
    saveText = "Save",
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

    // this should be able to take multiple files at once
    const handleFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files); // Multiple files can be selected
        const validFiles = files.filter((file) => {
          const fileExtension = file.name.split(".").pop()?.toLowerCase();
          return supportedFormats.includes(fileExtension || "");
        });
    
        if (validFiles.length !== files.length) {
          alert("Some files are not in the supported format.");
        } else {
          // Call onFileChange and pass the valid files
          onFileChange(event, validFiles, () => {
            
          });
        }
      }
    };
    

    // Format file size for display
    const formatFileSize = (size: number) =>
      `${(size / 1024 / 1024).toFixed(2)} MB`;

    // Check if there are no files uploaded
    const noFilesAvailable = useMemo(
      () => filesToProcess.length === 0,
      [filesToProcess],
    );

    // Handle save operation
    const submitDocs = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!noFilesAvailable) {
        try {
          await handleSave(e); // Call the passed handleSave function
        } catch (error) {
          console.error("Error while saving files:", error);
        }
      }
    };

    return (
      <form id={`upload-${ariaDescribedBy}`} onSubmit={submitDocs}>
        <BaseDialog
          maxWidth={600}
          fullWidth={true}
          ariaDescribedBy={`upload-${ariaDescribedBy}`}
          titleProps={titleProps}
          open={open}
          onClose={onClose}
          actions={
            noFilesAvailable ? null : (
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
                    sx={{ width: "100%" }}
                    text={saveText}
                    type="submit"
                    disabled={isSaving}
                  />
                </Grid>
              </Grid>
            )
          }
        >
          <Box className="space-y-2">
            {/* Hidden File Input */}
            <input
              type="file"
              multiple={true}
              accept={acceptFormats}
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileDrop}
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
            {!noFilesAvailable && (
              <Box className="space-y-10">
                <List>
                  {filesToProcess.map((file, index) => (
                    <ListItemWithStatus
                      key={index}
                      title={file.name}
                      status={completeText}
                      actionIcon={<CloseIcon />}
                      onAction={() => handleRemoveFile(index)}
                      subtitle={formatFileSize(file.size)}
                    />
                  ))}
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
