import { colors } from '@/theme/theme';
import { FilledTextFieldProps, TextField } from '@mui/material';
import React from 'react';

interface TextInputProps extends Partial<FilledTextFieldProps> {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // Ensure correct typing here

  shrinkLabel?: boolean; // Adding shrinkLabel prop to control the label's shrink behavior
}

function TextInputGroup(props: TextInputProps) {
  const {
    label,
    name,
    value,
    margin = 'none',
    onChange,
    error,
    fullWidth,
    helperText,
    shrinkLabel, // Access the shrinkLabel prop
    ...otherProps
  } = props;

  return (
    <TextField
      sx={{
        // Styles for the filled text field underline
        '& .MuiFilledInput-underline:before': {
          borderBottomColor: 'rgba(0, 0, 0, .5);',
        },
        '& .MuiFilledInput-underline:hover:before': {
          borderBottomColor: colors.bridgeLightPurple, // Color on hover
        },
        '& .MuiFilledInput-underline:after': {
          borderBottomColor: colors.bridgeDarkPurple, // Color when focused
        },
        // Styles for the label
        '& .MuiFormLabel-root': {
          color: 'rgba(0, 0, 0, .4);',
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: colors.bridgeDarkPurple, // Label color when focused
        },
      }}
      label={label}
      variant="filled"
      fullWidth={fullWidth}
      margin={margin}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputLabelProps={{
        shrink: shrinkLabel, // Use the shrinkLabel prop to control label shrinking
      }}
      {...otherProps}
    />
  );
}
export default TextInputGroup;
