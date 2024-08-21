import React, { FC, useMemo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import merge from 'lodash.merge'; // Import lodash's merge utility

interface ContainedButtonProps {
    fullWidth?: boolean;
    textColor?: string;
    backgroundColor?: string;
    text?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    type?: ButtonProps['type']
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    sx?: Record<string, any>; // Adjust the type of `sx` to be more specific
}

const ContainedButton: FC<ContainedButtonProps> = (props) => {
    const {
        fullWidth,
        textColor = 'white',
        backgroundColor = '#212121',
        text,
        onClick = () => console.log('onclick inside of contained button'),
        isLoading,
        disabled,
        type ='button',
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
            variant="contained"
            onClick={onClick}
         
            fullWidth={fullWidth}
            disableElevation
            disabled={isLoading || disabled}
            {...rest}
            type={type}
        >
            {isLoading ? <CircularProgress size={20} /> : text}
        </Button>
    );
};

export default ContainedButton;
