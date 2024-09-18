"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface OnActionProps {
  icon: React.ReactNode; // Icon to be rendered in the action button
  text: string; // Text to be displayed alongside the icon
  onClick: () => void; // Callback when the action button is clicked
  ariaLabel: string; // Accessible label for the button
}

interface ToastNotificationProps {
  message: string | React.ReactNode;
  severity: "error" | "warning" | "info" | "success";
  open: boolean;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | ((open: boolean) => void);
  autoHideDuration?: number;
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
      autoHideDuration={autoHideDuration}
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
              <Button
                aria-label={onActionProps.ariaLabel}
                color="inherit"
                onClick={onActionProps.onClick}
                startIcon={onActionProps.icon}
                sx={{
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "none", // Prevents text from being all caps
                }}
              >
                {onActionProps.text}
              </Button>
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
