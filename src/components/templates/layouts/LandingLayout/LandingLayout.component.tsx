// components/Layout.tsx

import GradientBox from '@/components/atoms/containers/GradientBox';
import MainHeader from '@/components/organisms/headers/MainHeader';
import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  pathForHome?: string;
  logoPath?: string;
}

const LandingLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {
    children,
    pathForHome = '/',
    logoPath = '/assets/images/Bridge-logo.png',
  } = props;
  return (
    <div
      style={{
        overflowY: 'auto',
      }}
      className="w-full bg-white h-screen flex flex-col"
    >
      <div>
        <MainHeader
          logoPath={logoPath}
          linkProps={{
            href: pathForHome,
          }}
        />
        <GradientBox containerStyle={{ height: '4px' }} />
      </div>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default LandingLayout;
