import GradientBox from '@/components/atoms/containers/GradientBox';
import DisplayGrid from '@/components/atoms/grids/DisplayGrid';
import TitleText from '@/components/atoms/typography/TitleText';
import FeatureListItem, {
  FeatureListItemProps,
} from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import TestimonialItem, {
  TestimonialItemProps,
} from '@/components/molecules/display-data/TestimonialItem/TestimonialItem.component';
import VideoPlayerModal from '@/components/molecules/modals/VideoPlayerModal/VideoPlayerModal.component';
import DesktopLayoutBar from '@/components/organisms/headers/LayoutBar/DesktopLayoutBar';
import MessageWithCTA, {
  MessageWithCTAProps,
} from '@/components/organisms/MessageWithCTA/MessageWithCTA.component';
import { LayoutForPortalProps } from '@/types/layout.types';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import { OfferLayoutProps } from '../OfferLayout.component';
import {
  BannerContainerStyled,
  HeaderSectionStyled,
  HeroSectionStyled,
  ParentContainerStyled,
  PreviewSectionStyled,
  TestimonialSectionStyled,
} from './OfferContent.styles';
// use onclick inside of features,
// to change the state of videoDetails.opened to true
// to open the video model
export interface OfferContentProps extends Partial<OfferLayoutProps> {
  features: FeatureListItemProps[];
  testimonials: TestimonialItemProps[];
  messageWithCta: MessageWithCTAProps;
  videoDetails: {
    opened: boolean;
    onClose: () => void;
    url: string;
  };
  user: LayoutForPortalProps['user'];
  logout: LayoutForPortalProps['logout'];
  previewDetails?: undefined;
}

export interface FeaturesSectionProps {
  children?: React.ReactNode;

  containerStyle?: React.CSSProperties; // Allow custom container styles
}

// Styled Component with extended props
const FeaturesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#FFF',
  width: '90%',
  padding: theme.spacing(2),
  left: '50%',

  borderRadius: 10,
  minHeight: 250,
  boxShadow: theme.shadows[4],
}));

const TestimonialSectionWithMount = ({
  testimonials,
}: {
  testimonials: TestimonialItemProps[];
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after the component mounts
  }, []);

  // it's important to use the style property right here instead of the sx
  // prop. if you use the sx prop marginTop will not handle the units properly
  // see 
  return (
    <TestimonialSectionStyled
      test-id={'display-grid-for-feature-list'}
      style={{
        marginTop: 20,
        paddingTop: 100,
        paddingBottom: 100,
        /*
         * disabled for now -- doesn't handle going from one OfferPage to another (animation flickers)
         *
         * opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
         * transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
         *
         */
      }}
    >
      <Box
        sx={{
          width: '100%',
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: 4,
          paddingLeft: { xs: 6, sm: 1 },
          paddingRight: { xs: 6, sm: 1 },
        }}
      >
        <DisplayGrid
          gridItemSizes={{ xs: 12, lg: 6 }}
          renderItem={(item) => <TestimonialItem {...item} />}
          data={testimonials}
          spacing={6}
          containerSx={{
            paddingLeft: { xs: 0, sm: 4, md: 6, lg: 12 },
            paddingRight: { xs: 0, sm: 4, md: 6, lg: 12 },
          }}
          itemStyle={{
            padding: 35,
            width: '100%',
            justifyContent: 'center',
            alignContent: 'start',
          }}
        />
      </Box>
    </TestimonialSectionStyled>
  );
};
const FeaturesSection = forwardRef<HTMLDivElement, FeaturesSectionProps>(
  ({ children, containerStyle = {} }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true); // Set mounted state after the component mounts
    }, []);

    return (
      <FeaturesContainer
        ref={ref}
        test-id="feature-container"
        style={{
          ...containerStyle,
          opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
          transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
        }}
      >
        {children}
      </FeaturesContainer>
    );
  },
);
FeaturesSection.displayName = 'FeaturesSection';

const PreviewSectionWithMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state after the component mounts
  }, []);

  return (
    <PreviewSectionStyled
      sx={{
        opacity: isMounted ? 1 : 0, // Set opacity based on mounted state
        transition: 'opacity 0.5s ease-in-out', // Add a smooth transition
      }}
      test-id="preview-container"
    >
      <Box
        test-id="preview-container-text-wrapper"
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
    </PreviewSectionStyled>
  );
};

const OfferContent = (props: OfferContentProps) => {
  const {
    features,
    testimonials,
    messageWithCta,
    user,
    logout,
    videoDetails = {
      opened: false,
      onClose: () => {},
      url: '',
    },
    previewDetails = undefined,
  } = props;

  return (
    <>
      <VideoPlayerModal
        open={videoDetails.opened}
        onClose={() => videoDetails.onClose()}
        url={videoDetails.url}
      />
      <ParentContainerStyled>
        <GradientBox
          direction="to right"
          colors={['#A395F7', '#6A5ACE']}
          containerStyle={{
            width: '100%',
            height: '40%',
            top: 0,
            zIndex: 0,
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          <BannerContainerStyled>
            <HeaderSectionStyled>
              <DesktopLayoutBar maxWidth="100%" user={user} logout={logout} />
            </HeaderSectionStyled>
            <HeroSectionStyled>
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
            </HeroSectionStyled>
          </BannerContainerStyled>
        </GradientBox>

        {/* Features Section */}
        <FeaturesSection containerStyle={{ margin: 'auto', marginTop: 50 }}>
          <DisplayGrid
            test-id={'display-grid-for-feature-list'}
            renderItem={(item) => <FeatureListItem {...item} />}
            data={features}
            itemStyle={{
              width: '100%',
            }}
            gridItemSizes={{
              xs: 12,
              sm: 12,
              md: 12,
              lg: 4,
              xl: 4,
            }}
            containerStyle={{
              maxWidth: '100%',
              width: '100%',
              height: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </FeaturesSection>

        {/* Testimonial Section */}
        <TestimonialSectionWithMount testimonials={testimonials} />

        {/* Preview Section */}
        {previewDetails && <PreviewSectionWithMount />}
      </ParentContainerStyled>
    </>
  );
};

export default OfferContent;
