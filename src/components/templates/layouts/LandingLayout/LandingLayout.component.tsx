// components/Layout.tsx

import GradientBox from "@/components/atoms/containers/GradientBox";
import MainHeader from "@/components/organisms/headers/MainHeader";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  pathForHome?: string;
}

const LandingLayout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, pathForHome = "/" } = props;
  return (
    <div
      style={{
        overflowY: "auto",
      }}
      className="w-full bg-white h-screen flex flex-col"
    >
      <div>
        <MainHeader
          linkProps={{
            href: pathForHome,
          }}
        />
        <GradientBox containerStyle={{ height: "4px" }} />
      </div>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
