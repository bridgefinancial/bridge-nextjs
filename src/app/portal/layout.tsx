"use client";

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
import LandingLayout from "@/components/design-system/templates/layouts/LandingLayout/LandingLayout.component";
import PortalLayout from "@/components/design-system/templates/layouts/PortalLayout";
import { routePaths } from "@/types/routes.enum";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const someUser = () => {
    return {
      first_name: "Landon",
      last_name: "Johnson",
      email: "landonwjohnson@gmail.com",
    };
  };
  return (
    <PortalLayout
      user={someUser()}
      tabs={[
        {
          label: "Dashboard",
          icon: "dashboard",
          linkProps: {
            href: routePaths.DASHBOARD,
          },
        },
      ]}
    >
      {children}
    </PortalLayout>
  );
};

export default Layout;
