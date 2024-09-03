import { Typography, TypographyProps } from '@mui/material';
import { Sora } from 'next/font/google';
import React, { FC, useMemo } from 'react';
import merge from 'lodash.merge'; // Import lodash's merge utility
import { BaseTypographyProps } from '@/types/base-typography-props.interface';

// Load the Sora Regular font
const sora = Sora({
  weight: '400', // Regular
  subsets: ['latin'],
});

interface SubTitleTextProps extends BaseTypographyProps {
  sx?: any; // Define sx as optional
}

const SubTitleText: FC<SubTitleTextProps> = ({ children, className, sx = {}, ...rest }) => {
  // Define default styles
  const defaultStyles = useMemo(() => ({
    // define default styles later on
  }), []);

  // Merge default styles with custom styles
  const mergedStyles = useMemo(() => merge({}, defaultStyles, sx), [sx, defaultStyles]);

  return (
    <Typography
      className={`${sora.className} ${className}`}
      sx={mergedStyles}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default SubTitleText;
