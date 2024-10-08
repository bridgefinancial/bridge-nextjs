import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { colors } from "@/theme/theme";
import { FormIntro as FormidableFormIntro } from "@/types/forms.types";
import { AccessTime, ArrowForward } from "@mui/icons-material";
import React, { ReactNode } from "react";

type FormIntroProps = {
  onClick: () => void;
  stepper?: ReactNode;
} & FormidableFormIntro;

const FormIntro = ({
  imageSrc,
  welcomeHeading,
  heading,
  subheading,
  timeEstimate,
  buttonText,
  stepper,
  onClick,
}: FormIntroProps) => {
  return (
    <div className="w-full p-8 bg-white h-full grow flex flex-col-reverse lg:flex-row items-start lg:items-center justify-center">
      <div className="flex flex-col gap-8 max-w-[500px] p-4">
        {!!stepper && stepper}
        <div className="flex flex-col gap-1">
          {!!welcomeHeading && (
            <ParagraphText color={colors.gray600}>
              {welcomeHeading}
            </ParagraphText>
          )}
          <h1>{heading}</h1>
        </div>
        <ParagraphText>{subheading}</ParagraphText>
        {!!timeEstimate && (
          <div className="flex items-center justify-start gap-1">
            <AccessTime />
            <ParagraphText>{timeEstimate}</ParagraphText>
          </div>
        )}
        <div>
          <ContainedButton
            backgroundColor={colors.bridgeDarkPurple}
            text={buttonText ?? "Get Started"}
            onClick={onClick}
            endIcon={<ArrowForward />}
          ></ContainedButton>
        </div>
      </div>
      <div className="p-4 rounded-lg object-cover h-[250px] lg:h-[500px] lg:max-w-[500px]">
        <img
          alt="Form intro picture"
          src={imageSrc}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default FormIntro;
