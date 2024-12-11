import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import DocumentIcon from '@/components/atoms/images/DocumentIcon/DocumentIcon.component';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import ConfirmationDialog from '@/components/molecules/dialogs/ConfirmationDialog';
import UploadDialog from '@/components/molecules/dialogs/UploadDialog';
import ToastNotification from '@/components/molecules/feedback/ToastNotification';
import ListHeader from '@/components/organisms/lists/ListHeader';
import ListItemWithActions from '@/components/organisms/lists/ListItemWithActions/ListItemWithActions.component';
import {
  useDeleteFileMutation,
  useUploadDocumentsMutation,
} from '@/services/documents.service';
import { CompanyFile } from '@/types/users.types';
import { Delete, FileDownload } from '@mui/icons-material';
import UploadIcon from '@mui/icons-material/Upload';
import { Alert, Box, IconButton, Paper } from '@mui/material';
import React, { FormEvent, forwardRef, useRef, useState } from 'react';

type DocumentListProps = {
  onFilesUploaded?: (files: CompanyFile[]) => void;
  onFileDeleted?: (file: CompanyFile) => void;
  onUploadSettled?: () => void;
  onUploadClicked: () => void;
  uploadedFiles?: CompanyFile[];
  showDateUploaded?: boolean;
};

const DocumentList = forwardRef(
  (
    {
      onFilesUploaded,
      onFileDeleted,
      onUploadSettled,
      onUploadClicked,
      uploadedFiles = [],
      showDateUploaded = true,
    }: DocumentListProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { mutate: deleteFile, isPending: deletingFile } =
      useDeleteFileMutation();
    const { mutate: uploadDocuments, isPending: isUploadingFiles } =
      useUploadDocumentsMutation();

    const [deleteFileOpened, setDeleteFileOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store selected files in a state for display
    const [uploadOpen, setUploadOpen] = useState(false); // Upload Dialog open state
    const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input
    const [selectedDocumentDescription, setSelectedDocumentDescription] =
      useState('');

    // State for toast notifications
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');
    const [toastSeverity, setToastSeverity] = useState<
      'error' | 'success' | 'info' | 'warning'
    >('success');

    // File change handler
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const filesArray = Array.from(event.target.files);
        const newFiles = filesArray.filter(
          (file) =>
            !uploadedFiles.some(
              (existingFile: CompanyFile) => existingFile.file === file.name
            )
        );
        if (newFiles.length === 0) {
          console.error('All selected files have already been uploaded.');
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
              onUploadSettled?.();
              setToastMessage('Files uploaded successfully!'); // Set success message
              setToastSeverity('success'); // Set severity to success
              setOpenToast(true); // Open toast notification
              if (fileInputRef.current) fileInputRef.current.value = ''; // Reset file input
            },
            onError: (error) => {
              setToastMessage('Error uploading document.');
              setToastSeverity('error');
              setOpenToast(true);
              console.error('Error uploading document:', error);
            },
            onSuccess: (data) => {
              onFilesUploaded?.(data.responses);
            },
          }
        );
      } else {
        console.error('No files to save');
      }
    };

    const handleOpenUpload = () => {
      if (uploadedFiles) {
        // Filter out any files that already exist in the database by comparing file.name to the description in existingFilesData
        const filteredFiles = selectedFiles.filter(
          (file) =>
            !uploadedFiles.some(
              (existingFile: CompanyFile) =>
                existingFile.description === file.name
            )
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

      const fileToDelete = uploadedFiles.find(
        (d: CompanyFile) => d.description === descriptionOfFile
      );

      if (fileToDelete && fileToDelete.id) {
        deleteFile(
          { fileId: fileToDelete.id },
          {
            onSettled: () => {
              onFileDeleted?.(fileToDelete);
              onUploadSettled?.(); // Refetch files after the mutation is completed
              setToastMessage(
                `File "${descriptionOfFile}" deleted successfully!`
              );
              setToastSeverity('success');
              setOpenToast(true);
              setDeleteFileOpen(false); // Close delete modal after successful deletion
            },
            onError: (e) => {
              setToastMessage('Error deleting file.');
              setToastSeverity('error');
              setOpenToast(true);
              console.error('Error deleting file:', e);
            },
          }
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
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.target = '_blank'; // This opens the link in a new tab
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
              borderRadius: '10px',
              borderColor: 'bridge-gray-border',
            }}
          >
            <ListHeader
              columns={[
                { text: 'Filename', sx: { width: '40%' } },
                ...(!!showDateUploaded
                  ? [
                      {
                        text: 'Date Uploaded',
                        sx: { paddingLeft: '0px', width: '40%' },
                      },
                    ]
                  : []),
                { text: '', sx: { width: '20%' } },
              ]}
            />
            {uploadedFiles.length === 0 && (
              <Alert severity="info">
                <ParagraphText>
                  Upload a file to see it in your list of uploaded documents
                </ParagraphText>
              </Alert>
            )}
            {uploadedFiles.map((document: CompanyFile, index: number) => (
              <ListItemWithActions
                key={index}
                title={document.description}
                subTitle={
                  showDateUploaded
                    ? new Date(document.created_at).toLocaleDateString()
                    : undefined
                }
                actions={[
                  <IconButton
                    key={`${index}-${document.description.trim().replace(/\s+/g, '')}-action-one`}
                    onClick={() =>
                      handleDownload(document.file, document.description)
                    }
                  >
                    <FileDownload />
                  </IconButton>,
                  <IconButton
                    key={`${index}-${document.description.trim().replace(/\s+/g, '')}-action-one`}
                    onClick={() => handleOpenDelete(document.description)}
                  >
                    <Delete />
                  </IconButton>,
                ]}
                icon={<DocumentIcon fileName={document.description} />}
              />
            ))}
          </Paper>

          <ConfirmationDialog
            onCancelButtonProps={{
              text: 'Cancel',
              disabled: deletingFile,
              onClick: () => setDeleteFileOpen(false),
            }}
            onConfirmButtonProps={{
              text: `Delet${deletingFile ? 'ing' : 'e'}`,
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
            existingFiles={uploadedFiles as any || [] as any}
            open={uploadOpen}
            onClose={handleCloseUpload}
            handleSave={handleSave}
            filesToProcess={selectedFiles as any}
            onFileChange={onFileChange}
            isSaving={isUploadingFiles}
            handleRemoveFile={handleRemoveFileAtIndex}
            onUploadClicked={onUploadClicked}
            ref={ref}
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
  }
);

export default DocumentList;
