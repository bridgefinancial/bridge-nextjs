// components/Layout.tsx

import React, { ReactNode } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Link } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
<>
          {children}
          </>

  );
};

export default Layout;
