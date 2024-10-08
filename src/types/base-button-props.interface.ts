import { ButtonProps } from "@mui/material";
import { BaseTypographyProps } from "./base-typography-props.interface";

export interface BaseButtonProps {
  fullWidth?: boolean;
  textColor?: string;
  backgroundColor?: string;
  text?: string | React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  textProps?: BaseTypographyProps;
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | (() => void)
    | undefined;
  textComponent?: React.ElementType; // Allow dynamic text component
  href?: string;
  type?: ButtonProps["type"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: Record<string, unknown>; // Adjust the type of `sx` to be more specific
  target?: React.HTMLAttributeAnchorTarget;
}
