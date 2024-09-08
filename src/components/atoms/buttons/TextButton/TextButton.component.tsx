import React, { FC, useMemo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import merge from 'lodash.merge'; // Import lodash's merge utility
import { BaseButtonProps } from '@/types/base-button-props.interface';
import ParagraphText from '../../typography/ParagraphText';

export interface TextButtonProps extends BaseButtonProps {
    fullWidth?: boolean;
    textColor?: string;
    backgroundColor?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: ButtonProps['type']
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
}

const TextButton: FC<TextButtonProps> = (props) => {
    const {
        fullWidth,
        textColor = '#212121',
        backgroundColor = 'transparent',
        text,
        onClick = () => console.log('onclick inside of contained button'),
        isLoading,
        disabled,
        textProps = {
            sx: {
              color: "#212121",
              fontWeight: "bold"
            }
        }, // Add default empty textStyle
        type ='button',
        textComponent: TextComponent = ParagraphText, // Default to ParagraphText
        sx = {},
        ...rest
    } = props
    // Define default styles
    const defaultStyles = useMemo(() => ({
        borderRadius: 3,
        textTransform: 'initial',
        backgroundColor: backgroundColor,
        color: textColor,
        '&:hover': {
            backgroundColor: backgroundColor,
        },
    }), [backgroundColor, textColor]);

    // Merge default styles with custom styles
    const mergedStyles = useMemo(() => merge({}, defaultStyles, sx), [sx, defaultStyles]);

    return (
        <Button
            sx={mergedStyles}
            variant="text"
            onClick={onClick}
         
            fullWidth={fullWidth}
            disableElevation
            disabled={isLoading || disabled}
            {...rest}
            type={type}
        >
   {isLoading ? <CircularProgress size={20} /> : (
        <TextComponent {...textProps}>{text}</TextComponent>
      )}        </Button>
    );
};

export default TextButton;
