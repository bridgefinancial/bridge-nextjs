import TitleText from "@/components/atoms/typography/TitleText";
import { Box } from "@mui/material";
import React, { FC, useMemo } from "react";
import merge from 'lodash.merge'; // Import lodash's merge utility
import { BaseTypographyProps } from "@/types/base-typography-props.interface";

interface TitleProps extends BaseTypographyProps {
  text: string;
}

interface CardWithTitleProps {
  sx?: Record<string, any>; // Define `sx` as optional and improve type
  titleProps: TitleProps;
  children: React.ReactNode | React.ReactNode[];
}

const CardWithTitle: FC<CardWithTitleProps> = ({ sx = {}, children, titleProps }) => {
  const { text, ...titleTextProps } = titleProps;

  // Define default styles for the outer Box component
  const defaultOuterStyles = useMemo(() => ({
    borderRadius: 4, // 20px border-radius
    maxWidth: 580,
    margin: "auto",
    mt: 4,
    backgroundColor: "white",
    boxShadow: 3, // Optional: add shadow for better visual appeal
  }), []);

  // Merge default styles with custom styles
  const mergedOuterStyles = useMemo(() => merge({}, defaultOuterStyles, sx), [sx, defaultOuterStyles]);

  return (
    <Box sx={mergedOuterStyles}>
      <Box
        sx={{
          paddingLeft: { xs: 2, sm: 12 }, // Smaller padding on xs devices
          paddingRight: { xs: 2, sm: 12 }, // Smaller padding on xs devices
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {text ? (
          <TitleText
            variant={titleTextProps.variant || "h1"}
            component={titleTextProps.component || "h1"}
            gutterBottom
            textAlign={titleTextProps.textAlign || "center"}
            {...titleTextProps}
          >
            {text}
          </TitleText>
        ) : null}
        {children}
      </Box>
    </Box>
  );
};

export default CardWithTitle;
