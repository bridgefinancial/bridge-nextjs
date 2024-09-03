import { ButtonProps } from "@mui/material";

export interface BaseButtonProps {
    fullWidth?: boolean;
    textColor?: string;
    backgroundColor?: string;
    text?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: ButtonProps['type']
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
}

