import { TypographyProps } from "@mui/material";

export interface BaseTypographyProps extends TypographyProps {
  sx?: Record<string, any>; // Optional style object
  className?: string;
}
