import { LinearProgress } from '@mui/material';
import Link from 'next/link';
import { useMemo } from 'react';

type QuestionnaireProgressProps = {
  title: string;
  completionPercentage: number;
  href: string;
};

const QuestionnaireProgress = ({
  title,
  completionPercentage,
  href,
}: QuestionnaireProgressProps) => {
  const linkText = useMemo(() => {
    if (completionPercentage >= 100) {
      return 'Review';
    } else if (completionPercentage > 0) {
      return 'Finish';
    } else {
      return 'Start';
    }
  }, [completionPercentage]);

  return (
    <Link href={href} className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <p className="text-[14px] font-semibold">{title}</p>
        <Link
          className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
          href={href}
        >
          {linkText}
        </Link>
      </div>
      <LinearProgress variant="determinate" value={completionPercentage} />
    </Link>
  );
};

export default QuestionnaireProgress;
