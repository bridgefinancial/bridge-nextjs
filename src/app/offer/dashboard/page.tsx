'use client';
import { FeatureListItemProps } from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import { TestimonialItemProps } from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import OfferContent from '@/components/templates/layouts/OfferLayout/OfferContent/OfferContent.component';
import { useLogoutUser, useSessionUser } from '@/services/users.service';
import { ArrowRight } from '@mui/icons-material';
import { Suspense } from 'react';

import Image from 'next/image';

const testimonials: TestimonialItemProps[] = [
  {
    quote:
      'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
    author: 'Rebecca H.',
    role: 'Retail Business Owner',
  },
  {
    quote:
      'The Business Health Check gave us clear insights into what we were doing right and where we could improve. Bridge helped us create a roadmap for real growth.',
    author: 'Linda M.',
    role: 'Tech Startup Founder',
  },
];

export default function DashboardPage() {
  // QUERIES
  const { data: user } = useSessionUser();
  const { mutateAsync: logout } = useLogoutUser();
  const features: FeatureListItemProps[] = [
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
          width={18}
          height={18}
          src="/assets/icons/video-play-favicon.svg"
        />
      ),
      isCallToAction: true,
      onClick: () => alert('Open up video modal'),
      text: 'What is a certified valuation?',
    },
  ];
  return (
    <Suspense>
      <OfferContent
        user={user}
        features={features}
        logout={logout}
        testimonials={testimonials}
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
    </Suspense>
  );
}
