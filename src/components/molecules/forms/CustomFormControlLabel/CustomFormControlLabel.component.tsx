import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
} from '@mui/material';
import React, { ReactElement, SyntheticEvent } from 'react';

/**
 * Props for CustomFormControlLabel component.
 * @property {boolean} checked - Determines whether the checkbox is checked.
 * @property {string} name - The name of the checkbox input.
 * @property {string} value - The value of the checkbox input.
 * @property {string} label - The label displayed next to the checkbox.
 * @property {function} onChange - Optional handler for change events (event and checked).
 * @property {string} className - Additional CSS classes.
 * @property {ReactElement} control - Custom control component (e.g., Checkbox, Switch).
 */
export interface CustomFormControlLabelProps
  extends Omit<FormControlLabelProps, 'control'> {
  onChange?: (event: SyntheticEvent<Element, Event>, checked: boolean) => void; // onChange is optional now
  className?: string;
  control?: ReactElement; // Custom control component, default is Checkbox
}

/**
 * CustomFormControlLabel component.
 * A flexible wrapper around FormControlLabel that renders a custom control (e.g., Checkbox) with a label.
 *
 * @param {CustomFormControlLabelProps} props - The props for the CustomFormControlLabel component.
 * @returns {JSX.Element} The rendered FormControlLabel with a custom control.
 */
function CustomFormControlLabel({
  checked,
  name,
  value,
  label,
  onChange = () => {}, // No-op default if onChange is not provided
  control = <Checkbox />, // Default to Checkbox if no control is passed
  className,
}: CustomFormControlLabelProps): JSX.Element {
  // Custom onChange handler for the control
  const handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event, event.target.checked);
  };

  return (
    <FormControlLabel
      control={React.cloneElement(control, {
        checked,
        onChange: handleControlChange,
        name,
        value,
      })}
      label={label}
      className={className || 'cursor-pointer'}
    />
  );
}

export default CustomFormControlLabel;
