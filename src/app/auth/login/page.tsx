import { Box, Container } from '@mui/material';
import React, { Suspense } from 'react';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Suspense>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box>
            <LoginForm />
          </Box>
        </Container>
      </Box>
    </Suspense>
  );
};

export default LoginPage;
