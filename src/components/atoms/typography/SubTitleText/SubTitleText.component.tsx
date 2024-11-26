import { Typography, TypographyProps } from '@mui/material';
import { Sora } from 'next/font/google';
import React, { FC, useMemo } from 'react';
import merge from 'lodash.merge'; // Import lodash's merge utility
import { BaseTypographyProps } from '@/types/base-typography-props.interface';

// Load the Sora font with all available weights
const sora = Sora({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

interface SubTitleTextProps extends BaseTypographyProps {
  sx?: any; // Define sx as optional
}

const SubTitleText: FC<SubTitleTextProps> = ({
  children,
  className,
  sx = {},
  fontWeight = '400',
  ...rest
}) => {
  // Define default styles with a default fontWeight of 400
  const defaultStyles = useMemo(
    () => ({
      fontSize: {
        xs: '14px', // Example font size for mobile
        sm: '16px', // Example font size for tablet
        md: '18px', // Example font size for desktop
        lg: '20px', // Example font size for large screens
      },
      fontWeight: '400', // Default font weight
    }),
    [],
  );

  // Merge default styles with custom styles, allowing override with fontWeight prop
  const mergedStyles = useMemo(
    () => merge({}, defaultStyles, sx, { fontWeight }),
    [sx, defaultStyles, fontWeight],
  );

  return (
    <Typography
      className={`${sora.className} ${className}`}
      sx={mergedStyles}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default SubTitleText;
