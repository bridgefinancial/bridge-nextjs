import React from 'react';
import { Box, Container } from '@mui/material';
import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import CardWithTitle from '@/components/molecules/cards/CardWithTitle';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import Link from 'next/link';
import { routePaths } from '@/types/routes.enum';

const VerifyEmailPage: React.FC = () => {
  return (

    <CardWithTitle titleProps={{ text: "Verify Email" }} >
        <ParagraphText sx={{ 
           fontSize: {
            xs: '13px', // Font size for extra-small screens
            sm: '13px', // Font size for small screens and up
            md: '16px', // Font size for medium screens and up
            lg: '16px', // Font size for large screens and up
          }, 
         }} component={"p"}>
            Your Account email has been verified. <Link href={routePaths.LOGIN}>Click Here</Link> to login
        </ParagraphText>
    </CardWithTitle>
  );
};

export default VerifyEmailPage;
