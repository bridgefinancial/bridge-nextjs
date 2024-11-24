import { Box, styled } from '@mui/material';
// Styled Components
export const StyledTestimonial = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
}));
