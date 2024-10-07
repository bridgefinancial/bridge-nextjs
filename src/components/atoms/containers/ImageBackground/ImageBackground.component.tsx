import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import useMergeStyles from "@/hooks/useMergeStyles.hook";

interface ImageBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  containerStyle?: Record<string, any>;
  innerContainerStyle?: Record<string, any>;
  imageStyle?: React.CSSProperties;
}

const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  alt,
  children,
  objectFit = "cover",
  containerStyle = {},
  innerContainerStyle = {},
  imageStyle = {},
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

  const mergedInnerStyles = useMergeStyles(innerContainerStyle, {
    position: "relative",
    zIndex: 1,
    width: "100%",
    height: "100%",
  });

  const mergedImageStyles = useMergeStyles(imageStyle as any, {
    zIndex: -1,
  });

  return (
    <Box sx={mergedStyles}>
      <Image
        src={src}
        alt={alt}
        fill={true}
        objectFit={objectFit}
        quality={100}
        style={mergedImageStyles}
      />
      <Box sx={mergedInnerStyles}>{children}</Box>
    </Box>
  );
};

export default ImageBackground;
