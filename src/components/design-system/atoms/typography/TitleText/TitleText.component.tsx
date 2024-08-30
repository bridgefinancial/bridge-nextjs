import { Typography, TypographyProps } from '@mui/material';
import { Sora } from 'next/font/google';
import React, { FC } from 'react';

// Load the Sora Semi Bold font
const sora = Sora({
  weight: '600', // Semi Bold
  subsets: ['latin'],
});

export interface TitleTextProps extends TypographyProps {}

const TitleText: FC<TitleTextProps> = ({ children, className, ...rest }) => {
  return (
    <Typography className={`${sora.className} ${className}`} {...rest}>
      {children}
    </Typography>
  );
}

export default TitleText;
