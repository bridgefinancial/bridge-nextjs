/* eslint-disable no-console */
import { formReducer, FormState } from "@/reducers/form.reducer";
import {
  useDeleteFileMutation,
  useGetCompaniesFilesQuery,
  useUploadDocumentsMutation,
} from "@/services/documents.service";
import { useSessionUser } from "@/services/users.service";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useReducer,
  useState,
} from "react";
import { withReducers } from '../hoc/withReducers/withReducers.hoc';

export interface DocumentFileItem {
  id: number;
  created_at: string;
  updated_at: string;
  file: string;
  description: string;
  company: number;
}

export function existingFilesReducer(
  state: DocumentFileItem[] = [],
  action: any
): DocumentFileItem[] {
  switch (action.type) {
    case "SET_EXISTING_FILES":
      return action.files;
    case "RESET_EXISTING_FILES":
      return [];
    default:
      return state;
  }
}



export interface UseDocumentsState extends FormState<{
  filesToProcess: File[]
}> {
  existingFiles: DocumentFileItem[];
  formValues: {  
    filesToProcess: File[];
  }
}

const initialState: UseDocumentsState = {
  formValues: {
    filesToProcess: [], // Initialize as an empty array
  },
  existingFiles: [],
  formErrors: {},
};

export interface UseDocumentsFormReturn {
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

export function useDocumentsForm(): UseDocumentsFormReturn {
  const {
    data: user,
    isPending: isLoadingUserSession,
    refetch: refetchUser,
    isFetched: isUserFetched,
  } = useSessionUser();
  const {
    data: existingFilesData,
    isLoading: isLoadingFiles,
    isError: fetchingFileError,
    refetch: refetchFiles,
  } = useGetCompaniesFilesQuery();

  const [state, dispatch] = useReducer(
    withReducers({
      formValues: formReducer,
      existingFiles: existingFilesReducer,
    }),
    initialState,
  );

  const [toastOpen, setToastOpen] = useState(false);

  const { mutate: deleteFile, isSuccess: successfullyDeletedFile, isError: deletingFileError, isPending: isDeletingFile } = useDeleteFileMutation();
  const {
    mutate: uploadDocuments,
    isSuccess: successfullySubmittedFiles,
    isError: submittingFileError,
    isPending: isSubmittingFiles
  } = useUploadDocumentsMutation();

  // Populate existing files when fetched
  if (existingFilesData && state.existingFiles.length === 0) {
    dispatch({ type: "SET_EXISTING_FILES", files: existingFilesData });
  }

  const onUploadFiles = (
    event: SyntheticEvent<Element, Event>,
    value: File | null,
    callback?: () => void
  ) => {
    if (value) {
      const isFileAlreadyUploaded = state.existingFiles.some(
        (file: DocumentFileItem) => file.file === value.name,
      );

      if (isFileAlreadyUploaded) {
        console.error("File already uploaded.");
        return;
      }

      // Add the file to the filesToProcess state
      const newFiles = [...state.formValues.filesToProcess, value];
      dispatch({
        type: "SET_FIELD",
        field: "filesToProcess",
        value: newFiles,
      });

      if (callback && typeof callback === "function") {
        callback();
      }
    }
  };

  const onFileDelete = (fileId: number, callback?: () => void) => {
    deleteFile(
      { fileId },
      {
        onSuccess: () => {
          if (callback && typeof callback === "function") {
            callback();
          }
          refetchFiles(); // Refresh the file list after deletion
        },
        onError: (error) => {
          console.error("Failed to delete file:", error);
        },
      }
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>, callback?: () => void) => {
    e.preventDefault();
    if (state.formValues.filesToProcess.length > 0) {
      uploadDocuments(
        { files: state.formValues.filesToProcess },
        {
          onSuccess: () => {
            if (callback && typeof callback === "function") {
              callback();
            }
            refetchFiles();
            setToastOpen(true);
          },
          onError: (error: any) => {
            console.error("Failed to upload files:", error);
          },
        }
      );
    } else {
      console.error("No files to upload.");
    }
  };

  const handleDownload = (file: DocumentFileItem) => {
    // You can define your file download logic here.
    console.log(`Downloading file: ${file.file}`);
  };

  const handleRemoveFileAtIndex = (index: number) => {
    const updatedFiles = state.formValues.filesToProcess.filter(
      (_: File, i: number) => i !== index
    );
  
    dispatch({
      type: "SET_FIELD",
      field: "filesToProcess",
      value: updatedFiles,
    });
  };

  return {
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
    handleDownload,
    handleRemoveFileAtIndex,
  };
}
