import { Typography, TypographyProps } from '@mui/material';
import { Manrope } from 'next/font/google';
import React, { FC, useMemo } from 'react';
import merge from 'lodash.merge'; // You can use lodash's merge utility
import useMergeStyles from '@/hooks/useMergeStyles.hook';

// Load the Manrope Regular font
const manrope = Manrope({
  weight: '400', // Regular
  subsets: ['latin'],
});

interface ParagraphTextProps extends TypographyProps {
  sx?: any; // Define sx as optional
}

const ParagraphText: FC<ParagraphTextProps> = (props: ParagraphTextProps) => {
  const { children, className, sx = {}, ...rest } = props;
  
  const mergedStyles = useMergeStyles(   {fontSize: {
    xs: '14px', // Font size for extra-small screens
    sm: '16px', // Font size for small screens and up
    md: '16px', // Font size for medium screens and up
    lg: '16px', // Font size for large screens and up
  },
  '& a': {
    color: 'black', // Set the color to black
    textDecoration: 'underline',
  }}, sx)

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
