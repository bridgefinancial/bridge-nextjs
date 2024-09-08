import React, { useCallback, useMemo, useReducer, useState } from "react";
import { Box, Paper, useMediaQuery } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemWithActions from "@/components/molecules/lists/ListItemWithActions";
import { ListItemActionButton } from "@/components/molecules/lists/ListItemWithActions/ListItemWithActions.component";
import UploadDialog from "@/components/molecules/dialogs/UploadDialog";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import UploadIcon from "@mui/icons-material/Upload";
import theme, { colors } from "@/theme/theme";
import ListHeader from "@/components/molecules/lists/ListHeader";
import ConfirmationDialog from "@/components/molecules/dialogs/ConfirmationDialog";

interface Document {
  filename: string;
  date: string;
}

interface DocumentListProps {
  documents?: Document[];
  loadDocuments: () => void;
  loading: boolean;
}

const mockDocuments: Document[] = [
  { filename: "Mock Document 1", date: "2023-09-01" },
  { filename: "Mock Document 2", date: "2023-08-20" },
];

// Reducer for managing dialog state
type DialogState = {
  open: boolean;
  documentName: string;
};

type DialogAction =
  | { type: "OPEN"; payload: string }
  | { type: "CLOSE" };

const dialogReducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case "OPEN":
      return { open: true, documentName: action.payload };
    case "CLOSE":
      return { open: false, documentName: "" };
    default:
      return state;
  }
};

const DocumentList: React.FC<DocumentListProps> = ({
  documents = mockDocuments, // Default prop value for documents
  loadDocuments, // Expecting a function to be passed
  loading,
}) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // useReducer for dialog state
  const [confirmDialogState, dispatch] = useReducer(dialogReducer, {
    open: false,
    documentName: "",
  });

  const handleOpenUpload = () => setUploadDialogOpen(true);
  const handleCloseUpload = () => setUploadDialogOpen(false);

  const handleNewFilesProvided = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFileAtIndex = (index: number) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSave = () => {
    setSubmitting(true);
    setTimeout(() => {
      console.log("Files saved:", uploadedFiles);
      setSubmitting(false);
      setUploadDialogOpen(false);
    }, 2000);
  };

  const handleDownload = (document: Document) => {
    console.log("Download document:", document);
    // Add download logic here
  };

  const handleDelete = useCallback((document: Document) => {
    dispatch({ type: "OPEN", payload: document.filename });
  }, []);

  const handleDeleteDocument = () => {
    console.log("Document deleted:", confirmDialogState.documentName);
    dispatch({ type: "CLOSE" });
    // Add delete logic here
  };

  const renderedDocuments = useMemo(() => {
    return documents.map((document, index) => (
      <ListItemWithActions
        key={index}
        title={document.filename}
        subTitle={new Date(document.date).toLocaleDateString("en-US") }
        actions={[
          <ListItemActionButton key="download">
            <DownloadIcon onClick={() => handleDownload(document)} />
          </ListItemActionButton>,
          <ListItemActionButton
            key="delete"
            onClick={() => handleDelete(document)}
          >
            <DeleteIcon />
          </ListItemActionButton>,
        ]}
      />
    ));
  }, [documents, handleDelete]);

  return (
    <>
      <ConfirmationDialog
        onClose={() => dispatch({ type: "CLOSE" })}
        titleProps={{ 
          titleText: "Are you sure?",
          titleStyles: { textAlign: "center" }
        }}
        open={confirmDialogState.open}
        messageText={`Are you sure you want to delete ${confirmDialogState.documentName}?`}
        onCancelButtonProps={{
          onClick: () => dispatch({ type: "CLOSE" }),
          text: "Cancel",
          backgroundColor: "#f0f0f0",
          textColor: "#000",
        }}
        onConfirmButtonProps={{
          onClick: handleDeleteDocument,
          text: "Confirm",
          backgroundColor: colors.bridgeDarkPurple,
          textColor: "#fff",
        }}
      />

      <Box py={{ xs: 4, lg: 8 }}>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <ContainedButton
            backgroundColor="#6a5ace"
            onClick={handleOpenUpload}
            text="Upload"
            sx={{
              borderRadius: "50px",
              paddingLeft: 3,
              paddingRight: 3,
              fontWeight: 600,
            }}
            startIcon={<UploadIcon color="inherit" />}
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
              { text: "Filename", sx: { width: '40%' }, xs: 12, sm: 5.8 },
              {
                text: "Date Uploaded",
                sx: { paddingLeft: "0px", width: '40%' },
                xs: 12,
                sm: 4,
              },
              { text: "", sx: { width: '20%' }, xs: 1, sm: 1 },
            ]}
          />

          {renderedDocuments}
        </Paper>

        <UploadDialog
        ariaDescribedBy={"document-list"}
          open={uploadDialogOpen}
          onClose={handleCloseUpload}
          handleSave={(d) => new Promise(d as any)}
          submitting={submitting}
          dropzoneText="Drop your files here"
          completeText="Uploaded"
          cancelText="Cancel"
          saveText="Save"
        />
      </Box>
    </>
  );
};

export default DocumentList;
