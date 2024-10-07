import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { BaseTypographyProps } from "@/types/base-typography-props.interface";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
} from "@mui/material";
import React, { useMemo } from "react";

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
      <DialogTitle
        id={`base-dialog-title-${ariaDescribedBy}`}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Center align the items
        }}
      >
        <ParagraphText sx={{ margin: 0, padding: 0, ...titleStyles }}>
          {titleText}
        </ParagraphText>
        <IconButton onClick={() => onClose()}>
          <CloseOutlined />
        </IconButton>
      </DialogTitle>

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
