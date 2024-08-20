// components/Layout.tsx

import React, { ReactNode } from "react";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import MainHeader from "@/components/organisms/headers/MainHeader";

interface LayoutProps {
  children: ReactNode;
  pathForHome?: string;
}

const LandingLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, pathForHome = "/" } = props;
  return (
    <Box>
      <MainHeader pathForHome={pathForHome} />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">{children}</Container>
      </Box>
    </Box>
  );
};

export default LandingLayout;
