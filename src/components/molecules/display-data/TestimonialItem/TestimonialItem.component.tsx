import ParagraphText from '@/components/atoms/typography/ParagraphText';
import TitleText from '@/components/atoms/typography/TitleText';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { StyledTestimonial } from './TestimonialItem.styles';

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
  // Construct alt text dynamically
  const altText: string = `Quote ${
    role ? `from ${role}` : ''
  } by ${author || 'unknown'}`.trim();

  return (
    <StyledTestimonial>
      <Box>
        <Box
          sx={{ width: 38, height: 38, marginRight: 2 }}
          className="quoteWrapper"
        >
          <Image width={38} height={29} alt={altText} src={quoteImageSrc} />
        </Box>
      </Box>
      <Box>
        {/* Quote Text */}
        <TitleText
          sx={{
            fontSize: 24,
            fontWeight: 800,
          }}
        >
          {quote}
        </TitleText>

        {/* Author and Role */}
        <ParagraphText
          sx={{
            fontSize: 20,
            marginTop: 1,
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
