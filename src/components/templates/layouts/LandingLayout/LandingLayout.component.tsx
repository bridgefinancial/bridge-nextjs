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
import ImageBackground from "@/components/atoms/containers/ImageBackground";

interface LayoutProps {
  children: ReactNode;
  pathForHome?: string;
}

const LandingLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, pathForHome = "/" } = props;
  return (
    <ImageBackground src="/assets/images/gradient.png" alt="Bridge Financial Gradient">

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
    </ImageBackground>

  );
};

export default LandingLayout;
