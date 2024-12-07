'use client';
import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import CardWithTitle from '@/components/molecules/cards/CardWithTitle';
import SecureTextInputGroup from '@/components/molecules/forms/SecureTextInputGroup';
import TextInputGroup from '@/components/molecules/forms/TextInputGroup';
import { useIndustries } from '@/services/industries.service';
import { SignUpRequest, useSignUp } from '@/services/users.service';
import { colors } from '@/theme/theme';
import { Industry } from '@/types/industries.types';
import { externalUrls, routePaths } from '@/types/routes.enum';
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export interface SignUpFormProps {
  title?: string;
  cardContainerStyles?: Record<any, any>;
  industryName?: string;
  onSignUp?: (formValues: SignUpRequest) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  cardContainerStyles = {},
  onSignUp,
  industryName = null,
}): React.ReactNode => {
  // STATE
  const [formValues, setFormValues] = useState<SignUpRequest>({
    first_name: '',
    last_name: '',
    company_name: '',
    industry: '',
    email: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedIndustry, setSelectedIndustry] = useState<
    Industry | undefined
  >();

  // QUERIES
  const { data: industries } = useIndustries();
  // MUTATIONS
  const { mutateAsync: signUp, isPending } = useSignUp();

  // HANDLERS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.target;
    setErrors((prev) => {
      return { ...prev, [name]: '' };
    });
  };

  useEffect(() => {
    if (industryName && industries?.results?.length) {
      // Find the industry that matches the industryName (case insensitive)
      const existingIndustry = industries.results.find(
        (industry) => industry.name.toLowerCase() === industryName.toLowerCase()
      );

      // If the industry is found and it's different from the selected one, update the selectedIndustry
      if (
        existingIndustry &&
        (!selectedIndustry || selectedIndustry.name !== existingIndustry.name)
      ) {
        setSelectedIndustry(existingIndustry);
        setFormValues((prev: any) => {
          return { ...prev, industry: existingIndustry.id.toString() };
        });
      }
    }
  }, [industryName, selectedIndustry, industries]);

  const checkFormValidity = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.first_name) {
      newErrors['first_name'] = 'First name is required';
    }
    if (!formValues.last_name) {
      newErrors['last_name'] = 'Last name is required';
    }
    if (!formValues.company_name) {
      newErrors['company_name'] = 'Company name is required';
    }
    if (!formValues.industry) {
      newErrors['industry'] = 'Industry is required';
    }
    if (!formValues.email) {
      newErrors['email'] = 'Email is required';
    }
    if (!formValues.password) {
      newErrors['password'] = 'Password is required';
    } else if (formValues.password.length < 8) {
      newErrors['password'] = 'Password must be at least 8 characters';
    } else if (!/\d/.test(formValues.password)) {
      newErrors['password'] =
        'Password must have at least 1 number and 1 special character';
    }
    if (!formValues.terms) {
      newErrors['terms'] = 'Must accept terms';
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
        onSuccess: () => {
          onSignUp?.(formValues);
        },
        onError: (err) => {
          setErrors((prev) => {
            return { ...prev, submit: err.message };
          });
        },
      });
    }
  };

  return (
    <CardWithTitle
      containerStyle={cardContainerStyles}
      titleProps={{
        text: 'Create an Account',
        sx: {
          textAlign: 'left',
        },
      }}
    >
      <ParagraphText
        align="left"
        sx={{
          marginTop: 0,
          '& a': {
            color: colors.bridgeDarkPurple,
          },
        }}
      >
        Already have an account?{' '}
        <span
          style={{
            color: colors.bridgeDarkPurple,
          }}
        >
          <Link href={routePaths.LOGIN} color="primary">
            Sign In
          </Link>{' '}
        </span>
        here
      </ParagraphText>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="First Name"
          variant="filled"
          fullWidth={true}
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
          fullWidth={true}
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
          fullWidth={true}
          margin="normal"
          name="company_name"
          value={formValues.company_name}
          onChange={handleChange}
          error={Boolean(errors && errors.company_name)}
          helperText={errors?.company_name}
          onBlur={handleBlur}
        />
        <Autocomplete
          options={industries?.results ?? []} // Provide the industry options
          getOptionLabel={(industry) => industry.name} // Display the name of the industry
          disabled={!!industryName} // Disable Autocomplete if industryName is provided
          value={selectedIndustry || null} // Ensure null is passed when selectedIndustry is undefined
          onChange={(e, value) => {
            // Update selectedIndustry and form values when a new industry is selected
            setSelectedIndustry(value || undefined);
            setFormValues((prev: any) => {
              return { ...prev, industry: value ? value.id.toString() : '' };
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Industry" // Set the label for the input
              variant="filled" // Set the variant
              fullWidth={true}
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
          fullWidth={true}
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
          fullWidth={true}
          margin="normal"
          name="password"
          value={formValues.password}
          disabled={isPending}
          onChange={handleChange}
          error={Boolean(errors && errors.password)}
          helperText={errors?.password}
          onBlur={handleBlur}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="terms"
              checked={formValues.terms}
              onChange={handleChange}
              sx={{
                '&.Mui-checked': {
                  color: '#77CE80', // green when checked
                },
              }}
            />
          }
          label={
            <ParagraphText
              component="p"
              sx={{
                fontSize: { xs: 14, md: 14, lg: 14 },
                '& a': {
                  color: colors.bridgeDarkPurple,
                },
              }}
            >
              I accept the Bridge{' '}
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
            type={'submit'}
            text="Sign Up"
            fullWidth={true}
            sx={{ padding: 1.5 }}
            isLoading={isPending}
          />
        </Box>
      </form>
    </CardWithTitle>
  );
};
