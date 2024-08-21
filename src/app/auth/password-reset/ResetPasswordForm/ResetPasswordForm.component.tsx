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
import Link from 'next/link';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import TextInputGroup from '@/components/molecules/forms/TextInputGroup';
import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import CardWithTitle from '@/components/molecules/cards/CardWithTitle';

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
    <CardWithTitle titleProps={{ text: "Password Reset" }}>
        {submitted ? (
          <Typography variant="body1" align="center">
            Please check your email for a password reset link.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextInputGroup
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
              <ContainedButton
              type="submit"
              text={"Send Recovery Link"}
                fullWidth
               />
               </Box>
          </form>
        )}
        <ParagraphText
          variant="body2"
          align="center"
          sx={{ marginTop: 3 }}
        >
          <Link href={routePaths.LOGIN} >
            Back to Login
          </Link>
        </ParagraphText>
    </CardWithTitle>
  );
};

export default ResetPasswordForm;
