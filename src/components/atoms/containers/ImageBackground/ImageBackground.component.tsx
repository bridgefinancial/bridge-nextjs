import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import useMergeStyles from "@/hooks/useMergeStyles.hook";

interface ImageBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  containerStyle?: Record<any, any>;
}

const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  alt,
  children,
  objectFit = "cover",
  containerStyle = {},
}) => {
  const mergedStyles = useMergeStyles(containerStyle, {
    position: "relative",
    height: "100%",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <Box sx={mergedStyles}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        quality={100}
        style={{ zIndex: -1 }}
      />
      <Box
        sx={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ImageBackground;
