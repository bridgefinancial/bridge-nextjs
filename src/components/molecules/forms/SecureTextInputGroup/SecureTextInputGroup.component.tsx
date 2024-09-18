import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { colors } from "@/theme/theme";
import useMergeStyles from "@/hooks/useMergeStyles.hook";

// Define the types for icon components
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface SecureTextInputGroupProps
  extends Omit<TextFieldProps, "variant" | "type"> {
  isSecure?: boolean;
  securePressOnChange: () => void;
  handleOnMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  SecureTextOnIcon?: IconComponent;
  SecureTextOffIcon?: IconComponent;
  sx?: TextFieldProps["sx"];
}

/**
 * `SecureTextInputGroup` is a customizable text input component that allows toggling between showing and hiding the password.
 * It uses MUI's `TextField` component with additional functionality for handling secure text entry.
 *
 * @param {string} label - The label for the input field.
 * @param {string} name - The name attribute of the input field.
 * @param {any} value - The value of the input field.
 * @param {"normal" | "dense" | "none"} [margin="normal"] - The margin property for the input field, defaulting to "normal".
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange - A function to handle the change event.
 * @param {boolean} [error] - If true, the input will be displayed in an error state.
 * @param {boolean} [isSecure=false] - Determines whether the input field should hide the entered text (i.e., treat it as a password).
 * @param {() => void} securePressOnChange - Function that gets called when the visibility toggle button is clicked.
 * @param {(event: React.MouseEvent<HTMLButtonElement>) => void} handleOnMouseDown - Function that gets called on the mouse down event of the visibility toggle button.
 * @param {boolean} [fullWidth] - If true, the input field will take up the full width of its container.
 * @param {string} [helperText] - Helper text to display below the input field.
 * @param {IconComponent} [SecureTextOnIcon=Visibility] - Icon to display when the text is hidden (secure mode), default is `Visibility`.
 * @param {IconComponent} [SecureTextOffIcon=VisibilityOff] - Icon to display when the text is visible (non-secure mode), default is `VisibilityOff`.
 * @param {TextFieldProps['sx']} [sx={}] - Custom styles to apply to the input field.
 * @param {TextFieldProps} rest - Any additional props that can be passed to the MUI `TextField` component.
 *
 * @example
 * <SecureTextInputGroup
 *   label="Password"
 *   name="password"
 *   value={passwordValue}
 *   onChange={handlePasswordChange}
 *   isSecure={isPasswordHidden}
 *   securePressOnChange={togglePasswordVisibility}
 *   handleOnMouseDown={handleMouseDown}
 * />
 *
 * @remarks
 * - `isSecure`: When `true`, the input field will mask the text as a password. The icon displayed will also change accordingly.
 * - `SecureTextOnIcon` and `SecureTextOffIcon` are optional props that allow the developer to pass custom icons for the secure text toggle button. By default, `Visibility` and `VisibilityOff` icons from MUI are used.
 * - The developer is responsible for passing down the `securePressOnChange`, `handleOnMouseDown`, `onChange`, and `SecureOnChange` functions to ensure the component behaves as expected.
 */
const SecureTextInputGroup: React.FC<SecureTextInputGroupProps> = ({
  label,
  name,
  value,
  margin = "normal",
  onChange,
  error,
  securePressOnChange,
  handleOnMouseDown,
  fullWidth,
  isSecure = true,
  helperText,
  SecureTextOnIcon = Visibility,
  SecureTextOffIcon = VisibilityOff,
  sx = {},
  ...rest
}) => {
  const mergedStyles = useMergeStyles(
    {
      "& .MuiFilledInput-underline:before": {
        borderBottomColor: "rgba(0, 0, 0, .5)",
      },
      "& .MuiFilledInput-underline:hover:before": {
        borderBottomColor: colors.bridgeLightPurple, // Color on hover
      },
      "& .MuiFilledInput-underline:after": {
        borderBottomColor: colors.bridgeDarkPurple, // Color when focused
      },
      // Styles for the label
      "& .MuiFormLabel-root": {
        color: "rgba(0, 0, 0, .4)",
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: colors.bridgeDarkPurple, // Label color when focused
      },
    },
    {},
  );

  return (
    <TextField
      sx={mergedStyles}
      label={label}
      variant="filled"
      type={isSecure ? "password" : "text"}
      fullWidth={fullWidth}
      margin={margin}
      name={name}
      value={value}
      autoComplete="current-password"
      onChange={onChange}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={securePressOnChange}
              onMouseDown={handleOnMouseDown}
              edge="end"
              sx={{
                width: "36px", // Set width to create a square button
                height: "36px", // Set height to match the width
                borderRadius: "50%", // Ensure the button is a circle
                padding: "6px", // Optional: Adjust padding as needed to ensure the icon fits nicely
              }}
            >
              {isSecure ? <SecureTextOnIcon /> : <SecureTextOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest} // Spread rest of the props to ensure no props are missed
    />
  );
};

export default SecureTextInputGroup;
