import { BaseButtonProps } from '@/types/base-button-props.interface';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import merge from 'lodash.merge'; // Import lodash's merge utility
import Link from 'next/link';
import React, { FC, useMemo } from 'react';
import ParagraphText from '../../typography/ParagraphText';

export interface ContainedButtonProps extends BaseButtonProps {
  fullWidth?: boolean;
  textColor?: string;
  backgroundColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: ButtonProps['type'];
  startIcon?: React.ReactNode;
  textProps?: Record<string, any>; // Style for the text component
  endIcon?: React.ReactNode;
  sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
  textComponent?: React.ElementType; // Allow dynamic text component
  href?: string;
}

const ContainedButton: FC<ContainedButtonProps> = (props) => {
  const {
    fullWidth = false,
    textColor = 'white',
    backgroundColor = '#212121',
    text,
    onClick = () => {},
    isLoading = false,
    type = 'button',
    disabled = false,
    textProps = {}, // Start with an empty object
    sx = {},
    textComponent: TextComponent = ParagraphText, // Default to ParagraphText
    ...rest
  } = props;

  // Define default textProps
  const defaultTextProps = {
    sx: {
      color: textColor ?? 'white',
    },
  };

  // Merge default textProps with user-provided textProps
  const mergedTextProps = useMemo(
    () => merge({}, defaultTextProps, textProps),
    [textProps, defaultTextProps]
  );

  // Define default button styles
  const defaultStyles = useMemo(
    () => ({
      borderRadius: 3,
      textTransform: 'initial',
      backgroundColor: backgroundColor,
      color: textColor,
      '&:hover': {
        backgroundColor: backgroundColor,
      },
    }),
    [backgroundColor, textColor]
  );

  // Merge default button styles with custom styles
  const mergedStyles = useMemo(
    () => merge({}, defaultStyles, sx),
    [sx, defaultStyles]
  );

  return (
    <Button
      sx={mergedStyles}
      variant="contained"
      onClick={onClick}
      fullWidth={fullWidth}
      disableElevation={true}
      disabled={isLoading || disabled}
      type={type}
      LinkComponent={Link}
      {...rest}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <TextComponent fontSize={14} {...mergedTextProps}>
          {text}
        </TextComponent>
      )}
    </Button>
  );
};

export default ContainedButton;
