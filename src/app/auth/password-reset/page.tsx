
import React from 'react';
import { Box, Container } from '@mui/material';
import ResetPasswordForm from './ResetPasswordForm';

const PasswordResetPage: React.FC = () => {
  return (
    <>
  
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
        
        >
            <ResetPasswordForm />
   
        </Box>
      </Container>
    </Box>
    </>

  );
};

export default PasswordResetPage;
