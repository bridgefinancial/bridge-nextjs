// components/Layout.tsx

import React, { ReactNode } from "react";

import LandingLayout from "@/components/templates/layouts/LandingLayout/LandingLayout.component";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LandingLayout pathForHome="/valuation-estimate">{children}</LandingLayout>
  );
};

export default Layout;
