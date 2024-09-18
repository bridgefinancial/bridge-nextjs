"use client";

import React, { useState, ChangeEvent, FormEvent, MouseEvent } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";
import SecureTextInputGroup from "@/components/molecules/forms/SecureTextInputGroup";
import { routePaths } from "@/types/routes.enum";
import Link from "next/link";
import { useLoginUser, useSessionUser } from "@/services/users.service";
import { useAuth } from "@/providers/Auth.provider";
import { useRouter } from "next/navigation";

// Define types for form values and errors
interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

interface LoginFormProps {
  title?: string;
  cardContainerStyles?: Record<any, any>;
}

// STATE

export const LoginForm: React.FC<LoginFormProps> = ({
  title,
  cardContainerStyles = {},
}) => {
  // STATE
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const [isPasswordTextSecure, setIsPasswordTextSecure] =
    useState<boolean>(true); // State to manage secure text visibility

  const {} = useAuth();

  // MUTATIONS
  const { mutateAsync: loginUser, isPending } = useLoginUser();

  const { data: user } = useSessionUser();

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
    const errors: FormErrors = {};

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Invalid email address";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      const formElement = e.target as HTMLFormElement;

      // Create a FormData object from the form element
      const formData = new FormData(formElement);
      loginUser({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
    }
  };

  return (
    <CardWithTitle
      containerStyle={cardContainerStyles}
      titleProps={{ text: "Login" }}
    >
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="Email"
          type="email"
          fullWidth={true}
          margin="normal"
          name="email"
          disabled={isPending}
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(formErrors && formErrors.email)}
          helperText={formErrors?.email}
        />
        <SecureTextInputGroup
          label="Password"
          fullWidth={true}
          margin={"normal"}
          name="password"
          value={formValues.password}
          disabled={isPending}
          onChange={handleChange}
          error={Boolean(formErrors && formErrors.password)}
          helperText={formErrors?.password}
          isSecure={isPasswordTextSecure}
          securePressOnChange={handleSecurePressOnChange}
          handleOnMouseDown={handleOnMouseDown}
        />

        <ParagraphText variant="body2" align="left" sx={{ mt: 3, mb: 3 }}>
          <Link href={routePaths.PASSWORD_RESET} color="primary">
            Forgot my password
          </Link>
        </ParagraphText>

        <ContainedButton
          isLoading={isPending}
          fullWidth={true}
          text={"Login"}
          type="submit"
        />
      </form>

      <ParagraphText variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link href={routePaths.SIGN_UP} color="primary">
          Sign Up
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );
};

export default LoginForm;
