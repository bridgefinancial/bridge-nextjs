"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { BaseButtonProps } from "@/types/base-button-props.interface";
import { BaseTypographyProps } from "@/types/base-typography-props.interface";

interface OnActionProps extends BaseButtonProps {
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
  sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
  target?: React.HTMLAttributeAnchorTarget;
}

export interface ToastNotificationProps {
  message: string | React.ReactNode;
  severity: "error" | "warning" | "info" | "success";
  open: boolean;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((open: boolean) => void);
  autoHideDuration?: number;
  autoHideDisabled?: boolean; // New prop to control auto-hide behavior
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  onActionProps?: OnActionProps; // Optional props for rendering an additional action button with text and icon
}

const ToastNotification: React.FC<ToastNotificationProps> = (
  props: ToastNotificationProps,
) => {
  const {
    message,
    severity = "success",
    open = false,
    setOpen = () => console.log("no set open"),
    autoHideDuration = 10000,
    autoHideDisabled = false, // Default value for the new prop
    anchorOrigin = { vertical: "bottom", horizontal: "right" },
    onActionProps,
  } = props;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDisabled ? null : autoHideDuration} // Disable auto-hide when autoHideDisabled is true
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "fit-content", // Automatically adjusts the width based on content
          padding: "8px 16px", // Ensures padding around content and button
          borderRadius: "24px", // Rounded corners for a more circular look
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Optional shadow for better visual
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        action={
          <>
            {onActionProps && (
              <ContainedButton
                onClick={onActionProps.onClick}
                text={onActionProps.text}
              />
            )}
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
              sx={{
                padding: 0,
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CloseIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </>
        }
      >
        {typeof message === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          message
        )}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
