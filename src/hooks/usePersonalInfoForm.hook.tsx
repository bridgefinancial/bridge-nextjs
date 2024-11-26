// Import necessary hooks and types from React
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useReducer,
  useState,
} from 'react';

// Import your custom hooks (make sure the paths are correct in your project)
import { useSessionUser, useUpdateUser } from '@/services/users.service';

// Define the shape of form values
interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

// Define the shape of form errors
interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// Define the possible actions for the reducer
type Action =
  | { type: 'SET_FIELD'; field: keyof FormValues; value: string }
  | { type: 'SET_ERRORS'; errors: FormErrors };

// Define the state structure
interface State {
  formValues: FormValues;
  formErrors: FormErrors;
}

// Initial state
const initialState: State = {
  formValues: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
  formErrors: {},
};

// Reducer function to manage state updates
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.field]: action.value,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        formErrors: action.errors,
      };
    default:
      return state;
  }
}

export interface PersonalInfoFormReturn {
  formState: State;
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  isLoadingUserSession: boolean;
}

// Custom hook to handle personal information form logic
export function usePersonalInfoForm(): PersonalInfoFormReturn {
  const {
    data: user,
    isPending: isLoadingUserSession,
    refetch: refetchUser,
    isFetched,
  } = useSessionUser();

  // Ensure current user ID is available before proceeding with form logic
  const currentUserId = isFetched && user?.id;

  const initialFormValues: FormValues = {
    email: (isFetched && user?.email) || '',
    firstName: (isFetched && user?.first_name) || '',
    lastName: (isFetched && user?.last_name) || '',
    phoneNumber: (isFetched && user?.phone) || '',
  };

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    formValues: initialFormValues,
  });

  const [toastOpen, setToastOpen] = useState(false);
  const {
    mutate: submitChanges,
    isSuccess,
    isError,
    isPending,
  } = useUpdateUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FIELD', field: name as keyof FormValues, value });
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!state.formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(state.formValues.email)) {
      errors.email = 'Invalid email address';
    }

    dispatch({ type: 'SET_ERRORS', errors });
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate() && currentUserId !== undefined) {
      submitChanges(
        {
          attributes: {
            first_name: state.formValues.firstName,
            last_name: state.formValues.lastName,
            phone: state.formValues.phoneNumber,
            email: state.formValues.email,
          },
          id: currentUserId as string,
        },
        {
          onSuccess: () => {
            refetchUser();
          },
          onSettled: () => {
            setToastOpen(true);
          },
        },
      );
    }
  };

  return {
    formState: state,
    toastOpen,
    setToastOpen,
    handleChange,
    handleSubmit,
    isSuccess,
    isError,
    isPending,
    isLoadingUserSession,
  };
}
