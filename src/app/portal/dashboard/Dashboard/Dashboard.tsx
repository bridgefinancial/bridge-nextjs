'use client';

import { useOnboardingCompletion } from '@/hooks/useOnboardingCompletion.hook';
import { useTasksCompletion } from '@/services/recommendations.service';
import { useSessionUser } from '@/services/users.service';
import { FormidableForm } from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import Calendar from './Calendar/Calendar';
import LockedContent from './LockedContent/LockedContent';
import OnboardingProgress from './OnboardingProgress/OnboardingProgress';
import PageCTA from './PageCTA/PageCTA';
import Valuation from './Valuation/Valuation';

type DashboardProps = {
  sellerReadinessForms: FormidableForm[];
  // valuationForms: FormidableForm[];
  optimizationForms: FormidableForm[];
};



// my reasoning for commenting out valuation forms is that it was a unused variable.
// i don't think we should be making any more requests than we have to
// I commented it out rather than removing it just in case we decide we are reusing it later

const Dashboard = ({
  sellerReadinessForms,
  // valuationForms,
  optimizationForms,
}: DashboardProps) => {
  // HOOKS
  const { completionPercentage } = useTasksCompletion();

  // QUERIES
  const { data: user, isLoading: isLoadingUser } = useSessionUser();
  const {
    isLoading: isLoadingOptimization,
    hasStartedOnboarding: hasStartedOptimization,
  } = useOnboardingCompletion(optimizationForms);
  const {
    hasStartedOnboarding: hasStartedSellerReadiness,
    hasCompletedOnboarding: hasCompletedSellerReadiness,
  } = useOnboardingCompletion(sellerReadinessForms);

  // CALCULATED
  const hasValuation = !!user?.company?.valuation;

  return (
    <div className="flex flex-col items-stretch w-full gap-6 py-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
        <div className="grow shrink basis-0">
          {isLoadingUser ? (
            <div className="bg-gray-200 animate-pulse h-full min-h-[300px] rounded-[20px]" />
          ) : (
            <LockedContent
              body={
                hasStartedSellerReadiness
                  ? 'Prepare to sell your business'
                  : 'Estimate the value of your business'
              }
              buttonLabel={
                hasStartedSellerReadiness
                  ? 'Complete Onboarding'
                  : 'Finish Valuation'
              }
              blurred={
                hasStartedSellerReadiness
                  ? !hasCompletedSellerReadiness
                  : !hasValuation
              }
              buttonHref={
                hasStartedSellerReadiness
                  ? routePaths.SELLER_READINESS
                  : routePaths.VALUATION
              }
            >
              <Valuation />
            </LockedContent>
          )}
        </div>
        <div className="grow shrink basis-0">
          <LockedContent
            body="Get personalized next steps for your business by completing your business profile!"
            buttonLabel="Complete Profile"
            blurred={!hasStartedOptimization}
            isLoading={isLoadingOptimization}
            buttonHref={routePaths.RECOMMENDATION}
          >
            <OnboardingProgress forms={optimizationForms} />
          </LockedContent>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
        <div className="grow shrink basis-0">
          <PageCTA
            imageSrc="/assets/images/journey/chart.png"
            title="Get a Certified Valuation"
            description="A certified valuation offers an unbiased assessment of your business’s worth, perfect for planning or investment. This paid service delivers a reliable, professional report."
            buttonText="Get My Valuation"
            buttonHref={routePaths.CERTIFIED_VALUATION}
          />
        </div>
        <div className="grow shrink basis-0">
          <PageCTA
            imageSrc="/assets/images/journey/revenue.png"
            title="Business Optimization"
            description="Our business optimization service aims to streamline operations, reduce costs, and support growth, offered as a paid service."
            buttonText="Start Optimizing"
            buttonHref={routePaths.OPTIMIZATION_PACKAGE}
          />
        </div>
        <div className="grow shrink basis-0">
          <PageCTA
            imageSrc="/assets/images/journey/price.png"
            title="Sell My Business"
            description="Get expert support to maximize your business’s value while we connect you with potential buyers. Start the journey."
            buttonText="Connect with an Advisor"
            buttonHref={routePaths.SELLER_READINESS_PACKAGE}
          />
        </div>
      </div>
      <div className="w-full">
        <Calendar user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
