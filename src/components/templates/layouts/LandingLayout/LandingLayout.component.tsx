// components/Layout.tsx

import React, { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import MainHeader from "@/components/organisms/headers/MainHeader";
import GradientBox from "@/components/atoms/containers/GradientBox";

interface LayoutProps {
  children: ReactNode;
  pathForHome?: string;
}

const LandingLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, pathForHome = "/" } = props;
  return (
    <div className="w-full bg-white h-screen flex flex-col">
      <MainHeader
        linkProps={{
          href: pathForHome,
        }}
      />
      <GradientBox containerStyle={{ height: "4px" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 1,
          overflow: "auto",
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default LandingLayout;
