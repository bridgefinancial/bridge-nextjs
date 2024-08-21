
import React from 'react';
import { Box, Container } from '@mui/material';
import PasswordResetConfirmForm from './PasswordResetConfirmForm';

const PasswordResetConfirmPage: React.FC = () => {
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
          <PasswordResetConfirmForm />

        </Box>
      </Container>
    </Box>
    </>

  );
};

export default PasswordResetConfirmPage;
