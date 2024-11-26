'use client';
import TitleText from '@/components/atoms/typography/TitleText';
import { IconCardProps } from '@/components/molecules/cards/IconCard';
import JourneyForm from '@/components/organisms/forms/JourneyForm/JourneyForm.component';
import { routePaths } from '@/types/routes.enum';
import { Container } from '@mui/material';

type IconCardLink = IconCardProps & { route: string };

const choices: Record<string, IconCardLink> = {
  valuation: {
    iconPath: '/assets/images/journey/chart.png',
    route: routePaths.VALUATION,
    children: (
      <>
        Get a <br /> Valuation
      </>
    ),
  },
  optimize: {
    iconPath: '/assets/images/journey/revenue.png',
    route: routePaths.RECOMMENDATION_GENERAL_INFO,
    children: (
      <>
        Optimize my <br /> Business
      </>
    ),
  },
  sell: {
    iconPath: '/assets/images/journey/price.png',
    route: routePaths.SELLER_READINESS,
    children: (
      <>
        Sell my <br /> Business
      </>
    ),
  },
};

const JourneyPage = () => {
  return (
    <>
      <Container>
        <TitleText className="text-3xl text-center">
          How can we assist you in growing your business?
        </TitleText>
      </Container>
      <JourneyForm choices={choices} />
    </>
  );
};

export default JourneyPage;
