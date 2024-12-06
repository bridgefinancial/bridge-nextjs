// src/components/design-system/molecules/AvatarForm/AvatarForm.stories.tsx

import { ArrowRight } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import OfferContent from './OfferContent/OfferContent.component';
import { OfferLayout, OfferLayoutProps } from './OfferLayout.component';

// Testimonial data
const testimonials = [
  {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
  },
  {
    quote:
      'The Business Health Check gave us clear insights into what we were doing right and where we could improve. Bridge helped us create a roadmap for real growth.',
  },
];

// Feature data
const sampleFeatureDataUsingImages = [
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Clear, actionable guidance on what to focus on now, next, and in the future.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={30}
        height={30}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Assess performance in Product Market Fit, Lead Generation, Conversion, and Operations with a Health Score.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: '12 months of strategic guidance from a dedicated business advisor.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Obtain a certified valuation and discover growth opportunities for revenue and value.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: "Receive tailored strategies to address your business's unique challenges and goals.",
  },
  {
    icon: (
      <Image
        alt="video-play-icon"
        width={25}
        height={25}
        src="/assets/icons/video-play-favicon.svg"
      />
    ),
    isCallToAction: true,
    onClick: () => alert('Open up video modal'),
    text: 'What is a certified valuation?',
  },
];

// Meta configuration
export default {
  title: 'components/templates/layouts/OfferLayout',
  component: OfferLayout,
  parameters: {
    layout: 'centered',
  },
} as Meta<OfferLayoutProps>;

// Default Story
export const Default: StoryObj<OfferLayoutProps> = {
  args: {
    children: (
      <OfferContent
        user={
          {
            id: '',
            email: '',
            first_name: '',
            last_login: '',
            last_name: '',
          } as any
        }
        videoDetails={{
          url: '',
          opened: false,
          onClose: () => {},
        }}
        logout={() => {}}
        testimonials={testimonials}
        features={sampleFeatureDataUsingImages}
        messageWithCta={{
          titleProps: {
            titleText: 'Discover your business’s worth',
          },
          paragraphProps: {
            paragraphText: 'Get a Bridge Certified Valuation for $1,999.',
          },
          buttonProps: {
            text: 'Order Certified Valuation',
            endIcon: <ArrowRight />,
            onClick: () => alert('Learn More clicked!'),
          },
        }}
      />
    ),
  },
};

// VideoOpened Story
export const VideoOpened: StoryObj<OfferLayoutProps> = {
  args: {
    children: (
      <OfferContent
        user={
          {
            id: '',
            email: '',
            first_name: '',
            last_login: '',
            last_name: '',
          } as any
        }
        videoDetails={{
          url: 'https://www.youtube.com/watch/1ofxRiL64hU',
          opened: true,
          onClose: () => {},
        }}
        logout={() => {}}
        testimonials={testimonials}
        features={sampleFeatureDataUsingImages}
        messageWithCta={{
          titleProps: {
            titleText: 'Discover your business’s worth',
          },
          paragraphProps: {
            paragraphText: 'Get a Bridge Certified Valuation for $1,999.',
          },
          buttonProps: {
            text: 'Order Certified Valuation',
            endIcon: <ArrowRight />,
            onClick: () => alert('Learn More clicked!'),
          },
        }}
      />
    ),
  },
};
