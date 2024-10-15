import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';

/**
 * Props for the LabelText component.
 * @property {string} [htmlFor] - The id of the form field that the label is associated with.
 * @property {string} [className] - Additional CSS classes to apply to the label.
 * @property {React.ReactNode} [children] - The content inside the label, typically text or other elements.
 */
interface LabelTextProps {
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

// Define a styled label component
const StyledLabel = styled('label')(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18), // Equivalent to 'text-lg'
  fontWeight: theme.typography.fontWeightMedium, // Customize further if needed
}));

/**
 * LabelText component that renders a styled label element.
 *
 * It accepts optional `htmlFor`, `className`, and `children` props.
 * - `htmlFor`: Used to associate the label with a form field by the field's id.
 * - `className`: Allows applying additional CSS classes.
 * - `children`: Represents the content inside the label, which is often text.
 *
 * @param {LabelTextProps} props - The props for the LabelText component.
 * @returns {JSX.Element} The rendered label element with the applied props.
 */
export default function LabelText({
  htmlFor,
  className,
  children,
  style = {},
}: LabelTextProps): JSX.Element {
  const labelProps = {} as React.LabelHTMLAttributes<HTMLLabelElement>;

  if (htmlFor) {
    labelProps.htmlFor = htmlFor;
  }

  if (className) {
    labelProps.className = clsx(className);
  }

  return (
    <StyledLabel style={style} {...labelProps}>
      {children}
    </StyledLabel>
  );
}
