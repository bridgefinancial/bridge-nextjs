import useMergeStyles from '@/hooks/useMergeStyles.hook';
import React, { forwardRef } from 'react';

// Define enum for gradient directions
export enum GradientDirection {
  TO_RIGHT = 'to right',
  TO_LEFT = 'to left',
  TO_TOP = 'to top',
  TO_BOTTOM = 'to bottom',
  TO_TOP_RIGHT = 'to top right',
  TO_TOP_LEFT = 'to top left',
  TO_BOTTOM_RIGHT = 'to bottom right',
  TO_BOTTOM_LEFT = 'to bottom left',
}

// Create a type from the keys of GradientDirection
export type GradientDirectionType = `${GradientDirection}` | string;

export interface GradientBoxProps {
  colors?: string[]; // Array of colors for the gradient
  direction?: string; // Direction for the gradient
  containerStyle?: React.CSSProperties; // Optional custom styles for the container
  children?: React.ReactNode; // Content inside the GradientBox
}

// Use forwardRef to allow passing an optional ref
const GradientBox = forwardRef<HTMLDivElement, GradientBoxProps>(
  (
    {
      colors = ['#fb9f1e', '#6a5ace', '#6ba0f1'], // Default gradient colors
      direction = GradientDirection.TO_RIGHT, // Default gradient direction
      containerStyle = {}, // Default container styles
      children = <></>,
    },
    ref // The forwarded ref
  ) => {
    // Generate the gradient
    const gradient = `linear-gradient(${direction}, ${colors.join(', ')})`;

    // Merge custom styles with the gradient background and transition
    const styles = useMergeStyles(
      {
        backgroundImage: gradient,
        transition:
          'background-image 0.5s ease-in-out, height 0.5s ease-in-out', // Smooth transition for background and height
      },
      containerStyle as any // Additional container styles
    );

    return (
      <div data-testid="gradient-box" ref={ref} style={styles}>
        {children ? children : null}
      </div>
    );
  }
);

// Set displayName for better debugging
GradientBox.displayName = 'GradientBox';

export default GradientBox;
