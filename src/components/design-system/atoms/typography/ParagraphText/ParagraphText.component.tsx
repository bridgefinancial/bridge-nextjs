import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { Manrope } from 'next/font/google';
import useMergeStyles from '@/hooks/useMergeStyles.hook';
import { BaseTypographyProps } from '@/types/base-typography-props.interface';

// Load the Manrope Regular font
const manrope = Manrope({
  weight: '400', // Regular
  subsets: ['latin'],
});

const ParagraphText: FC<BaseTypographyProps> = ({ children, className = '', sx = {}, ...rest }) => {
  const defaultStyles = {
    fontSize: {
      xs: '14px', // Font size for extra-small screens (mobile)
      sm: '16px', // Font size for small screens and up (tablets)
      md: '16px', // Font size for medium screens and up (desktop)
      lg: '16px', // Font size for large screens and up
    },
    '& a': {
      color: 'black', // Set the color to black
      textDecoration: 'underline',
    },
    '& p': {
      fontSize: 'inherit', // Ensure p tags inherit this responsive font size
    },
  };

  const mergedStyles = useMergeStyles(defaultStyles, sx);

  return (
    <Typography
      className={`${manrope.className} ${className}`}
      component="p"
      sx={mergedStyles}
      {...rest}
    >
      {children}
    </Typography>
  );
}

export default ParagraphText;
