import { Step, StepLabel, Stepper } from "@mui/material";

export type Step = {
  label: string;
  isCompleted: boolean;
};

export type StepsProps = {
  activeStepIndex: number;
  steps: Step[];
};

const Steps = ({ steps, activeStepIndex }: StepsProps) => {
  return (
    <Stepper activeStep={activeStepIndex} alternativeLabel>
      {steps.map(({ label, isCompleted }, index) => {
        return (
          <Step key={label} completed={isCompleted}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default Steps;
