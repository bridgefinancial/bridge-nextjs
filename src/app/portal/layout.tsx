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
import PortalLayout from "@/components/layouts/PortalLayout";
import { routePaths } from "@/types/routes.enum";
import { useAuth } from "@/providers/Auth.provider";
import { usePathname } from "next/navigation"; // Import the usePathname hook

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { state: userState, logout } = useAuth();
  const pathname = usePathname(); // Get the current path

  return (
    <PortalLayout
      user={{
        firstName: userState.user?.first_name || "Unknown",
        lastName: userState.user?.last_name || "User",
        email: userState.user?.email || "",
      }}
      logout={logout}
      tabs={[
        {
          label: "Dashboard",
          icon: "dashboard",
          linkProps: {
            href: routePaths.DASHBOARD,
          },
          active: pathname === routePaths.DASHBOARD,
        },
        {
          label: "Blueprint",
          icon: "pencil",
          linkProps: {
            href: routePaths.BLUEPRINT,
          },
          active: pathname === routePaths.BLUEPRINT,
        },
        {
          label: "Documents",
          icon: "graph",
          linkProps: {
            href: routePaths.DOCUMENTS,
          },
          active: pathname === routePaths.DOCUMENTS,
        },
        {
          label: "Settings",
          icon: "settings",
          linkProps: {
            href: routePaths.SETTINGS,
          },
          active: pathname === routePaths.SETTINGS,
        },
      ]}
    >
      {children}
    </PortalLayout>
  );
};

export default Layout;
