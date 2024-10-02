import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ConfirmationDialog from "@/components/molecules/dialogs/ConfirmationDialog";
import UploadDialog from "@/components/molecules/dialogs/UploadDialog";
import ListHeader from "@/components/molecules/lists/ListHeader";
import ListItemWithActions from "@/components/molecules/lists/ListItemWithActions";
import { ListItemActionButton } from "@/components/molecules/lists/ListItemWithActions/ListItemWithActions.component";
import { DocumentFileItem, UseDocumentsFormReturn, UseDocumentsState } from "@/hooks/useDocumentsForm";
import { dialogReducer } from "@/reducers/dialog.reducer";
import theme, { colors } from "@/theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Paper, useMediaQuery } from "@mui/material";
import React, { Dispatch, FormEvent, SetStateAction, SyntheticEvent, useCallback, useMemo, useReducer } from "react";


// Error Message: existingFiles.map is not a function. (In 'existingFiles.map((document, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_molecules_lists_ListItemWithActions__WEBPACK_IMPORTED_MODULE_5__["default"], {
//                 title: document.description,
//                 subTitle: new Date(document.created_at).toLocaleDateString("en-US"),
//                 actions: [
//                     /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_molecules_lists_ListItemWithActions_ListItemWithActions_component__WEBPACK_IMPORTED_MODULE_6__.ListItemActionButton, {
//                         children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Download__WEBPACK_IMPORTED_MODULE_11__["default"], {
//                             onClick: ()=>handleDownload(document)
//                         }, void 0, false, {
//                             fileName: "/Users/landonjohnson/dev-local/workplaces/bridge-nextjs/src/app/portal/documents/DocumentList/DocumentList.component.tsx",
//                             lineNumber: 144,
//                             columnNumber: 13
//                         }, void 0)
//                     }, "download", false, {
//                         fileName: "/Users/landonjohnson/dev-local/workplaces/bridge-nextjs/src/app/portal/documents/DocumentList/DocumentList.component.tsx",
//                         lineNumber: 143,
//                         columnNumber: 11
//                     }, void 0),
//                     /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_molecules_lists_ListItemWithActions_ListItemWithActions_component__WEBPACK_IMPORTED_MODULE_6__.ListItemActionButton, {
//                         onClick: ()=>handleDelete(document),
//                         children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Delete__WEBPACK_IMPORTED_MODULE_12__["default"], {}, void 0, false, {
//                             fileName: "/Users/landonjohnson/dev-local/workplaces/bridge-nextjs/src/app/portal/documents/DocumentList/DocumentList.component.tsx",
//                             lineNumber: 150,
//                             columnNumber: 13
//                         }, void 0)
//                     }, "delete", false, {
//                         fileName: "/Users/landonjohnson/dev-local/workplaces/bridge-nextjs/src/app/portal/documents/DocumentList/DocumentList.component.tsx",
//                         lineNumber: 146,
//                         columnNumber: 11
//                     }, void 0)
//                 ]
//             }, index, false, {
//                 fileName: "/Users/landonjohnson/dev-local/workplaces/bridge-nextjs/src/app/portal/documents/DocumentList/DocumentList.component.tsx",
//                 lineNumber: 138,
//                 columnNumber: 7
//             }, undefined))', 'existingFiles.map' is undefined)
// Error Stack: @
// updateMemo@
// useMemo@
// DocumentList@
// renderWithHooks@
// updateFunctionComponent@
// beginWork@
// performUnitOfWork@
// workLoopSync@
// renderRootSync@
// recoverFromConcurrentError@
// performSyncWorkOnRoot@
// flushSyncWorkAcrossRoots_impl@
// flushSyncWorkOnAllRoots@
// processRootScheduleInMicrotask@
// @
// Component Stack: 
// DocumentList
// Suspense
// DocumentsPage
// ClientPageRoot
// InnerLayoutRouter
// Component@
// RedirectBoundary
// NotFoundBoundary
// LoadingBoundary
// ErrorBoundary
// Component@
// ScrollAndFocusHandler
// RenderFromTemplateContext
// OuterLayoutRouter
// InnerLayoutRouter
// Component@
// RedirectBoundary
// NotFoundBoundary
// LoadingBoundary
// ErrorBoundary
// Component@
// ScrollAndFocusHandler
// RenderFromTemplateContext
// OuterLayoutRouter
// div
// Styled(div)
// Box
// div
// Styled(div)
// Box
// main
// Styled(div)
// Box
// div
// Styled(div)
// Box
// PortalLayout
// Suspense
// Layout (Server)
// InnerLayoutRouter
// Component@
// RedirectBoundary
// Component@
// NotFoundBoundary
// LoadingBoundary
// ErrorBoundary
// Component@
// ScrollAndFocusHandler
// RenderFromTemplateContext
// OuterLayoutRouter
// DefaultPropsProvider
// RtlProvider
// ThemeProvider
// ThemeProvider
// ThemeProvider
// DefaultPropsProvider
// RtlProvider
// ThemeProvider
// ThemeProvider
// ThemeProvider
// AuthProvider
// Component@
// CustomErrorBoundary
// ErrorsProvider
// MainProvider
// QueryClientProvider
// Providers
// body
// html
// RootLayout
// Component@
// RedirectBoundary
// Component@
// NotFoundBoundary
// DevRootNotFoundBoundary
// PureComponent@
// HotReload
// Router
// Component@
// ErrorBoundary
// AppRouter
// ServerRoot
// Root
interface DocumentListProps extends UseDocumentsFormReturn {
  formState: UseDocumentsState;
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
  onUploadFiles: (
    event: SyntheticEvent<Element, Event>,
    value: File | null,
    callback?: () => void
  ) => void;
  refetchFiles: () => void;
  successfullySubmittedFiles: boolean;
  successfullyDeletedFile: boolean;
  isSubmittingFiles: boolean;
  isDeletingFile: boolean;
  isFetchingFiles: boolean;
  deletingFileError: boolean;
  fetchingFileError: boolean;
  submittingFileError: boolean;
  isLoadingUserSession: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>, callback?: () => void) => void;
  onFileDelete: (fileId: number, callback?: () => void) => void;
  handleDownload: (file: DocumentFileItem) => void;
  handleRemoveFileAtIndex: (index: number) => void;
}

