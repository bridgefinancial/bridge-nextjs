import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextButton from "@/components/atoms/buttons/TextButton/TextButton.component";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import BaseDialog from "@/components/molecules/dialogs/BaseDialog";
import ListHeader from "@/components/molecules/lists/ListHeader";
import ListItemWithActions from "@/components/molecules/lists/ListItemWithActions/ListItemWithActions.component";
import ListItemWithStatus from "@/components/molecules/lists/ListItemWithStatus";
import { useDeleteFileMutation, useGetCompaniesFilesQuery, useUploadDocumentsMutation } from "@/services/documents.service";
import { colors } from "@/theme/theme";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Grid, List, Paper } from "@mui/material";
import React, { FormEvent, useMemo, useRef, useState } from "react";

// Interface for representing a single document
export interface DocumentFileItem {
  id: number;
  created_at: string;
  updated_at: string;
  file: string;
  description: string;
  company: number;
}

const DocumentList: React.FC = () => {
  const { data: existingFilesData, refetch: refetchFiles } = useGetCompaniesFilesQuery();
  const { mutate: deleteFile } = useDeleteFileMutation();
  const { mutate: uploadDocuments, isPending: isUploadingFiles } = useUploadDocumentsMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files in a state for display
  const [toastOpen, setToastOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  // File change handler
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newFiles = files.filter(
        (file) => !existingFilesData?.results.some((existingFile: DocumentFileItem) => existingFile.file === file.name)
      );
      if (newFiles.length === 0) {
        console.error("All selected files have already been uploaded.");
        return;
      }
      console.log("Files selected:", newFiles);
      setSelectedFiles([...selectedFiles, ...newFiles]); // Store the selected files in state for display
    }
  };

  // File upload logic using mutation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length > 0) {
      // don't need to do formData append since it happens in uploadDocuments
     

      console.log("Uploading files:", selectedFiles);

      uploadDocuments(
        { files: selectedFiles },
        {
          onSuccess: (response) => {
            console.log("Upload successful:", response);
            refetchFiles(); // Refresh files on success
            setSelectedFiles([]); // Clear files after success
            setToastOpen(false); // Close the dialog
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
          },
          onError: (error) => {
            console.error("Error uploading document:", error);
          },
        }
      );
    } else {
      console.error("No files to save");
    }
  };

  // Remove file from the list of files to be processed
  const handleRemoveFileAtIndex = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const noFilesAvailable = useMemo(() => selectedFiles.length === 0, [selectedFiles]);

  const handleCloseUpload = () => setToastOpen(false);


  console.log(existingFilesData, 'this is existing data')
  return (
    <>
      <Box py={{ xs: 4, lg: 8 }}>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <ContainedButton backgroundColor="#6a5ace" onClick={() => setToastOpen(true)} text="Upload" startIcon={<UploadIcon />} />
        </Box>

        <Paper variant="outlined" sx={{ padding: 2, borderRadius: "10px", borderColor: "bridge-gray-border" }}>
          <ListHeader
            columns={[
              { text: "Filename", sx: { width: "40%" } },
              { text: "Date Uploaded", sx: { paddingLeft: "0px", width: "40%" } },
              { text: "", sx: { width: "20%" } },
            ]}
          />
          {existingFilesData?.results.map((document: DocumentFileItem, index: number) => (
            <ListItemWithActions
              key={index}
              title={document.description}
              subTitle={new Date(document.created_at).toLocaleDateString()}
              actions={[]}
            />
          ))}
        </Paper>

        {/* Upload Dialog */}
        <BaseDialog
          maxWidth={600}
          fullWidth
          ariaDescribedBy="upload-dialog"
          titleProps={{ titleText: "Upload files", titleStyles: { fontSize: 18, fontWeight: 600 } }}
          open={toastOpen}
          onClose={handleCloseUpload}
          actions={
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextButton text="Cancel" onClick={handleCloseUpload} disabled={isUploadingFiles} />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <ContainedButton backgroundColor={colors.bridgeDarkPurple} text="Save" onClick={handleSubmit} disabled={isUploadingFiles} />
              </Grid>
            </Grid>
          }
        >
          <Box>
            <input
              type="file"
              name="file"
              multiple
              accept=".pdf,.docx,.csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={onFileChange}
            />
            <Box
              component="label"
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
                <ParagraphText sx={{ color: "rgba(0, 0, 0, 0.6)" }}>Drag and drop your documents here</ParagraphText>
              </Box>
              <ParagraphText sx={{ color: colors.bridgeDarkPurple }}>Choose files</ParagraphText>
            </Box>

            <ParagraphText sx={{ color: "rgba(0, 0, 0, 0.6)", fontSize: 13 }}>Supported formats: pdf, docx, csv</ParagraphText>

            {/* Display selected files */}
            {!noFilesAvailable && (
              <List>
                {selectedFiles.map((file, index) => (
                  <ListItemWithStatus
                    key={index}
                    title={file.name}
                    status="Pending"
                    actionIcon={<CloseIcon />}
                    onAction={() => handleRemoveFileAtIndex(index)}
                    subtitle={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                  />
                ))}
              </List>
            )}
          </Box>
        </BaseDialog>
      </Box>
    </>
  );
};

export default DocumentList;
