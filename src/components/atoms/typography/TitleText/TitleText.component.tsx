import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Sora } from "next/font/google";
import { BaseTypographyProps } from "@/types/base-typography-props.interface";

// Load the Sora Semi Bold font
const sora = Sora({
  weight: "600", // Semi Bold
  subsets: ["latin"],
});

const TitleText: FC<BaseTypographyProps> = ({
  children,
  className = "",
  sx = {},
  ...rest
}) => {
  return (
    <Typography className={`${sora.className} ${className}`} sx={sx} {...rest}>
      {children}
    </Typography>
  );
};

export default TitleText;
