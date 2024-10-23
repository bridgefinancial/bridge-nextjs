import { Step, StepButton, Stepper } from '@mui/material';
import Link from 'next/link';

export type Step = {
  label: string;
  isCompleted: boolean;
  href: string;
};

export type StepsProps = {
  activeStepIndex: number;
  steps: Step[];
};

const Steps = ({ steps, activeStepIndex }: StepsProps) => {
  return (
    <Stepper nonLinear activeStep={activeStepIndex} alternativeLabel={true}>
      {steps.map(({ label, isCompleted, href }, index) => {
        return (
          <Step key={label} completed={isCompleted}>
            <StepButton color="inherit" LinkComponent={Link} href={href}>
              {label}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
