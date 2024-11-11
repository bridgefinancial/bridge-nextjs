import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { Card, Container } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import React, { FC } from 'react';

export interface IconCardProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: React.MouseEventHandler<HTMLDivElement> | (() => void) | undefined;
  iconPath: string;
  selected?: boolean;
}

const IconCard: FC<IconCardProps> = ({
  onClick,
  children,
  iconPath,
  selected,
}: IconCardProps) => {
  return (
    <div onClick={onClick}>
      <Card
        className={clsx(
          'bg-white w-200 h-200 border-2px border border-[#949494] rounded-[15px]',
          { 'border-bridge-light-blue shadow-lg': selected },
        )}
      >
        <Container className='flex flex-col items-center justify-evenly w-[160px] h-[200px] md:w-[200px]'>
          <Image
            src={iconPath}
            width={80}
            height={80}
            alt='Chart'
            className='flex-item w-[80px] h-[80px]'
          />
          <ParagraphText className='font-bold text-center flex-item'>
            {children}
          </ParagraphText>
        </Container>
      </Card>
    </div>
  );
};

export default IconCard;
