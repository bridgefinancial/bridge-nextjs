import TitleText from '@/components/atoms/typography/TitleText';
import { useBreakpointQuery } from '@/hooks/useBreakpointQuery.hook';
import { BaseTypographyProps } from '@/types/base-typography-props.interface';
import { Box } from '@mui/material';
import merge from 'lodash.merge'; // Import lodash's merge utility
import React, { FC, useMemo } from 'react';

interface TitleProps extends BaseTypographyProps {
  text: string;
}

interface CardWithTitleProps {
  sx?: Record<string, any>; // Define `sx` as optional and improve type
  titleProps: TitleProps;
  children: React.ReactNode | React.ReactNode[];
  containerStyle?: Record<any, any>;
}

const CardWithTitle: FC<CardWithTitleProps> = (props: CardWithTitleProps) => {
  const { sx = {}, children, titleProps } = props;
  const { containerStyle } = props;
  const { text, ...titleTextProps } = titleProps;
  const { matches: isMobile, loading } = useBreakpointQuery({
    minWidth: 280,
    maxWidth: 380,
  });

  // Define default styles for the outer Box component
  const defaultOuterStyles = useMemo(
    () => ({
      borderRadius: 4,
      maxWidth: 580,
      margin: 'auto',
      mt: 4,
    }),
    []
  );

  // Define default styles for the TitleText
  const defaultTitleStyles = useMemo(
    () => ({
      fontSize: isMobile ? 25 : 32,
    }),
    [isMobile]
  );

  // Merge default styles with custom styles
  const mergedOuterStyles = useMemo(
    () => merge(containerStyle, defaultOuterStyles, sx),
    [sx, defaultOuterStyles, containerStyle]
  );

  const mergedTextTitleStyles = useMemo(
    () => merge(defaultTitleStyles, titleTextProps.sx || {}),
    [defaultTitleStyles, titleTextProps.sx]
  );

  return (
    <Box sx={mergedOuterStyles}>
      <Box
        sx={{
          paddingLeft: { xs: 2, sm: 12 },
          paddingRight: { xs: 2, sm: 12 },
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {text ? (
          <TitleText
            variant={titleTextProps.variant || 'h1'}
            component={titleTextProps.component || 'h1'}
            gutterBottom={true}
            textAlign={titleTextProps.textAlign || 'center'}
            sx={mergedTextTitleStyles}
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
