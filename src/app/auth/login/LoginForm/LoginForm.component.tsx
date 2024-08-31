"use client";

import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import TextInputGroup from '@/components/design-system/molecules/forms/TextInputGroup';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import CardWithTitle from '@/components/design-system/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/design-system/molecules/forms/SecureTextInputGroup';
import { routePaths } from '@/types/routes.enum';
import Link from 'next/link';
import { LoginDto, useAuth } from '@/providers/Auth.provider';

const LoginForm: React.FC = () => {
  const { state: userState, login } = useAuth();
  const { loading, errors } = userState;
  
  const [formValues, setFormValues] = useState<LoginDto>({
    email: '',
    password: '',
  });

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

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    login(formValues, () => {
      // callback logic here, 
      // could be a redirect
    });
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
          disabled={loading}
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(errors && errors.email)}
          helperText={errors?.email}
        />
        <SecureTextInputGroup
          label="Password"
          fullWidth
          margin={"normal"}
          name="password"
          value={formValues.password}
          disabled={loading}
          onChange={handleChange}
          error={Boolean(errors && errors.password)}
          helperText={errors?.password}
          isSecure={isPasswordTextSecure}
          securePressOnChange={handleSecurePressOnChange}
          handleOnMouseDown={handleOnMouseDown}
        />

        <ParagraphText variant="body2" align="left" sx={{ mt: 3, mb: 3 }}>
          <Link href={routePaths.PASSWORD_RESET} color="primary">
            Forgot my password
          </Link>
        </ParagraphText>

        <ContainedButton type={"submit"} isLoading={loading} fullWidth text={"Login"} />
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
