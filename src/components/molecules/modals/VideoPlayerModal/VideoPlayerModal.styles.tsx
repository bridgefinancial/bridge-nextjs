import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';

// Styled container for the modal
export const VideoPlayerModalBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#000', // Black background
  borderRadius: '10px', // Rounded corners
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  width: '90%', // Default width for smaller screens
  height: '90%', // Default height for smaller screens
  [theme.breakpoints.up('xs')]: {
    width: '320px',
    height: '240px',
  },
  [theme.breakpoints.up('sm')]: {
    width: '460px',
    height: '300px',
  },
  [theme.breakpoints.up('md')]: {
    width: '700px',
    height: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '1200px',
    height: '661px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '1154px',
    height: '661px',
  },
}));

// Styled header for the modal
export const VideoPlayerModalHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  color: '#ccc', // Light grey title color
}));

// Styled close button
export const VideoPlayerModalCloseButton = styled(IconButton)(({ theme }) => ({
  color: '#fff', // White close button
}));

// Styled content area
export const VideoPlayerModalContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff', // White text for placeholder content
}));
