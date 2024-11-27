'use client';

import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import TitleText from '@/components/atoms/typography/TitleText';
import { useCelebration } from '@/hooks/useCelebration';
import { colors } from '@/theme/theme';
import { routePaths } from '@/types/routes.enum';
import Image from 'next/image';

type OfferSuccessPageProps = {
  iconPath: string;
};

const OfferSuccessPage = async ({ iconPath }: OfferSuccessPageProps) => {
  useCelebration();
  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="border border-bridge-gray-border rounded-lg bg-white p-8 flex flex-col items-center justify-center gap-4">
        <Image
          src={iconPath}
          width={80}
          height={80}
          alt="Chart"
          className="flex-item w-[80px] h-[80px]"
        />
        <TitleText
          variant="h1"
          component="h1"
          gutterBottom={false}
          textAlign="center"
        >
          Payment Successful
        </TitleText>
        <ParagraphText className="text-center">
          We’ll now begin the process of evaluating your business.
        </ParagraphText>
        <ContainedButton
          text="Back to Dashboard"
          href={routePaths.DASHBOARD}
          backgroundColor={colors.bridgeDarkPurple}
        ></ContainedButton>
      </div>
    </div>
  );
};

export default OfferSuccessPage;
