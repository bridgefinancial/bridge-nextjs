'use client';
import IconCard, { IconCardProps } from '@/components/molecules/cards/IconCard';
import FormFooter from '@/components/organisms/FormFooter/FormFooter.component';
import { FormActionConfig } from '@/components/organisms/forms/FormAction';
import { Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export interface JourneyFormProps {
  choices: Record<string, IconCardProps & { route: string }>;
}

const JourneyForm = ({ choices }: JourneyFormProps) => {
  const [choice, setChoice] = useState<string | null>(null);

  const nextButtonConfig: FormActionConfig = useMemo(
    () => ({
      hidden: false,
      isLoading: false,
      disabled: choice === null,
      text: 'Next',
      href: choice === null ? undefined : choices[choice].route,
    }),
    [choice, choices],
  );

  return (
    <>
      <Container className='flex flex-wrap items-center content-start justify-start h-full gap-6 mt-12 sm:px-16 sm:justify-center lg:gap-12'>
        {Object.keys(choices).map((c) => (
          <IconCard
            onClick={() => setChoice(c)}
            selected={choice === c}
            key={c}
            iconPath={choices[c].iconPath}
          >
            {choices[c].children}
          </IconCard>
        ))}
      </Container>
      <FormFooter
        isScrolling={false}
        previousButtonConfig={{
          hidden: true,
          disabled: true,
          isLoading: false,
          text: '',
          onClick: undefined,
        }}
        submitButtonConfig={{
          hidden: true,
          disabled: true,
          isLoading: false,
          text: '',
          onClick: undefined,
        }}
        nextButtonConfig={nextButtonConfig}
        className='justify-end'
      />
    </>
  );
};

export default JourneyForm;
