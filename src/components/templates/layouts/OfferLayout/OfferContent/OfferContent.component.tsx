import GradientBox from '@/components/atoms/containers/GradientBox';
import DisplayGrid from '@/components/atoms/grids/DisplayGrid';
import TitleText from '@/components/atoms/typography/TitleText';
import FeatureListItem, {
  FeatureListItemProps,
} from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import TestimonialItem, {
  TestimonialItemProps,
} from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import DesktopLayoutBar from '@/components/organisms/headers/LayoutBar/DesktopLayoutBar';
import MessageWithCTA, {
  MessageWithCTAProps,
} from '@/components/organisms/MessageWithCTA/MessageWithCTA.component';
import { useViewSize } from '@/hooks/useViewSize.hook';
import { LayoutForPortalProps } from '@/types/layout.types';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import { OfferLayoutProps } from '../OfferLayout.component';

// Styled Components
const ParentContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: 0,
  paddingTop: 0,
  zIndex: 0,
  paddingBottom: 30,
}));

const BannerContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '93%',

  margin: '1% auto',
  marginTop: 0,
  paddingTop: 0,
  zIndex: 1,
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '15%',
  marginBottom: theme.spacing(2),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '15%',
}));

const TestimonialSection = styled(Box)(({ theme }) => ({
  width: '93%',
  height: '15%',
  margin: '1% auto',
}));

const PreviewSection = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
  marginTop: '5%',
}));

export interface OfferContentProps extends Partial<OfferLayoutProps> {
  features: FeatureListItemProps[];
  testimonials: TestimonialItemProps[];
  messageWithCta: MessageWithCTAProps;
  user: LayoutForPortalProps['user'];
  logout: LayoutForPortalProps['logout'];
}

export interface FeaturesSectionProps {
  children?: React.ReactNode;
  dynamicTranslateY: number;
  dynamicBottom?: number;

  containerStyle?: React.CSSProperties; // Allow custom container styles
}

// Extend BoxProps to include dynamicTranslateY
interface FeaturesContainerProps extends BoxProps {
  dynamicTranslateY?: number;
  dynamicBottom?: number;
}

// Styled Component with extended props
const FeaturesContainer = styled(Box)<FeaturesContainerProps>(
  ({ theme, dynamicBottom = 0 }) => ({
    backgroundColor: '#FFF',
    width: '90%',
    padding: theme.spacing(2),
    position: 'absolute',
    left: '50%',

    top: `${dynamicBottom}px`,
    borderRadius: 10,
    minHeight: 250,
    transform: `translate(-50%)`, // Adjusting vertical position
    boxShadow: theme.shadows[2],
  })
);
const TestimonialSectionWithMount = ({
  testimonials,
  featureSize,
}: {
  testimonials: TestimonialItemProps[];
  featureSize: any;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after the component mounts
  }, []);

  return (
    <TestimonialSection
      style={{
        marginTop: featureSize.height / 1.3,
        opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
        transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
      }}
    >
      <Box
        sx={{
          width: '100%',
          paddingLeft: { xs: 2, sm: 12 },
          paddingRight: { xs: 2, sm: 12 },
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 4,
        }}
      >
        <DisplayGrid
          config={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}
          renderItem={(item) => <TestimonialItem {...item} />}
          data={testimonials}
          spacing={4}
          containerStyle={{
            width: '100%',
            padding: 0,
          }}
          itemStyle={{
            padding: 0,
            width: '100%',
          }}
        />
      </Box>
    </TestimonialSection>
  );
};
const FeaturesSection = forwardRef<HTMLDivElement, FeaturesSectionProps>(
  (
    { children, containerStyle = {}, dynamicTranslateY = 0, dynamicBottom },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true); // Set mounted state after the component mounts
    }, []);

    return (
      <FeaturesContainer
        ref={ref}
        style={{
          ...containerStyle,
          opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
          transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
        }}
        dynamicBottom={dynamicBottom}
        dynamicTranslateY={dynamicTranslateY}
      >
        {children}
      </FeaturesContainer>
    );
  }
);
FeaturesSection.displayName = 'FeaturesSection';

const PreviewSectionWithMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after the component mounts
  }, []);

  return (
    <PreviewSection
      sx={{
        opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
        transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
      }}
    >
      <Box
        sx={{
          width: '90%',
          backgroundColor: 'white',
          paddingLeft: { xs: 2, sm: 12 },
          paddingRight: { xs: 2, sm: 12 },
          paddingTop: 5,
          paddingBottom: 5,
          borderRadius: 4,
        }}
      >
        <TitleText
          sx={{
            textAlign: 'center',
          }}
          variant="h1"
        >
          PDF
        </TitleText>
      </Box>
    </PreviewSection>
  );
};

const OfferContent = (props: OfferContentProps) => {
  const { features, testimonials, messageWithCta, user, logout } = props;

  // Use hooks to track sizes
  const [featureSize, setFeatureRef] = useViewSize();
  const [gradientSize, setGradientRef] = useViewSize();

  // Calculate styles dynamically
  const featureSizeHalf = featureSize.height / 2;

  return (
    <ParentContainer>
      {/* Gradient Section */}
      <GradientBox
        ref={setGradientRef}
        direction="to right"
        colors={['#A395F7', '#6A5ACE']}
        containerStyle={{
          width: '100%',
          height: '40%',
          top: 0,
          zIndex: 0,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: featureSize.height / 1.5,
        }}
      >
        <BannerContainer>
          <HeaderSection>
            <DesktopLayoutBar user={user} logout={logout} />
          </HeaderSection>
          <HeroSection>
            <MessageWithCTA
              containerStyles={{
                marginTop: 0,
                paddingTop: 0,
              }}
              icon={
                <Image
                  width={57.93}
                  height={62.37}
                  alt="bridge-shield-image"
                  src="/assets/icons/bridge-shield-icon.png"
                />
              }
              paragraphProps={{
                paragraphStyles: {
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 700,
                  textAlign: 'center',
                },
                ...messageWithCta.paragraphProps,
              }}
              titleProps={{
                titleStyles: {
                  fontSize: 32,
                  fontWeight: 700,
                  textAlign: 'center',
                  color: 'white',
                },
                ...messageWithCta.titleProps,
              }}
              buttonProps={messageWithCta.buttonProps || null}
            />
          </HeroSection>
        </BannerContainer>
      </GradientBox>

      {/* Features Section */}
      <FeaturesSection
        dynamicBottom={gradientSize.bottom - featureSizeHalf}
        ref={setFeatureRef}
        dynamicTranslateY={featureSizeHalf}
        containerStyle={{ margin: 'auto' }}
      >
        <DisplayGrid
          renderItem={(item) => <FeatureListItem {...item} />}
          data={features}
          itemStyle={{
            width: '100%',
          }}
          config={{
            xs: 2,
            sm: 6,
            md: 4,
            lg: 4,
            xl: 4,
          }}
          containerStyle={{
            maxWidth: '100%',
            width: '100%',
            height: '100%',
            margin: 'auto',
          }}
        />
      </FeaturesSection>

      {/* Testimonial Section */}
      <TestimonialSectionWithMount
        featureSize={featureSize}
        testimonials={testimonials}
      />

      {/* Preview Section */}
      <PreviewSectionWithMount />
    </ParentContainer>
  );
};

export default OfferContent;
