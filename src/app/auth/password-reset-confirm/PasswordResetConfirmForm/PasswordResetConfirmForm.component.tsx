'use client'
import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
} from '@mui/material';
import Link from 'next/link';
import { routePaths } from '@/types/routes.enum';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import CardWithTitle from '@/components/design-system/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/design-system/molecules/forms/SecureTextInputGroup';

const PasswordResetConfirmForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Submit the new password to the server here.
    // Example: await submitNewPassword(newPassword);

    setSubmitted(true);
  };

  return (
    <CardWithTitle titleProps={{ text: "Password Reset" }}>
      {submitted ? (
        <Typography variant="body1" align="center">
          Your password has been successfully reset. You can now log in with your new password.
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <SecureTextInputGroup
            label="New Password"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            error={Boolean(error && newPassword === '')}
            helperText={error && newPassword === '' ? error : ''}
            fullWidth
            securePressOnChange={() => setNewPassword('')}
            handleOnMouseDown={(event) => event.preventDefault()}
          />
          <SecureTextInputGroup
            label="Confirm New Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(error && confirmPassword === '')}
            helperText={error && confirmPassword === '' ? error : ''}
            fullWidth
            securePressOnChange={() => setConfirmPassword('')}
            handleOnMouseDown={(event) => event.preventDefault()}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Box sx={{ marginTop: 2 }}>
            <ContainedButton
              type="submit"
              text={"Reset Password"}
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
        <Link href={routePaths.LOGIN}>
          Back to Login
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );
};

export default PasswordResetConfirmForm;