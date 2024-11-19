import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Wrapper for the entire component
export const MessageWithCTAWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

// Wrapper for the icon
export const MessageWithCTAIconWrap = styled('div')(() => ({
  textAlign: 'center',
  marginBottom: 16,
}));

// Wrapper for the title
export const MessageWithCTATitleWrap = styled('div')(() => ({
  marginBottom: 16,
}));

// Wrapper for the paragraph
export const MessageWithCTAParagraphWrap = styled('div')(() => ({
  marginBottom: 20,
}));

// Wrapper for the button in the footer
export const MessageWithCTAButtonWrap = styled('div')(() => ({
  width: '60%',
  display: 'flex',
  justifyContent: 'center',
  marginTop: 20,
  marginBottom: 20,
}));
