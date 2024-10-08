import { BaseButtonProps } from "@/types/base-button-props.interface";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import merge from "lodash.merge"; // Import lodash's merge utility
import Link from "next/link";
import React, { FC, useMemo } from "react";
import ParagraphText from "../../typography/ParagraphText";

interface ContainedButtonProps extends BaseButtonProps {
  fullWidth?: boolean;
  textColor?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: ButtonProps["type"];
  startIcon?: React.ReactNode;
  textProps?: Record<string, any>; // Style for the text component
  endIcon?: React.ReactNode;
  sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
  textComponent?: React.ElementType; // Allow dynamic text component
  href?: string;
}

const ContainedButton: FC<ContainedButtonProps> = (props) => {
  const {
    fullWidth,
    textColor = "white",
    backgroundColor = "#212121",
    text,
    onClick,
    isLoading,
    disabled,
    textProps = {
      sx: {
        color: textColor ?? "white",
      },
    }, // Add default empty textStyle
    sx = {},
    textComponent: TextComponent = ParagraphText, // Default to ParagraphText
    ...rest
  } = props;

  // Define default styles
  const defaultStyles = useMemo(
    () => ({
      borderRadius: 3,
      textTransform: "initial",
      backgroundColor: backgroundColor,
      color: textColor,
      "&:hover": {
        backgroundColor: backgroundColor,
      },
    }),
    [backgroundColor, textColor],
  );

  // Merge default styles with custom styles
  const mergedStyles = useMemo(
    () => merge({}, defaultStyles, sx),
    [sx, defaultStyles],
  );

  return (
    <Button
      sx={mergedStyles}
      variant="contained"
      onClick={onClick}
      fullWidth={fullWidth}
      disableElevation={true}
      disabled={isLoading || disabled}
      type="button"
      LinkComponent={Link}
      {...rest}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextComponent fontSize={14} {...textProps}>
          {text}
        </TextComponent>
      )}
    </Button>
  );
};

export default ContainedButton;
