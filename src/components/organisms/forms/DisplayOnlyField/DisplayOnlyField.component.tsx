// DisplayOnlyField.tsx

import { FormField as Field } from '@/types/forms.types';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledDisplayField = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
}));

type DisplayOnlyFieldProps = {
  formField: Field;
};

const DisplayOnlyField: React.FC<DisplayOnlyFieldProps> = ({ formField }) => {
  return <StyledDisplayField>{formField.value as any}</StyledDisplayField>;
};

export default DisplayOnlyField;
