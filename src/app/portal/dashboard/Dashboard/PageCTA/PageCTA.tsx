'use client';

import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { colors } from '@/theme/theme';
import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';

type PageCTAProps = {
  imageSrc: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

const PageCTA = ({
  imageSrc,
  title,
  description,
  buttonText,
  buttonHref,
}: PageCTAProps) => {
  return (
    <div className="flex h-full flex-col items-start justify-between gap-6 rounded-[20px] border border-solid border-bridge-gray-border bg-white p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6">
            <Image src={imageSrc} layout="fill" alt="icon" />
          </div>
          <p className="text-[20px] font-semibold">{title}</p>
        </div>
        <div>
          <ParagraphText className="text-left">{description}</ParagraphText>
        </div>
      </div>
      <div className="w-full">
        <Link href={buttonHref}>
          <ContainedButton
            endIcon={<ArrowForward />}
            text={buttonText}
            fullWidth
            backgroundColor={colors.bridgeDarkPurple}
          ></ContainedButton>
        </Link>
      </div>
    </div>
  );
};

export default PageCTA;
