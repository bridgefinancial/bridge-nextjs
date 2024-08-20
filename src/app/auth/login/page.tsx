
import React from 'react';
import { Box, Container } from '@mui/material';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (

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
            <LoginForm />
   
        </Box>
      </Container>
    </Box>

  );
};

export default LoginPage;
