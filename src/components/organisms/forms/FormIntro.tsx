import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { colors } from "@/theme/theme";
import { FormIntro as FormidableFormIntro } from "@/types/forms.types";
import { AccessTime, ArrowForward } from "@mui/icons-material";
import Image from "next/image";
import { ReactNode } from "react";

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
    <div className="w-full pl-8 pr-8 pb-20 bg-white h-full grow flex flex-col-reverse lg:flex-row items-start lg:items-center justify-center">
      {/* Text content */}
      <div className="flex flex-col gap-8 max-w-[500px] p-4">
        {!!stepper && stepper}
        <div className="flex flex-col gap-8 px-2">
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
            />
          </div>
        </div>
      </div>

      {/* Image container */}
      <div className="p-4 rounded-lg h-[250px] lg:h-[500px] lg:max-w-[500px] w-full">
        <Image
          src={imageSrc}
          alt="Form intro picture"
          width={500}
          height={500}
          style={{
            objectFit: "cover", // Adjust the fit of the image
            borderRadius: "8px", // Rounded corners for the image
            height: "100%", // Ensure the image takes the full height
            width: "100%", // Ensure the image takes the full width
          }}
        />
      </div>
    </div>
  );
};

export default FormIntro;
