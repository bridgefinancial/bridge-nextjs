"use client";
import React, { useState, MouseEvent } from "react";
import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import CardWithTitle from "@/components/molecules/cards/CardWithTitle";
import SecureTextInputGroup from "@/components/molecules/forms/SecureTextInputGroup";
import TextInputGroup from "@/components/molecules/forms/TextInputGroup";
import { externalUrls, routePaths } from "@/types/routes.enum";
import Link from "next/link";
import {
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import { SignUpRequest, useSignUp } from "@/services/users.service";
import { useIndustries } from "@/services/industries.service";
import { Industry } from "@/types/industries.types";

interface SignUpFormProps {
  title?: string;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ title }) => {
  // STATE
  const [formValues, setFormValues] = useState<SignUpRequest>({
    first_name: "",
    last_name: "",
    company_name: "",
    industry: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIndustry, setSelectedIndustry] = useState<
    Industry | undefined
  >();
  const [isPasswordTextSecure, setIsPasswordTextSecure] =
    useState<boolean>(true); // State to manage secure text visibility

  // QUERIES
  const { data: industries } = useIndustries();

  // MUTATIONS
  const { mutateAsync: signUp, isPending } = useSignUp();

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    setErrors((prev) => {
      return { ...prev, [name]: "" };
    });
  };

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.first_name) {
      newErrors["first_name"] = "First name is required";
    }
    if (!formValues.last_name) {
      newErrors["last_name"] = "Last name is required";
    }
    if (!formValues.company_name) {
      newErrors["company_name"] = "Company name is required";
    }
    if (!formValues.industry) {
      newErrors["industry"] = "Industry is required";
    }
    if (!formValues.email) {
      newErrors["email"] = "Email is required";
    }
    if (!formValues.password) {
      newErrors["password"] = "Password is required";
    } else if (formValues.password.length < 8) {
      newErrors["password"] = "Password must be at least 8 characters";
    } else if (!/\d/.test(formValues.password)) {
      newErrors["password"] =
        "Password must have at least 1 number and 1 special character";
    }
    if (!formValues.terms) {
      newErrors["terms"] = "Must accept terms";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isPending) {
      return;
    }
    if (checkFormValidity()) {
      signUp(formValues, {
        onSuccess: () => {},
        onError: (err) => {
          setErrors((prev) => {
            return { ...prev, submit: err.message };
          });
        },
      });
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
    <CardWithTitle titleProps={{ text: "Sign Up" }}>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="First Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="first_name"
          value={formValues.first_name}
          onChange={handleChange}
          error={Boolean(errors && errors.first_name)}
          helperText={errors?.first_name}
          onBlur={handleBlur}
        />
        <TextInputGroup
          label="Last Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="last_name"
          value={formValues.last_name}
          onChange={handleChange}
          error={Boolean(errors && errors.last_name)}
          helperText={errors?.last_name}
          onBlur={handleBlur}
        />
        <TextInputGroup
          label="Business Name"
          variant="filled"
          fullWidth
          margin="normal"
          name="company_name"
          value={formValues.company_name}
          onChange={handleChange}
          error={Boolean(errors && errors.company_name)}
          helperText={errors?.company_name}
          onBlur={handleBlur}
        />
        <Autocomplete
          options={industries?.results ?? []}
          getOptionLabel={(industry) => industry.name}
          disableClearable
          value={selectedIndustry}
          onChange={(e, value) => {
            setFormValues((prev) => {
              return { ...prev, industry: value.id.toString() };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Industry"
              variant="filled"
              fullWidth
              margin="normal"
              name="industry"
              onChange={handleChange}
              error={Boolean(errors && errors.industry)}
              helperText={errors?.industry}
              onBlur={handleBlur}
              inputProps={{ ...params.inputProps }}
            />
          )}
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
          onBlur={handleBlur}
        />
        <SecureTextInputGroup
          label="Password"
          fullWidth
          margin="normal"
          name="password"
          value={formValues.password}
          disabled={isPending}
          onChange={handleChange}
          error={Boolean(errors && errors.password)}
          helperText={errors?.password}
          isSecure={isPasswordTextSecure}
          securePressOnChange={handleSecurePressOnChange}
          handleOnMouseDown={handleOnMouseDownForSecure}
          onBlur={handleBlur}
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
            <ParagraphText
              component="p"
              sx={{ fontSize: { xs: 14, md: 14, lg: 14 } }}
            >
              I accept the Bridge{" "}
              <Link
                legacyBehavior={true}
                target="_blank"
                href={externalUrls.TERMS_OF_SERVICE}
              >
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
        {errors?.submit && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.submit}
          </Typography>
        )}
        <Box sx={{ marginTop: 3 }}>
          <ContainedButton
            type={"submit"}
            text="Sign Up"
            fullWidth
            sx={{ padding: 1.5 }}
            isLoading={isPending}
          />
        </Box>
      </form>
      <ParagraphText align="center" sx={{ marginTop: 3 }}>
        Already have an account?{" "}
        <Link href={routePaths.LOGIN} color="primary">
          Log In
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );
};
