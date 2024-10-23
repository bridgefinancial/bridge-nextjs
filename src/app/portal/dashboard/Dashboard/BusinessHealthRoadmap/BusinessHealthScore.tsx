import { routePaths } from '@/types/routes.enum';
import { Summarize } from '@mui/icons-material';
import Link from 'next/link';

type BusinessHealthScoreProps = {
  isLoading?: boolean;
  completionPercentage: number;
};

const BusinessHealthScore = ({
  isLoading,
  completionPercentage,
}: BusinessHealthScoreProps) => {
  return (
    <div className="lg:basis-1 grow shrink flex flex-col min-h-full">
      <div className="flex flex-row items-center justify-start gap-4 px-6 py-3 rounded-t-[20px] bg-[#FEF1E7] h-[86px]">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bridge-orange">
          <Summarize />
        </div>
        <div className="flex flex-col">
          {!isLoading ? (
            <h2 className="text-[32px]">{healthGrade(completionPercentage)}</h2>
          ) : (
            <div className="h-8 w-24 animate-pulse bg-gray-300 rounded-full" />
          )}
          <p>Business Health Score</p>
        </div>
      </div>
      <div className="border border-t-0 border-solid border-bridge-gray-border rounded-b-[20px] grow flex flex-col items-start justify-between py-2">
        <div className="px-6 py-3 flex flex-col gap-1 w-full">
          {!isLoading ? (
            <>
              <p className="text-md">
                <strong>{healthGradeHeader(completionPercentage)}</strong>
              </p>
              <p className="text-sm">
                {healthGradeDescription(completionPercentage)}
              </p>
            </>
          ) : (
            <>
              <div className="h-3 w-full animate-pulse bg-gray-300 rounded-full" />
              <div className="h-3 w-1/2 animate-pulse bg-gray-300 rounded-full" />
            </>
          )}
        </div>
        <div className="px-6 py-3 flex flex-col gap-1 w-full">
          <Link
            className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
            href={routePaths.RECOMMENDATION}
          >
            Edit Blueprint Survey Responses
          </Link>
        </div>
      </div>
    </div>
  );
};

const healthGrade = (percentage: number) => {
  if (percentage < 10) {
    return 'F';
  } else if (percentage < 30) {
    return 'C-';
  } else if (percentage < 40) {
    return 'C';
  } else if (percentage < 50) {
    return 'C+';
  } else if (percentage < 60) {
    return 'B-';
  } else if (percentage < 70) {
    return 'B';
  } else if (percentage < 80) {
    return 'B+';
  } else if (percentage < 90) {
    return 'A-';
  } else if (percentage < 100) {
    return 'A';
  } else {
    return 'A+';
  }
};

const healthGradeHeader = (percentage: number): string => {
  if (percentage < 10) {
    return 'Starting Out';
  } else if (percentage < 30) {
    return 'Making Progress';
  } else if (percentage < 50) {
    return 'Not Bad!';
  } else if (percentage < 70) {
    return 'Great Job!';
  } else if (percentage < 90) {
    return 'Excellent Work!';
  } else if (percentage <= 100) {
    return 'Outstanding!';
  } else {
    return 'Error';
  }
};

const healthGradeDescription = (percentage: number): string => {
  if (percentage < 10) {
    return "You're just starting out. Take the first steps to make some progress!";
  } else if (percentage < 30) {
    return "Good effort! You're making progress, but there's still a lot of room for improvement. Keep pushing forward!";
  } else if (percentage < 50) {
    return "Not bad! You're getting there. Focus on the key areas that need attention to boost your score further.";
  } else if (percentage < 70) {
    return "Great job! You're more than halfway there. Keep up the good work and finish strong.";
  } else if (percentage < 90) {
    return "Excellent work! You're very close to reaching your goal. Just a few more adjustments and you'll be there.";
  } else if (percentage <= 100) {
    return "Outstanding! You've achieved an impressive level of completion. Keep maintaining this high standard.";
  } else {
    return 'Completion percentage is out of range.';
  }
};

export default BusinessHealthScore;
