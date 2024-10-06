import { formReducer, FormState } from "@/reducers/form.reducer";
import { useUpdateCompany } from "@/services/companies.service";
import { useIndustries } from "@/services/industries.service";
import { useSessionUser } from "@/services/users.service";
import { Industry } from "@/types/industries.types";
import { Company } from "@/types/users.types";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";
import { isEmpty } from "lodash";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

// Define form-related interfaces and types
interface FormValues {
  businessName: string;
  industry: string;
}

const initialState: FormState<FormValues> = {
  formValues: {
    businessName: "",
    industry: "",
  },
  formErrors: {},
};

// Define the return type for useCompanyForm hook
export interface UseCompanyFormReturn {
  formState: FormState<FormValues>;
  toastOpen: boolean;
  setToastOpen: Dispatch<SetStateAction<boolean>>;
  industries: Industry[];
  onIndustryChange: (
    event: SyntheticEvent<Element, Event>,
    value: Industry | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Industry>,
  ) => void;
  isSuccess: boolean;
  isError: boolean;
  isPending: boolean;
  currentCompanyIndustry: Industry | undefined;
  handleTextInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// Custom hook to manage company form, industries, and updates
export function useCompanyForm(): UseCompanyFormReturn {
  const {
    data: user,
    isPending: isLoadingUserSession,
    refetch: refetchUser,
    isFetched: isUserFetched,
  } = useSessionUser();
  
  const { data: industriesData, isLoading: isLoadingIndustries } = useIndustries();
  
  const currentCompanyId = useMemo(() => isUserFetched ? user?.company?.id : undefined, [isUserFetched, user]);
  
  const currentCompanyIndustry = useMemo(() => isUserFetched ? user?.company?.industry : undefined, [isUserFetched, user?.company?.industry]);

  const userIsLoaded = !isLoadingUserSession && !isEmpty(user);
  
  const [state, dispatch] = useReducer(formReducer<FormValues>, initialState);
  const [toastOpen, setToastOpen] = useState(false);
  
  const { mutate: submitChanges, isSuccess, isError, isPending } = useUpdateCompany();
 

  // Set initial form values based on fetched user data
  useEffect(() => {
    if (userIsLoaded && currentCompanyIndustry) {
      dispatch({
        type: "RESET_FORM",
        values: {
          businessName: user?.company?.name || "",
          industry: currentCompanyIndustry.id || "",
        },
      });
    }
  }, [userIsLoaded, currentCompanyIndustry, user?.company?.name]);
  
  // Handle industry selection change
  const onIndustryChange = (
    event: SyntheticEvent<Element, Event>,
    value: Industry | null
  ) => {
    if (value && value.id) {
      dispatch({ type: "SET_FIELD", field: "industry", value: value.id });
    } else {
      dispatch({ type: "SET_FIELD", field: "industry", value: "" });
    }
  };
  
  // Handle text input change
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name as keyof FormValues, value });
  };
  
  // Validate form fields
  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormValues, string>> = {};
    if (!state.formValues.businessName) {
      errors.businessName = "Business name is required";
    }
    if (!state.formValues.industry) {
      errors.industry = "Industry is required";
    }
    dispatch({ type: "SET_ERRORS", errors });
    return isEmpty(errors);
  };
  
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate() && currentCompanyId && industriesData?.results.length) {
      const selectedIndustry = industriesData.results.find(
        (ind) => ind.id === state.formValues.industry
      );
      
      if (!selectedIndustry) {
        console.error("Selected industry not found.");
        return;
      }
      
      const companyUpdate: Partial<Company> = {
        name: state.formValues.businessName,
        industry: selectedIndustry.id as any,
      };
      
      submitChanges(
        { attributes: companyUpdate, id: currentCompanyId },
        {
          onSuccess: () => {
            refetchUser();
            setToastOpen(true);
          },
          onError: (error: any) => {
            console.error("Failed to update company:", error);
          },
        }
      );
    }
  };
  
  return {
    formState: state,
    toastOpen,
    setToastOpen,
    industries: industriesData?.results || [],
    isSuccess,
    isError,
    isPending,
    currentCompanyIndustry,
    handleTextInputChange,
    handleSubmit,
    onIndustryChange,
  };
}
