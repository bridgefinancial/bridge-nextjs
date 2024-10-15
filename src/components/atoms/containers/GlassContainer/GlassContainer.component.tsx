import { styled } from '@mui/material/styles';
import React, { CSSProperties } from 'react';

interface GlassContainerProps {
  children: React.ReactNode;
  containerStyle?: CSSProperties; // Allow custom styles for the outer container
}

const GlassContainerStyled = styled('div')(({ theme }) => ({
  height: '100%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  clipPath: 'inset(10em)',
  background: `rgba(255, 255, 255, 0.2)`,
  backdropFilter: 'blur(20px)',
  boxShadow: `0 20px 10px rgba(0, 0, 0, 0.3)`,
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '10em',
    height: 'calc(100% - 20em)',
    width: 'calc(100% - 20em)',
    borderTop: '2px solid rgba(225, 225, 225, 0.2)',
    borderLeft: '1px solid rgba(225, 225, 225, 0.1)',
    borderRight: '1px solid rgba(225, 225, 225, 0.3)',
    zIndex: 2,
  },
  '& span': {
    position: 'absolute',
    zIndex: 5,
    color: 'white',
    fontSize: '4em',
    letterSpacing: '0.75em',
    paddingLeft: '0.375em',
  },
  [theme.breakpoints.down('md')]: {
    clipPath: 'inset(5em)',
    '&:before': {
      top: '5em',
      width: 'calc(100% - 10em)',
    },
    '& span': {
      fontSize: '4em',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& span': {
      fontSize: '2em',
    },
  },
}));

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  containerStyle,
}) => {
  return (
    <div style={{ height: '100%', width: '100%', ...containerStyle }}>
      <GlassContainerStyled>{children}</GlassContainerStyled>
    </div>
  );
};

export default GlassContainer;
