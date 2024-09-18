import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { BaseTypographyProps } from "@/types/base-typography-props.interface";

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | number; // Allow custom pixel values as well
  fullWidth?: boolean;
  titleProps?: {
    titleText: string;
    titleStyles?: BaseTypographyProps;
  };
  paperStyles?: SxProps<Theme>;
  ariaDescribedBy: string; // Required ID for `aria-labelledby`
}

const BaseDialog: React.FC<BaseDialogProps> = ({
  open,
  onClose,
  children,
  actions,
  titleProps = {
    titleText: "",
    titleStyles: {
      fontWeight: 400,
    },
  },
  paperStyles = {},
  maxWidth = "sm",
  fullWidth = false,
  ariaDescribedBy,
}) => {
  const { titleText, titleStyles } = titleProps;
  const memoizedMaxWidth = useMemo(
    () => (typeof maxWidth === "number" ? `${maxWidth}px` : undefined),
    [maxWidth],
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={typeof maxWidth === "number" ? false : maxWidth}
      PaperProps={{
        sx: {
          borderRadius: "20px", // Correctly applying border-radius here
          maxWidth: memoizedMaxWidth,
          ...paperStyles, // Apply any additional styles passed in props
        },
      }}
      fullWidth={fullWidth}
      aria-labelledby={`base-dialog-title-${ariaDescribedBy}`}
      aria-describedby={`base-dialog-description-${ariaDescribedBy}`}
    >
      {titleText && (
        <DialogTitle id={`base-dialog-title-${ariaDescribedBy}`}>
          <ParagraphText sx={titleStyles}>{titleText}</ParagraphText>
        </DialogTitle>
      )}
      <DialogContent dividers={true}>
        <Box id={`base-dialog-description-${ariaDescribedBy}`} sx={{ p: 0.5 }}>
          {children}
        </Box>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default BaseDialog;
