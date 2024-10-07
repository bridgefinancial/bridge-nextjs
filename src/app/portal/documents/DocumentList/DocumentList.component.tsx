import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ConfirmationDialog from "@/components/molecules/dialogs/ConfirmationDialog";
import UploadDialog from "@/components/molecules/dialogs/UploadDialog";
import ToastNotification from "@/components/molecules/feedback/ToastNotification";
import ListHeader from "@/components/molecules/lists/ListHeader";
import ListItemWithActions from "@/components/molecules/lists/ListItemWithActions/ListItemWithActions.component";
import {
  useDeleteFileMutation,
  useGetCompaniesFilesQuery,
  useUploadDocumentsMutation,
} from "@/services/documents.service";
import { Delete, FileDownload } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, IconButton, Paper } from "@mui/material";
import React, { FormEvent, useRef, useState } from "react";

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
  // State to store fetched files
  const { data: existingFilesData, refetch: refetchFiles } =
    useGetCompaniesFilesQuery();
  const { mutate: deleteFile, isPending: deletingFile } =
    useDeleteFileMutation();
  const { mutate: uploadDocuments, isPending: isUploadingFiles } =
    useUploadDocumentsMutation();

  const [deleteFileOpened, setDeleteFileOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files in a state for display
  const [uploadOpen, setUploadOpen] = useState(false); // Upload Dialog open state
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
  const [selectedDocumentDescription, setSelectedDocumentDescription] =
    useState("");

  // State for toast notifications
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSeverity, setToastSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("success");

  // File change handler
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newFiles = filesArray.filter(
        (file) =>
          !existingFilesData.results.some(
            (existingFile: DocumentFileItem) => existingFile.file === file.name,
          ),
      );
      if (newFiles.length === 0) {
        console.error("All selected files have already been uploaded.");
        return;
      }
      setSelectedFiles([...selectedFiles, ...newFiles]); // Store the selected files in state for display
    }
  };

  // File upload logic using mutation
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedFiles.length > 0) {
      uploadDocuments(
        { files: selectedFiles },
        {
          onSettled: () => {
            refetchFiles(); // Ensure that files are refetched after the upload is complete
            setToastMessage("Files uploaded successfully!"); // Set success message
            setToastSeverity("success"); // Set severity to success
            setOpenToast(true); // Open toast notification
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
          },
          onError: (error) => {
            setToastMessage("Error uploading document.");
            setToastSeverity("error");
            setOpenToast(true);
            console.error("Error uploading document:", error);
          },
        },
      );
    } else {
      console.error("No files to save");
    }
  };

  const handleOpenUpload = () => {
    if (existingFilesData && existingFilesData.results) {
      // Filter out any files that already exist in the database by comparing file.name to the description in existingFilesData
      const filteredFiles = selectedFiles.filter(
        (file) =>
          !existingFilesData.results.some(
            (existingFile: DocumentFileItem) =>
              existingFile.description === file.name,
          ),
      );

      setSelectedFiles(filteredFiles); // Only keep files that are not already in the database
    }

    setUploadOpen(true); // Open the modal
  };

  // This deletes a file from the database and checks after refetch
  const handleDeleteFile = (descriptionOfFile: string) => {
    if (deletingFile) {
      return;
    }

    const fileToDelete = existingFilesData.results.find(
      (d: DocumentFileItem) => d.description === descriptionOfFile,
    );

    if (fileToDelete && fileToDelete.id) {
      deleteFile(
        { fileId: fileToDelete.id },
        {
          onSettled: () => {
            refetchFiles(); // Refetch files after the mutation is completed
            setToastMessage(
              `File "${descriptionOfFile}" deleted successfully!`,
            );
            setToastSeverity("success");
            setOpenToast(true);
            setDeleteFileOpen(false); // Close delete modal after successful deletion
          },
          onError: (e) => {
            setToastMessage("Error deleting file.");
            setToastSeverity("error");
            setOpenToast(true);
            console.error("Error deleting file:", e);
          },
        },
      );
    }
  };

  // Remove file from the list of files to be processed
  const handleRemoveFileAtIndex = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // don't clear any values from upload here
  const handleCloseUpload = () => setUploadOpen(false); // Close upload dialog

  const handleOpenDelete = (documentDescription: string) => {
    setDeleteFileOpen(true);
    setSelectedDocumentDescription(documentDescription);
  };
  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.target = "_blank"; // This opens the link in a new tab
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box py={{ xs: 4, lg: 8 }}>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <ContainedButton
            backgroundColor="#6a5ace"
            onClick={() => handleOpenUpload()}
            text="Upload"
            startIcon={<UploadIcon />}
          />
        </Box>

        <Paper
          variant="outlined"
          sx={{
            padding: 2,
            borderRadius: "10px",
            borderColor: "bridge-gray-border",
          }}
        >
          <ListHeader
            columns={[
              { text: "Filename", sx: { width: "40%" } },
              {
                text: "Date Uploaded",
                sx: { paddingLeft: "0px", width: "40%" },
              },
              { text: "", sx: { width: "20%" } },
            ]}
          />
          {existingFilesData?.results.map(
            (document: DocumentFileItem, index: number) => (
              <ListItemWithActions
                key={index}
                title={document.description}
                subTitle={new Date(document.created_at).toLocaleDateString()}
                actions={[
                  <IconButton
                    key={`${index}-${document.description.trim().replace(/\s+/g, "")}-action-one`}
                    onClick={() =>
                      handleDownload(document.file, document.description)
                    }
                  >
                    <FileDownload />
                  </IconButton>,
                  <IconButton
                    key={`${index}-${document.description.trim().replace(/\s+/g, "")}-action-one`}
                    onClick={() => handleOpenDelete(document.description)}
                  >
                    <Delete />
                  </IconButton>,
                ]}
              />
            ),
          )}
        </Paper>

        <ConfirmationDialog
          onCancelButtonProps={{
            text: "Cancel",
            disabled: deletingFile,
            onClick: () => setDeleteFileOpen(false),
          }}
          onConfirmButtonProps={{
            text: `Delet${deletingFile ? "ing" : "e"}`,
            disabled: deletingFile,
            onClick: () => handleDeleteFile(selectedDocumentDescription),
          }}
          onClose={() => setDeleteFileOpen(false)}
          open={deleteFileOpened}
          titleProps={{
            titleText: `Do you want to delete ${selectedDocumentDescription}?`,
          }}
          messageText="Are you sure you want to delete this file?"
        />

        {/* Upload Dialog */}
        <UploadDialog
          existingFiles={existingFilesData?.results || []}
          open={uploadOpen}
          onClose={handleCloseUpload}
          handleSave={handleSave}
          filesToProcess={selectedFiles as any}
          onFileChange={onFileChange}
          isSaving={isUploadingFiles}
          handleRemoveFile={handleRemoveFileAtIndex}
        />

        {/* Toast Notification */}
        <ToastNotification
          message={toastMessage}
          severity={toastSeverity}
          open={openToast}
          setOpen={setOpenToast} // This will close the toast when the user clicks on it or after auto-hide
          autoHideDuration={3000} // The toast will auto-hide after 3 seconds
        />
      </Box>
    </>
  );
};

export default DocumentList;
