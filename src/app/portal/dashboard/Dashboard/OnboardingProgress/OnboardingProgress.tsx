import { useOnboardingCompletion } from '@/services/form-submissions.service';
import { useTasksCompletion } from '@/services/recommendations.service';
import BusinessHealthScore from '../BusinessHealthRoadmap/BusinessHealthScore';
import QuestionnaireProgress from './QuestionnaireProgress';

type OnboardingProgressProps = {};

const OnboardingProgress = ({}: OnboardingProgressProps) => {
  // HOOKS
  const { completionPercentage } = useTasksCompletion();
  const { hasCompletedOnboarding, completion } = useOnboardingCompletion();

  if (hasCompletedOnboarding) {
    return (
      <BusinessHealthScore
        completionPercentage={completionPercentage}
        isLoading={false}
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-start justify-between gap-6 rounded-[20px] border border-solid border-bridge-gray-border bg-white p-6">
      <p className="text-[20px] font-semibold">Blueprint Survey</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-full">
        {completion.map((value) => {
          return (
            <QuestionnaireProgress
              title={value.title}
              completionPercentage={value.completionPercentage}
              href={value.href}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingProgress;
