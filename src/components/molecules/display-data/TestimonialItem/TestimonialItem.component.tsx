import ParagraphText from '@/components/atoms/typography/ParagraphText';
import TitleText from '@/components/atoms/typography/TitleText';
import { Box, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import React from 'react';
import { StyledTestimonial } from './TestimonialItem.styles';

// preview compiled with 1 error
// 62% building 2/3 entries 357/367 dependencies 1413/155 modulesWARN Failed to parse /Users/landonjohnson/dev-local/workplaces/bridge-financial/bridge-nextjs/src/components/organisms/MessageWithCTA/MessageWithCTA.component.tsx with react-docgen. Rerun Storybook with --loglevel=debug to get more info.
// ERROR in ./src/components/organisms/MessageWithCTA/MessageWithCTA.component.tsx
// Module build failed (from ./node_modules/@storybook/nextjs/dist/swc/next-swc-loader-patch.js):
// Error:
// Props Interface
export interface TestimonialItemProps {
  quote: string; // The main testimonial text
  author: string; // The author of the testimonial
  role?: string; // The role or designation of the author
  quoteImageSrc?: string; // Source for the quote image
}

// Component
const TestimonialItem: React.FC<TestimonialItemProps> = ({
  quote,
  author,
  role,
  quoteImageSrc = '/assets/icons/quote-icon.svg',
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Construct alt text dynamically
  const altText: string = `Quote ${
    role ? `from ${role}` : ''
  } by ${author || 'unknown'}`.trim();

  return (
    <StyledTestimonial>
      <Box>
        <Box
          sx={{
            width: isMobile ? 38 / 1.5 : 38,
            height: isMobile ? 38 / 1.5 : 38,
            marginRight: isMobile ? 1 : 2,
          }}
          className="quoteWrapper"
        >
          <Image
            width={isMobile ? 38 / 1.5 : 38}
            height={isMobile ? 38 / 1.5 : 38}
            alt={altText}
            src={quoteImageSrc}
          />
        </Box>
      </Box>
      <Box>
        {/* Quote Text */}
        <TitleText
          sx={{
            fontSize: { xs: 16, sm: 20, md: 24 },
            fontWeight: 800,
          }}
        >
          {quote}
        </TitleText>

        {/* Author and Role */}
        <ParagraphText
          sx={{
            fontSize: { xs: 16, sm: 20, md: 24 },
            marginTop: { xs: 2, sm: 3 },
            fontWeight: 'bold',
          }}
        >
          {author}
          {role && `, ${role}`}
        </ParagraphText>
      </Box>
    </StyledTestimonial>
  );
};

export default TestimonialItem;
