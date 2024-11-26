import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import { Recommendation } from '@/types/recommendations.types';
import { routePaths } from '@/types/routes.enum';
import { useRouter } from 'next/navigation';
import React from 'react';
import './NextAction.scss';
import { colors } from '@/theme/theme';
import { ArrowForward } from '@mui/icons-material';

type NextActionProps = {
  recommendations?: Recommendation[];
};

const NextAction = ({ recommendations = [] }: NextActionProps) => {
  // HOOKS
  const router = useRouter();

  return (
    <div className="vertical-purple-gradient relative flex h-full w-full items-stretch justify-between rounded-[20px]">
      <div className="flex shrink grow-0 basis-[550px] flex-col justify-between gap-8 py-6 pl-6 pr-28 z-10">
        {recommendations.length > 0 ? (
          <>
            <div className="space-y-1">
              <h3 className="text-white">
                {recommendations[0].service_category.action_header}
              </h3>
              <p className="text-sm text-white">
                {recommendations[0].service_category.action_description}
              </p>
            </div>
            <ContainedButton
              text="Learn more"
              href={`${routePaths.BUSINESS_HEALTH}/${recommendations[0].service_category?.improvement_area}`}
              disabled={false}
              backgroundColor="white"
              textColor={colors.bridgeDarkPurple}
              endIcon={<ArrowForward />}
            />
          </>
        ) : (
          <div className="space-y-1">
            <h3 className="text-white">All Actions Complete</h3>
            <p className="text-sm text-white">You're all done, congrats!</p>
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 h-full w-full bg-[url('/assets/images/transparent-cards.png')] bg-contain bg-right bg-no-repeat" />
    </div>
  );
};

export default NextAction;
