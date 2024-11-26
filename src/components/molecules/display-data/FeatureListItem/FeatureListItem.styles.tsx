import { Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled Component for FeatureListItem
export const StyledFeatureListItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCallToAction',
})<{ isCallToAction?: boolean }>(({ theme, isCallToAction }) => ({
  display: 'flex',
  alignItems: isCallToAction ? 'center' : 'flex-start', // Adjust alignment
  borderRadius: 12,
  transition: 'all 0.3s ease',
  backgroundColor: isCallToAction ? theme.palette.grey[200] : 'transparent',
  boxShadow: 'none',
  color: isCallToAction
    ? theme.palette.primary.main
    : theme.palette.text.primary,

  // Padding is always applied
  padding: `${theme.spacing(2)} ${theme.spacing(0)}`, // 16px top/bottom, 24px left/right

  // Cursor changes to pointer for Call-to-Action
  cursor: isCallToAction ? 'pointer' : 'default',

  // Target text (e.g., <p>) inside the component
  '& p': {
    paddingLeft: 0,
    marginLeft: 0,

    fontWeight: isCallToAction ? '800 !important' : 'initial', // Enforce fontWeight
    whiteSpace: isCallToAction ? 'nowrap' : 'normal', // No wrapping for Call-to-Action
    overflow: isCallToAction ? 'hidden' : 'visible', // Prevent overflow
    textOverflow: isCallToAction ? 'ellipsis' : 'clip', // Add ellipsis for Call-to-Action
  },
}));

// Styled Component for FeatureListItem

// Styled Component for Icon Wrapper
export const FeatureIconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isCallToAction',
})<{ isCallToAction?: boolean }>(({ theme, isCallToAction = false }) => ({
  maxWidth: 35,
  maxHeight: 35,
  width: '100%',
  height: '100%',
  display: 'flex',
  marginTop: isCallToAction ? 'initial' : 1.3,
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden', // Prevent content overflow
  boxSizing: 'border-box', // Ensures consistent sizing
  padding: isCallToAction ? `${theme.spacing(1)} ${theme.spacing(0)}` : 0,
  // Target images and SVGs within this Box
  '& img, & svg': {
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto',
  },
}));
