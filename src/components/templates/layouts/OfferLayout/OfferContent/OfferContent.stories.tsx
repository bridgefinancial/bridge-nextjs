// src/components/design-system/molecules/AvatarForm/AvatarForm.stories.tsx
import { FeatureListItemProps } from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import { TestimonialItemProps } from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import { ArrowRight } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import OfferContent from './OfferContent.component';

const testimonials: TestimonialItemProps[] = [
  {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
  },
  {
    quote:
      'The Business Health Check gave us clear insights into what we were doing right and where we could improve. Bridge helped us create a roadmap for real growth.',
  },
];

const sampleFeatureDataUsingImages: FeatureListItemProps[] = [
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
    text: 'Obtain a certified valuation and pdiscover growth opportunities for revenue and value.',
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
    href: '#',
    text: 'What is a certified valuation?',
  },
];

export default {
  title: 'components/templates/layouts/OfferLayout/OfferContent',
  component: OfferContent,
} as Meta<any>;

export const Desktop = {
  args: {
    testimonials,
    features: sampleFeatureDataUsingImages,
    messageWithCta: {
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
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'Desktop',
    },
  },
};

// Story in Mobile View
export const OnMobile: StoryObj<any> = {
  args: {
    testimonials,
    features: sampleFeatureDataUsingImages,
    messageWithCta: {
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
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'smallDevicePortrait',
    },
  },
};
