import { TypographyProps } from "@mui/material";

export interface BaseTypographyProps extends TypographyProps {
  sx?: Record<string, unknown> // Optional style object
  className?: string;
}
