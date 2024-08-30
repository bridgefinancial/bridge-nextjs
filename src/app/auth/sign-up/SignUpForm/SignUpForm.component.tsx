'use client'
import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import { externalUrls, routePaths } from '@/types/routes.enum';
import Link from 'next/link'
import CardWithTitle from '@/components/design-system/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/design-system/molecules/forms/SecureTextInputGroup';
import TextInputGroup from '@/components/design-system/molecules/forms/TextInputGroup';

interface SignUpFormProps {
  title?: string;
}

// Define a type for form values


// Define a type for form errors
interface FormErrors {
  firstName: string;
  lastName: string;
  businessName: string;
  industry: string;
  email: string;
  password: string;
  terms: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ title }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    businessName: '',
    industry: '',
    email: '',
    password: '',
    terms: false,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    businessName: '',
    industry: '',
    email: '',
    password: '',
    terms: '',
  });
  const [isPasswordTextSecure, setIsPasswordTextSecure] = useState<boolean>(true); // State to manage secure text visibility
  const [isLoading, setLoading] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try{
    e.preventDefault();
    const errors = validate();
    if (Object.values(errors).every(error => !error)) {
      // Handle form submission logic here
      console.log('Form submitted:', formValues);
    }
  }catch{

    } finally{
      setLoading(false)
    }
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
    <CardWithTitle titleProps={{ text: "Login" }}>

        <form onSubmit={handleSubmit}>
          <TextInputGroup
            label="First Name"
            variant="filled"
            fullWidth
            margin="normal"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            error={Boolean(formErrors.firstName)}
            helperText={formErrors.firstName}
          />
          <TextInputGroup
            label="Last Name"
            variant="filled"
            fullWidth
            margin="normal"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            error={Boolean(formErrors.lastName)}
            helperText={formErrors.lastName}
          />
          <TextInputGroup
            label="Business Name"
            variant="filled"
            fullWidth
            margin="normal"
            name="businessName"
            value={formValues.businessName}
            onChange={handleChange}
            error={Boolean(formErrors.businessName)}
            helperText={formErrors.businessName}
          />
          <TextInputGroup
            label="Industry"
            variant="filled"
            fullWidth
            margin="normal"
            name="industry"
            value={formValues.industry}
            onChange={handleChange}
            error={Boolean(formErrors.industry)}
            helperText={formErrors.industry}
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
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
          />
          <SecureTextInputGroup
          label="Password"
          fullWidth
          margin={"normal"}
          name="password"
          value={formValues.password}
          disabled={isLoading}
          onChange={handleChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
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
              <ParagraphText component={"p"} sx={{ 
                fontSize: {
                  xs: 14,
                  md: 14,
                  lg: 14, 

                }
               }}>
                I accept the Bridge{' '}
                <Link legacyBehavior={true} target='_blank' href={externalUrls.TERMS_OF_SERVICE}>
                  Terms of Service
                </Link>
              </ParagraphText>
            }
          />
          {formErrors.terms && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {formErrors.terms}
            </Typography>
          )}
          <Box sx={{ marginTop: 3 }}>
            <ContainedButton
              text="Sign Up"
              fullWidth
              sx={{ padding: 1.5 }}
            />
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
