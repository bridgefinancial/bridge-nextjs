import { colors } from '@/theme/theme';
import { FilledTextFieldProps, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

interface TextInputProps extends Partial<FilledTextFieldProps> {}

export default function TextInputGroup(props: TextInputProps) {
  const {
    label,
    name,
    value,
    margin = "normal",
    onChange,
    error,
    fullWidth,
    helperText
  } = props;

  return (
    <TextField
      sx={{
        // Styles for the filled text field underline
        '& .MuiFilledInput-underline:before': {
          borderBottomColor: "rgba(0, 0, 0, .5);"
        },
        '& .MuiFilledInput-underline:hover:before': {
          borderBottomColor: colors.bridgeLightPurple, // Color on hover
        },
        '& .MuiFilledInput-underline:after': {
          borderBottomColor: colors.bridgeDarkPurple, // Color when focused
        },
        // Styles for the label
        '& .MuiFormLabel-root': {
          color: "rgba(0, 0, 0, .4);"
        },
        '& .MuiFormLabel-root.Mui-focused': {
          color: colors.bridgeDarkPurple, // Label color when focused
        }
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
    />
  );
}