export function withReducers(reducers: { [key: string]: any }) {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, { ...state });
  };
}


const DocumentList: React.FC<DocumentListProps> = ({
  formState: state,
  toastOpen,
  setToastOpen,
  isFetchingFiles: isLoadingFiles,
  submittingFileError,
  successfullyDeletedFile,
  successfullySubmittedFiles,
  refetchFiles,
  onUploadFiles,
  isLoadingUserSession,
  fetchingFileError,
  deletingFileError,
  handleSubmit,
  isSubmittingFiles,
  isDeletingFile,
  onFileDelete,
}) => {
  const { formValues, existingFiles } = state;
  const { filesToProcess } = formValues;

  const [confirmDialogState, dispatch] = useReducer(dialogReducer, {
    documentName: "",
    open: false,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCloseUpload = () => {
    setToastOpen(false); // Handle closing the upload dialog by closing the toast
    console.log("Upload dialog closed");
  };

  const handleNewFilesProvided = (files: File[]) => {
    onUploadFiles(
      {} as SyntheticEvent<Element, Event>, // use empty object or refactor to use the actual event
      files[0],
      () => {
        refetchFiles(); // Call refetchFiles once new files are uploaded
      }
    );
    console.log("New files provided:", files);
  };

  const handleRemoveFileAtIndex = (index: number) => {
    onFileDelete(index, () => {
      console.log(`File at index ${index} removed`);
      refetchFiles(); // Refetch the files after deletion
    });
  };

  const handleSave = (documents: File[]) => {
    if (filesToProcess.length > 0) {
      handleSubmit({} as FormEvent<HTMLFormElement>, () => {
        refetchFiles(); // Refetch files after saving
        console.log("Files saved successfully");
      });
    } else {
      console.error("No files to save");
    }
  };

  const handleDownload = (document: DocumentFileItem) => {
    console.log("Download document:", document);
    // Add download logic here
  };

  const handleDelete = useCallback((document: DocumentFileItem) => {
    dispatch({ type: "OPEN", payload: document.filename });
  }, []);

  const handleDeleteDocument = () => {
    const { documentName } = confirmDialogState;
    const documentToDelete = existingFiles.find(file => file.filename === documentName);
    if (documentToDelete) {
      onFileDelete(documentToDelete.id, () => {
        // Expected 0 arguments, but got 1.ts(2554)

        dispatch({ type: "CLOSE" });
        refetchFiles(); // Refetch files after deletion
        console.log("Document deleted:", documentName);
      });
    }
  };

  const renderedDocuments = useMemo(() => {
    return existingFiles.map((document, index) => (
      <ListItemWithActions
        key={index}
        title={document.description}
        subTitle={new Date(document.created_at).toLocaleDateString("en-US")}
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
  }, [existingFiles, handleDelete]);

  return (
    <>
      <ConfirmationDialog
        onClose={() => dispatch({ type: "CLOSE" })}
        titleProps={{
          titleText: "Are you sure?",
          titleStyles: { textAlign: "center" },
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
            onClick={() => setToastOpen(true)} // Open toast for upload
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
              { text: "Filename", sx: { width: "40%" }, xs: 12, sm: 5.8 },
              {
                text: "Date Uploaded",
                sx: { paddingLeft: "0px", width: "40%" },
                xs: 12,
                sm: 4,
              },
              { text: "", sx: { width: "20%" }, xs: 1, sm: 1 },
            ]}
          />

          {renderedDocuments}
        </Paper>

        <UploadDialog
          ariaDescribedBy={"document-list"}
          open={toastOpen} // Handle dialog state based on toast state
          onClose={handleCloseUpload}
          handleSave={handleSave}
          submitting={isSubmittingFiles}
          dropzoneText="Drop your files here"
          completeText={successfullySubmittedFiles ? "Uploaded" : "Pending"}
          cancelText="Cancel"
          saveText="Save"
        />
      </Box>
    </>
  );
};

export default DocumentList;
