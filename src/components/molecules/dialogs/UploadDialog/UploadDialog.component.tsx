import React, { useState, useMemo, useRef } from "react";
import { Box, Typography, List, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BaseDialog from "../BaseDialog";
import { BaseDialogProps } from "../BaseDialog/BaseDialog.component";
import { BaseTypographyProps } from "../../../../types/base-typography-props.interface";
import ListItemWithStatus from "../../lists/ListItemWithStatus";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { colors } from "@/theme/theme";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";

interface UploadDialogProps extends Partial<BaseDialogProps> {
  open: boolean;
  onClose: () => void;
  submitting?: boolean;
  dropzoneText?: string;
  titleProps?: {
    titleText: string;
    titleStyles: BaseTypographyProps;
  };
  handleSave: (documents: File[]) => Promise<void>;
  supportedFormats?: string[]; // Array of supported formats, e.g., ['pdf', 'docx', 'csv']
  completeText?: string;
  isSaving?: boolean;
  cancelText?: string;
  saveText?: string;
  ariaDescribedBy?: string;
}

const UploadDialog: React.FC<UploadDialogProps> = ({
  open = false,
  onClose = () => {},
  dropzoneText = "Drag and drop your documents here",
  supportedFormats = ["pdf", "docx", "csv"], // default formats
  completeText = "Complete",
  cancelText = "Cancel",
  saveText = "Save",
  handleSave,
  isSaving = false,
  ariaDescribedBy,
  titleProps = {
    titleText: "Upload files",
    titleStyles: {
      fontSize: 18,
      fontWeight: 600,
    },
  },
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate the accept attribute based on supported formats
  const acceptFormats = supportedFormats
    .map((format) => `.${format}`)
    .join(",");

  // Handle file drop event
  const handleFileDrop = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const validFiles = files.filter((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return supportedFormats.includes(fileExtension || "");
      });

      if (validFiles.length !== files.length) {
        alert("Some files are not in the supported format.");
      }

      setUploadedFiles(validFiles); // Update internal state with valid files only
    }
  };

  // Format file size for display
  const formatFileSize = (size: number) => {
    return `${(size / 1024 / 1024).toFixed(2)} MB`; // Format size in MB
  };

  // Check if there are no files uploaded
  const noFilesAvailable = useMemo(
    () => uploadedFiles.length === 0,
    [uploadedFiles.length],
  );

  // Handle save operation
  const submitDocs = async () => {
    if (!noFilesAvailable) {
      try {
        await handleSave(uploadedFiles); // Call the passed handleSave function with uploaded files
        setUploadedFiles([]); // Clear the uploaded files after saving
      } catch (error) {
        console.error("Error while saving files:", error);
      }
    }
  };

  return (
    <BaseDialog
      maxWidth={600}
      fullWidth={true}
      ariaDescribedBy={`upload-${ariaDescribedBy}`}
      titleProps={titleProps}
      open={open}
      onClose={onClose}
      actions={
        noFilesAvailable ? null : (
          <Grid
            container={true}
            style={{
              width: "100%",
            }}
          >
            <Grid item={true} xs={4}>
              <TextButton
                sx={{ width: "100%" }}
                text={cancelText}
                onClick={onClose}
                disabled={isSaving}
              />
            </Grid>

            <Grid xs={4} />
            <Grid item={true} xs={4}>
              <ContainedButton
                backgroundColor={colors.bridgeDarkPurple}
                sx={{ width: "100%" }}
                text={saveText}
                onClick={submitDocs} // Use submitDocs to handle the file submission
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
          accept={acceptFormats} // Only allow supported file types
          style={{ display: "none" }}
          ref={fileInputRef} // Connect the ref to the file input
          onChange={handleFileDrop} // Handle file input change
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
          onClick={() => fileInputRef.current?.click()} // Trigger file input on click
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

        <ParagraphText
          sx={{
            color: "rgba(0, 0, 0, 0.6)",
            fontSize: 13,
          }}
        >
          Supported formats: {supportedFormats.join(", ")}
        </ParagraphText>

        {/* List of Uploaded Files */}
        {!noFilesAvailable && (
          <Box className="space-y-10">
            <List>
              {uploadedFiles.map((file, index) => (
                <ListItemWithStatus
                  key={index}
                  title={file.name}
                  status={completeText}
                  subtitle={formatFileSize(file.size)}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    </BaseDialog>
  );
};

export default UploadDialog;
