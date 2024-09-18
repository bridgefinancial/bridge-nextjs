import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormHelperText,
  SelectProps,
} from "@mui/material";
import { colors } from "@/theme/theme";

interface SelectInputProps extends Omit<SelectProps, "onChange" | "margin"> {
  options: { value: string | number; label: string }[];
  label: string;
  helperText?: string;
  error?: boolean;
  margin?: "none" | "dense" | "normal"; // Add "normal" here
  onChange: (event: SelectChangeEvent<unknown>) => void; // Use SelectChangeEvent<unknown>
}

const SelectInputGroup: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  fullWidth = false,
  margin = "normal", // Default to "normal" as you intended
  options,
  helperText,
  ...otherProps
}) => {
  return (
    <FormControl
      variant="filled"
      fullWidth={fullWidth}
      margin={margin}
      error={error}
      sx={{
        m: 0,
        minWidth: 100,
        "& .MuiFilledInput-underline:before": {
          borderBottomColor: "rgba(0, 0, 0, .5);",
        },
        "& .MuiFilledInput-underline:hover:before": {
          borderBottomColor: colors.bridgeLightPurple, // Color on hover
        },
        "& .MuiFilledInput-underline:after": {
          borderBottomColor: colors.bridgeDarkPurple, // Color when focused
        },
        "& .MuiFormLabel-root": {
          color: "rgba(0, 0, 0, .4);",
        },
        "& .MuiFormLabel-root.Mui-focused": {
          color: colors.bridgeDarkPurple, // Label color when focused
        },
      }}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
        {...otherProps}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInputGroup;
