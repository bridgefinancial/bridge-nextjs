'use client';

import { useOnboardingCompletion } from '@/hooks/useOnboardingCompletion.hook';
import { useTasksCompletion } from '@/services/recommendations.service';
import { useSessionUser } from '@/services/users.service';
import { FormidableForm } from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import Calendar from './Calendar/Calendar';
import LockedContent from './LockedContent/LockedContent';
import OnboardingProgress from './OnboardingProgress/OnboardingProgress';
import Valuation from './Valuation/Valuation';

type DashboardProps = {
  forms: FormidableForm[];
};

const Dashboard = ({ forms }: DashboardProps) => {
  // HOOKS
  const { completionPercentage } = useTasksCompletion();

  // QUERIES
  const { data: user, isLoading: isLoadingUser } = useSessionUser();
  const { hasStartedOnboarding, hasCompletedOnboarding } =
    useOnboardingCompletion(forms);

  // CALCULATED
  const hasValuation = !!user?.company?.valuation;

  return (
    <div className="flex flex-col items-stretch w-full gap-6 py-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
        <div className="grow shrink basis-0">
          {isLoadingUser ? (
            <div className="bg-gray-200 animate-pulse h-60 rounded-[20px]" />
          ) : (
            <LockedContent
              body="Estimate the value of your business!"
              buttonLabel="Finish Valuation"
              blurred={!hasValuation}
              buttonHref={routePaths.VALUATION}
            >
              <Valuation />
            </LockedContent>
          )}
        </div>
        <div className="grow shrink basis-0">
          <LockedContent
            body="Get personalized next steps for your business by completing your business profile!"
            buttonLabel="Complete Profile"
            blurred={!hasStartedOnboarding}
            buttonHref={routePaths.RECOMMENDATION}
          >
            <OnboardingProgress forms={forms} />
          </LockedContent>
        </div>
      </div>
      <div className="w-full">
        <Calendar user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
