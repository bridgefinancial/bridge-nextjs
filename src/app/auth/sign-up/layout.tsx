// components/Layout.tsx

import React, { ReactNode } from 'react';
import { Container, Box, AppBar, Toolbar, Typography, Link } from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            <Link href="/" color="inherit" underline="none">
              Bridge Financial
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Container maxWidth="lg"> */}
          {children}
      {/* </Container> */}
    </Box>
  );
};

export default Layout;
