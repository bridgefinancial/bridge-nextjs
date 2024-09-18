"use client";

import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import GradientBox from "@/components/atoms/containers/GradientBox";
import ParagraphText from "@/components/atoms/typography/ParagraphText";
import TitleText from "@/components/atoms/typography/TitleText";
import { colors } from "@/theme/theme";
import { ArrowForward } from "@mui/icons-material";
// import React from 'react';linear-gradient(234.13deg, #fb9f1e 5.37%, #a395f7 30.76%, #6ba0f1 69.06%, #bce762 91.78%);

const BluePrintCard = () => {
  return (
    <div className="w-full flex items-center justify-center pt-16">
      <GradientBox
        containerStyle={{ padding: 0.2, borderRadius: 22 }}
        direction={"234.13deg"}
        colors={[
          "#fb9f1e 5.37%",
          "#a395f7 30.76%",
          "#6ba0f1 69.06%",
          "#6ba0f1 69.06%",
          "#bce762 91.78%",
        ]}
      >
        <div className="gradient-border p-[2px]">
          <div className="bg-white py-8 px-16 flex flex-col items-center gap-8 rounded-[20px]">
            <img
              src="/assets/images/blueprint.png"
              alt="Blueprint"
              className="w-[120px] h-[120px]"
            />
            <div className="flex flex-col gap-4 text-center max-w-[512px]">
              <TitleText
                sx={{
                  fontSize: 24,
                }}
                component={"h2"}
              >
                A blueprint made just for you.
              </TitleText>
              <ParagraphText
                sx={{
                  fontWeight: 600,
                }}
              >
                Take a look at your completed blueprint. This is made to help
                guide you see the gaps and strengths in your business, and then
                attack them with strategy that is backed by years of experience.
              </ParagraphText>
            </div>
            <a
              href="https://bridge.financial/contact-us/"
              className="mat-flat-button text-white bg-primary px-4 py-2 rounded-md flex items-center gap-2"
            >
              <ContainedButton
                text={"Contact us to get a blueprint"}
                backgroundColor={colors.bridgeDarkPurple}
                endIcon={<ArrowForward />}
              />
            </a>
          </div>
        </div>
      </GradientBox>
    </div>
  );
};

export default BluePrintCard;
