'use client'
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Typography,
  Box,
} from '@mui/material';

interface SignUpFormProps {
  title?: string;
}



// 1 of 1 error

// Unhandled Runtime Error

// Error: The default export is not a React Component in page: "/auth/sign-up"

// Call Stack
// Next.js

export const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    industry: '',
    email: '',
    password: '',
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    industry: '',
    email: '',
    password: '',
    terms: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validate = () => {
    let errors: any = {};

    if (!formValues.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!formValues.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!formValues.businessName) {
      errors.businessName = 'Business name is required';
    }

    if (!formValues.industry) {
      errors.industry = 'Industry is required';
    }

    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }

    if (!formValues.terms) {
      errors.terms = 'You must accept the terms and conditions';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission logic here
      console.log(formValues);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="firstName"
          value={formValues.firstName}
          onChange={handleChange}
          error={Boolean(formErrors.firstName)}
          helperText={formErrors.firstName}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="lastName"
          value={formValues.lastName}
          onChange={handleChange}
          error={Boolean(formErrors.lastName)}
          helperText={formErrors.lastName}
        />
        <TextField
          label="Business name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="businessName"
          value={formValues.businessName}
          onChange={handleChange}
          error={Boolean(formErrors.businessName)}
          helperText={formErrors.businessName}
        />
        <TextField
          label="Industry"
          variant="outlined"
          fullWidth
          margin="normal"
          name="industry"
          value={formValues.industry}
          onChange={handleChange}
          error={Boolean(formErrors.industry)}
          helperText={formErrors.industry}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
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
            <>
              I accept the Bridge{' '}
              <Link href="/terms-of-service" color="primary">
                Terms of Service
              </Link>
            </>
          }
        />
        {formErrors.terms && (
          <Typography variant="body2" color="error" sx={{ mt: -2, mb: 2 }}>
            {formErrors.terms}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2, padding: 1.5 }}
        >
          Sign up
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
        Already have an account?{' '}
        <Link href="/login" color="primary">
          Log In
        </Link>
      </Typography>
    </Box>
  );
};

