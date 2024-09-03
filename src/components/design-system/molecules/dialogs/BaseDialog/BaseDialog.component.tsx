import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import TitleText from '@/components/design-system/atoms/typography/TitleText';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import { BaseTypographyProps } from '@/types/base-typography-props.interface';

export interface BaseDialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  titleProps?: {
    titleText: string,
    titleStyles?: BaseTypographyProps
  }
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
    }
  },
  maxWidth = 'sm',
  fullWidth = true,
}) => {
  const {
    titleText,
    titleStyles,
  } = titleProps
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      aria-labelledby="base-dialog-title"
      aria-describedby="base-dialog-description"
    >
      <DialogTitle id="base-dialog-title">
        <ParagraphText
          sx={titleStyles}
        >

        {titleText? titleText: ""}        
        </ParagraphText>

        </DialogTitle>
      <DialogContent dividers>
        <Box id="base-dialog-description" sx={{ pt: 2 }}>
          {children}
        </Box>
      </DialogContent>
      {actions? <DialogActions>{actions}</DialogActions>:null}
    </Dialog>
  );
};

export default BaseDialog;
