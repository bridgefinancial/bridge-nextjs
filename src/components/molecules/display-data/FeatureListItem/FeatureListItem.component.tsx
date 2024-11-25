import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { SxProps } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import {
  FeatureIconWrapper,
  StyledFeatureListItem,
} from './FeatureListItem.styles';

// Props
export interface FeatureListItemProps {
  text: string;
  icon: React.ReactNode;
  isCallToAction?: boolean;
  href?: string;
  containerStyle?: SxProps; // Overrides container styles
  textStyle?: SxProps; // Overrides text styles
  textVariant?: 'body1' | 'body2' | 'subtitle1' | 'subtitle2'; // Custom typography variant
}

// Component
const FeatureListItem: React.FC<FeatureListItemProps> = ({
  text,
  icon,
  isCallToAction = false,
  href, // Default to no-op function if onClick is not provided
  containerStyle = {}, // Default to an empty object to avoid undefined errors
  textStyle = {}, // Default to an empty object to avoid undefined errors
  textVariant = 'body1', // Default to body1
}) => {
  const body = (
    <StyledFeatureListItem
      isCallToAction={isCallToAction}
      sx={{
        ...containerStyle, // Merge custom container styles
      }}
    >
      <FeatureIconWrapper>{icon}</FeatureIconWrapper>

      <ParagraphText
        variant={textVariant}
        sx={{
          marginLeft: 1.5,
          ...textStyle, // Merge custom text styles
        }}
      >
        {text}
      </ParagraphText>
    </StyledFeatureListItem>
  );
  if (isCallToAction && href) {
    return <Link href={href}>{body}</Link>;
  }

  return body;
};

export default FeatureListItem;
