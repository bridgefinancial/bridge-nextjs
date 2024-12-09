import { FeatureListItemProps } from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import { TestimonialItemProps } from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import { ProductKey } from '@/components/organisms/Checkout/CheckoutForm';
import { CTAButtonProps } from '@/components/organisms/MessageWithCTA/MessageWithCTA.component';
import { ArrowRight } from '@mui/icons-material';
import Image from 'next/image';

export const OPEN_VIDEO_SEARCH_PARAM_KEY = 'open_video';

type OfferPageDynamicContent = {
  features: FeatureListItemProps[];
  heading: string;
  subheading: string;
  buttonProps: CTAButtonProps;
  testimonials: TestimonialItemProps[];
  iconPath: string;
};

export enum OfferSlug {
  CertifiedValuation = 'certified_valuation',
  Optimize = 'optimize',
  Sell = 'sell',
}

export const contentBySlug: Map<OfferSlug, OfferPageDynamicContent> = new Map([
  [
    OfferSlug.CertifiedValuation,
    {
      heading: 'Discover your business’s worth',
      subheading: 'Get a Bridge Certified Valuation for $1,999.',
      buttonProps: {
        text: 'Order Certified Valuation',
        endIcon: <ArrowRight />,
        checkoutProductKey: ProductKey.CertifiedValuation,
      },
      features: [
        {
          icon: (
            <Image
              alt="checkmark-icon"
              width={24}
              height={24}
              src="/assets/icons/checkmark-circle-icon.svg"
            />
          ),
          text: '48-Hour turnaround certified valuations.',
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
          text: 'Accredited by ABV and AICPA, ensuring reliability with banks, investors, and stakeholders.',
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
          text: 'Direct access to CPAs and valuators.',
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
          text: 'Secure streamlined document management for easy collaboration.',
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
          text: 'Up to 93% less than typical valuations—AI-driven accuracy.',
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
          href: `?${OPEN_VIDEO_SEARCH_PARAM_KEY}=t`,
          text: 'What is a certified valuation?',
        },
      ],
      testimonials: [
        {
          quote:
            'Bridge’s 48-hour turnaround gave us the insights we needed right when we needed them. Fast, accurate, and invaluable!',
        },
        {
          quote:
            'I was amazed by the level of expertise and personal support. Bridge’s valuation was spot-on and helped secure my business’s future.',
        },
      ],
      iconPath: '/assets/images/journey/chart.png',
    },
  ],
  [
    OfferSlug.Optimize,
    {
      heading: 'Transform Your Business in 12 Months',
      subheading:
        'Start Your Business Optimization Journey Today for Just $9,999',
      buttonProps: {
        text: 'Start Optimizing',
        endIcon: <ArrowRight />,
        checkoutProductKey: ProductKey.OptimizationPackage,
      },
      features: [
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
          href: `?${OPEN_VIDEO_SEARCH_PARAM_KEY}=t`,
          text: 'How does optimization work?',
        },
      ],
      testimonials: [
        {
          quote:
            'Bridge’s tailored approach to business optimization transformed our processes and boosted profitability. I wish we had done this sooner.',
        },
        {
          quote:
            'The Business Health Check gave us clear insights into what we were doing right and where we could improve. Bridge helped us create a roadmap for real growth.',
        },
      ],
      iconPath: '/assets/images/journey/revenue.png',
    },
  ],
  [
    OfferSlug.Sell,
    {
      heading: 'Prepare Your Business for a Successful Sale',
      subheading: 'Seller Readiness Package – Only $2,999',
      buttonProps: {
        text: 'Sell With Confidence',
        endIcon: <ArrowRight />,
        checkoutProductKey: ProductKey.SellerReadinessPackage,
      },
      features: [
        {
          icon: (
            <Image
              alt="checkmark-icon"
              width={24}
              height={24}
              src="/assets/icons/checkmark-circle-icon.svg"
            />
          ),
          text: 'Our Dedicated Sales Readiness Team will provide expert support over 12 months to prepare your business for sale.',
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
          text: 'With Bridge’s 12-Month Guarantee, we’ll maximize your business’s appeal and market readiness.',
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
          text: 'Receive a comprehensive checklist and roadmap that provide a clear, step-by-step guide from preparation to closing.',
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
          text: 'Leverage our software to streamline the sale, manage documents, and track progress, making your journey smoother.',
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
          text: "Obtain a certified valuation to understand your business's worth and growth potential.",
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
          href: `?${OPEN_VIDEO_SEARCH_PARAM_KEY}=t`,
          text: 'How does the selling process work?',
        },
      ],
      testimonials: [
        {
          quote:
            'With Bridge’s guidance, I knew exactly what buyers were looking for. It was a game-changer for my sale process.',
        },
        {
          quote:
            'I couldn’t believe how much Bridge’s insights and preparation boosted my business’s sale price. They made it easy, efficient, and effective.',
        },
      ],
      iconPath: '/assets/images/journey/price.png',
    },
  ],
]);
