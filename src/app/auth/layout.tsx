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
import LandingLayout from "@/components/layouts/LandingLayout/LandingLayout.component";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
      <LandingLayout>{children}</LandingLayout>
  );
};

export default Layout;
