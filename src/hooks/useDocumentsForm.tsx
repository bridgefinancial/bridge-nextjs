/* eslint-disable no-console */
import {
  useDeleteFileMutation,
  useGetCompaniesFilesQuery,
  useUploadDocumentsMutation,
} from "@/services/documents.service";
import { useSessionUser } from "@/services/users.service";
import colorLogger from "@/utils/color-logger";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { withReducers } from "../hoc/withReducers/withReducers.hoc";

// Define a generic form state and error structure
export interface DocumentFormState<TFormValues> {
  formErrors: Partial<Record<keyof TFormValues, any>>; // Allow any type for formErrors
  filesToProcess: File[]; // Add filesToProcess here
}

// Type definition for DocumentFormAction with dynamic value handling
export type DocumentFormAction<TFormValues> =
  | { type: "SET_FIELD"; field: keyof TFormValues; value: TFormValues[keyof TFormValues] }
  | { type: "SET_ERRORS"; errors: Partial<Record<keyof TFormValues, string>> }
  | { type: "RESET_FORM"; values: TFormValues }
  | { type: "SET_FILES_TO_PROCESS"; value: File[] }; // Added action for handling filesToProcess

// Updated documentFormReducer to properly handle 'filesToProcess'
export function documentFormReducer<TFormValues>(
  state: DocumentFormState<TFormValues>,
  action: DocumentFormAction<TFormValues>
): DocumentFormState<TFormValues> {
  switch (action.type) {
    case "SET_FIELD": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }

    case "SET_ERRORS": {
      return {
        ...state,
        formErrors: action.errors,
      };
    }

    case "RESET_FORM": {
      return {
        ...state,
        ...action.values,
        formErrors: {}, // Reset errors when resetting form
      };
    }

    case "SET_FILES_TO_PROCESS": {
      // Ensure we return a new state and properly update filesToProcess
      return {
        ...state,
        filesToProcess: [...action.value],  // Merging new array
      };
    }

    default:
      return state;
  }
}

// Type definition for DocumentFileItem
export interface DocumentFileItem {
  id: number;
  created_at: string;
  updated_at: string;
  file: string;
  description: string;
  company: number;
}

// Reducer for managing existing files
export function existingFilesReducer(
  state: DocumentFileItem[] = [],
  action: any,
): DocumentFileItem[] {
  switch (action.type) {
    case "SET_EXISTING_FILES":
      return action.existingFiles;
    case "RESET_EXISTING_FILES":
      return [];
    default:
      return state;
  }
}

// UseDocumentsState now contains filesToProcess directly, removing the formValues structure
export interface UseDocumentsState {
  filesToProcess: File[]; // filesToProcess is now at the root level
  existingFiles: {
    count: number;
    next: any;
    previous: any;
    results: DocumentFileItem[];
  };
  formErrors: Partial<Record<string, any>>;
}

const initialState: UseDocumentsState = {
  filesToProcess: [], // Initialize as an empty array
  existingFiles: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  formErrors: {},
};

export interface UseDocumentsFormReturn {
  formState: UseDocumentsState;
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
  onFileChange: (
    event: SyntheticEvent<Element, Event>,
    value: File[] | null,
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
      existingFiles: existingFilesReducer,
    }),
    initialState
  );

  const [toastOpen, setToastOpen] = useState(false);

  const {
    mutate: deleteFile,
    isSuccess: successfullyDeletedFile,
    isError: deletingFileError,
    isPending: isDeletingFile,
  } = useDeleteFileMutation();

  const {
    mutate: uploadDocuments,
    isSuccess: successfullySubmittedFiles,
    isError: submittingFileError,
    isPending: isSubmittingFiles,
  } = useUploadDocumentsMutation();

  const hasExistingFiles = useMemo(
    () => state.existingFiles.count !== 0,
    [state.existingFiles.count]
  );
  const hasFilesToProcess = useMemo(
    () => state.filesToProcess.length !== 0,
    [state.filesToProcess]
  );

  // Populate existing files when fetched
  useEffect(() => {
    colorLogger.log(
      "blue",
      `Does useDocumentsForm have existing files from the database? The answer is: ${hasExistingFiles}`
    );

    // If there are files, log them
    if (hasExistingFiles) {
      colorLogger.log("green", "Those files are:", state.existingFiles);
    }
  }, [hasExistingFiles, state.existingFiles]);

  useEffect(() => {
    colorLogger.log(
      "yellow",
      `Are files ready to upload for useDocumentsForm? The answer is: ${hasFilesToProcess}`,
      {
        hasFilesToProcess: hasFilesToProcess ? "Those files are:" : "No files to upload",
        files: state.filesToProcess,
      }
    );
  }, [hasFilesToProcess, state.filesToProcess]);

  // Check and update existing files
  useEffect(() => {
    if (existingFilesData && !hasExistingFiles) {
      dispatch({ type: "SET_EXISTING_FILES", existingFiles: existingFilesData });
    }
  }, [existingFilesData, hasExistingFiles]);

  const onFileChange = (
    event: SyntheticEvent<Element, Event>,
    value: File[] | null,
    callback?: () => void
  ) => {
    console.log(value, 'this is value')

    if (value && value.length > 0) {
      const newFiles = value.filter(
        (file) =>
          !state.existingFiles.results.some(
            (existingFile: DocumentFileItem) => existingFile.file === file.name
          )
      );
  
      if (newFiles.length === 0) {
        colorLogger.log("red", "All selected files have already been uploaded.");
        return;
      }

      const updatedFiles = [...state.filesToProcess, ...newFiles];
      colorLogger.log("green", "New files dispatched", updatedFiles);

      dispatch({
        type: "SET_FILES_TO_PROCESS",
        value: updatedFiles,
      });

      // Log state after updating to confirm it's working
      console.log(state.filesToProcess, 'State after dispatch');

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
          colorLogger.log("red", "Failed to delete file:", error);
        },
      }
    );
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    callback?: () => void
  ) => {
    e.preventDefault();
    if (state.filesToProcess.length > 0) {
      mutatationfunction(
        { files: state.filesToProcess },
        {
          onSuccess: () => {
            if (callback && typeof callback === "function") {
              callback();
            }
            refetchFiles();
            setToastOpen(true);
          },
          onError: (error: any) => {
            colorLogger.log("red", "Failed to upload files:", error);
          },
        }
      );
    } else {
      colorLogger.log("red", "No files to upload.");
    }
  };

  const handleDownload = (file: DocumentFileItem) => {
    colorLogger.log("blue", `Downloading file: ${file.file}`);
  };

  const handleRemoveFileAtIndex = (index: number) => {
    const updatedFiles = state.filesToProcess.filter(
      (_: File, i: number) => i !== index
    );
    colorLogger.log("green", "Updated files list after removing:", updatedFiles);
    dispatch({
      type: "SET_FILES_TO_PROCESS",
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
    onFileChange,
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
