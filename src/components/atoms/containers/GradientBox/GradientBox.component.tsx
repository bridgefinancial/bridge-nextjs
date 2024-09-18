// src/components/design-system/atoms/GradientBox.tsx
import useMergeStyles from "@/hooks/useMergeStyles.hook";
import React from "react";

export interface GradientBoxProps {
  colors?: string[];
  direction?: "to right" | "to left" | "to top" | "to bottom" | string;
  containerStyle?: React.CSSProperties;
  children?: React.ReactNode;
}

const GradientBox: React.FC<GradientBoxProps> = ({
  colors = ["#fb9f1e", "#6a5ace", "#6ba0f1"], // Default colors
  direction = "to right", // Default direction
  containerStyle = {},
  children,
}) => {
  const gradient = `linear-gradient(${direction}, ${colors.join(", ")})`;
  const styles = useMergeStyles(
    { backgroundImage: gradient },
    containerStyle as any,
  );
  return (
    <div
      style={{
        ...styles,
      }}
    >
      {children ? children : null}
    </div>
  );
};

export default GradientBox;
