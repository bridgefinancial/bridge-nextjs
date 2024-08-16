import React from 'react';
import {SignUpForm} from './SignUpForm/SignUpForm.component';
import { Box, Container } from '@mui/material';

const SignUpPage: React.FC = () => {
  return (

    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <SignUpForm />
        </Box>
      </Container>
    </Box>

  );
};

export default SignUpPage;
