"use client";

import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import TextInputGroup from '@/components/design-system/molecules/forms/TextInputGroup';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import CardWithTitle from '@/components/design-system/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/design-system/molecules/forms/SecureTextInputGroup';
import { routePaths } from '@/types/routes.enum';
import Link from 'next/link';

// Define types for form values and errors
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordTextSecure, setIsPasswordTextSecure] = useState<boolean>(true); // State to manage secure text visibility

  // Handle change in form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Toggle password visibility
  const handleSecurePressOnChange = () => {
    setIsPasswordTextSecure(!isPasswordTextSecure);
  };

  // Handle mouse down event
  const handleOnMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent the button from gaining focus
  };

  // Validate form fields
  const validate = (): boolean => {
    let errors: FormErrors = {
      email: '',
      password: '',
    };

    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log(formValues);
        setIsLoading(false);
        // Handle form submission logic here
      }, 2000);
    }
  };

  return (
    <CardWithTitle titleProps={{ text: "Login" }}>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          disabled={isLoading}
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
          handleOnMouseDown={handleOnMouseDown}
        />

        <ParagraphText variant="body2" align="left" sx={{ mt: 3, mb: 3 }}>
          <Link  href={routePaths.PASSWORD_RESET} color="primary">
            Forgot my password
          </Link>
        </ParagraphText>

        <ContainedButton isLoading={isLoading} fullWidth text={"Login"} />
      </form>

      <ParagraphText variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href={routePaths.SIGN_UP} color="primary">
          Sign Up
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );
};

export default LoginForm;
