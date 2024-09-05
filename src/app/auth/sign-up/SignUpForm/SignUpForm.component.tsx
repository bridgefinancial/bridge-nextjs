'use client';
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import CardWithTitle from '@/components/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/molecules/forms/SecureTextInputGroup';
import TextInputGroup from '@/components/molecules/forms/TextInputGroup';
import { externalUrls, routePaths } from '@/types/routes.enum';
import Link from 'next/link';
import { SignUpDto, useAuth } from '@/providers/Auth.provider';
import { FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

interface SignUpFormProps {
  title?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ title }) => {
  const { state: userState, signUp } = useAuth();
  const { errors, loading } = userState;

  const [formValues, setFormValues] = useState<SignUpDto>({
    firstName: '',
    lastName: '',
    businessName: '',
    industry: '',
    email: '',
    password: '',
    terms: false,
  });

  const [isPasswordTextSecure, setIsPasswordTextSecure] = useState<boolean>(true); // State to manage secure text visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    signUp(formValues, () => {
      // some logic here, could be redirect
    });
  };

  // Toggle password visibility
  const handleSecurePressOnChange = () => {
    setIsPasswordTextSecure(!isPasswordTextSecure);
  };

  // Handle mouse down event
  const handleOnMouseDownForSecure = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the button from gaining focus
  };

  return (
    <CardWithTitle titleProps={{ text: 'Sign Up' }}>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="First Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          error={Boolean(errors && errors.firstName)}
          helperText={errors?.firstName}
        />
        <TextInputGroup
          label="Last Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          error={Boolean(errors && errors.lastName)}
          helperText={errors?.lastName}
        />
        <TextInputGroup
          label="Business Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="businessName"
          value={formValues.businessName}
          onChange={handleChange}
          error={Boolean(errors && errors.businessName)}
          helperText={errors?.businessName}
        />
        <TextInputGroup
          label="Industry"
          variant="filled"
          fullWidth
          margin="normal"
          name="industry"
          value={formValues.industry}
          onChange={handleChange}
          error={Boolean(errors && errors.industry)}
          helperText={errors?.industry}
        />
        <TextInputGroup
          label="Email"
          type="email"
          variant="filled"
          fullWidth
          margin="normal"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(errors && errors.email)}
          helperText={errors?.email}
        />
        <SecureTextInputGroup
          label="Password"
          fullWidth
          margin="normal"
          name="password"
          value={formValues.password}
          disabled={loading}
          onChange={handleChange}
          error={Boolean(errors && errors.password)}
          helperText={errors?.password}
          isSecure={isPasswordTextSecure}
          securePressOnChange={handleSecurePressOnChange}
          handleOnMouseDown={handleOnMouseDownForSecure}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={formValues.terms}
              onChange={handleChange}
              color="primary"
            />
          }
          label={
            <ParagraphText component="p" sx={{ fontSize: { xs: 14, md: 14, lg: 14 } }}>
              I accept the Bridge{' '}
              <Link legacyBehavior={true} target="_blank" href={externalUrls.TERMS_OF_SERVICE}>
                Terms of Service
              </Link>
            </ParagraphText>
          }
        />
        {errors?.terms && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.terms}
          </Typography>
        )}
        <Box sx={{ marginTop: 3 }}>
          <ContainedButton
            type={"submit"}
          text="Sign Up" fullWidth sx={{ padding: 1.5 }} />
        </Box>
      </form>
      <ParagraphText align="center" sx={{ marginTop: 3 }}>
        Already have an account?{' '}
        <Link href={routePaths.LOGIN} color="primary">
          Log In
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );
};
