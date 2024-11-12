import { colors } from "@/theme/theme";
import { BaseButtonProps } from "@/types/base-button-props.interface";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import merge from "lodash.merge"; // Import lodash's merge utility
import React, { FC, MouseEventHandler, useMemo } from "react";
import ParagraphText from "../../typography/ParagraphText";

export interface TextButtonProps extends BaseButtonProps {
  fullWidth?: boolean;
  textColor?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonProps["type"];
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
  textProps?: Record<string, any>; // Extend textProps as needed
  href?: string;
}

const TextButton: FC<TextButtonProps> = (props) => {
  const {
    fullWidth,
    textColor = "#212121",
    backgroundColor = "transparent",
    text,
    onClick = () => console.log("onclick inside of contained button"),
    isLoading,
    disabled,
    textProps = {}, // This will now be an empty object by default
    type = "button",
    textComponent: TextComponent = ParagraphText, // Default to ParagraphText
    sx = {},
    href,
    ...rest
  } = props;

  // Define default textProps
  const defaultTextProps = {
    sx: {
      color: disabled ? colors.gray600 : textColor,
      fontWeight: "bold",
      backgroundOpacity: disabled ? 60 : undefined,
    },
  };

  // Merge passed textProps with defaultTextProps
  const mergedTextProps = useMemo(
    () => merge({}, defaultTextProps, textProps),
    [textProps, defaultTextProps],
  );

  // Define default button styles
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

  // Merge default button styles with custom styles
  const mergedStyles = useMemo(
    () => merge({}, defaultStyles, sx),
    [sx, defaultStyles],
  );

  return (
    <Button
      sx={mergedStyles}
      variant="text"
      onClick={onClick}
      href={href}
      fullWidth={fullWidth}
      disableElevation={true}
      disabled={isLoading || disabled}
      {...rest}
      type={type}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextComponent {...mergedTextProps}>{text}</TextComponent>
      )}{" "}
    </Button>
  );
};

export default TextButton;
