'use client'
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { routePaths } from '@/types/routes.enum';
import Link from 'next/link'

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation logic
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }
    
    // Clear error and handle submission
    setError(null);
    setSubmitted(true);
    
    // Handle the password reset logic here
    console.log('Password reset link sent to:', email);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <CardHeader title="Password Reset" />
      <CardContent>
        {submitted ? (
          <Typography variant="body1" align="center">
            Please check your email for a password reset link.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleChange}
              error={Boolean(error)}
              helperText={error}
            />
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Send Recovery Link
              </Button>
            </Box>
          </form>
        )}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 3 }}
        >
          <Link href={routePaths.LOGIN} >
            Back to Login
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
