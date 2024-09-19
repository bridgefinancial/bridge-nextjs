"use client";

import ParagraphText from "@/components/atoms/typography/ParagraphText";
import { useQuestionnaire } from "@/providers/Questionnaire.provider";
import { routePaths } from "@/types/routes.enum";
import { Check, Circle } from "@mui/icons-material";
import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";

type QuestionnaireLayoutProps = {
  children?: ReactNode;
};

const QuestionnaireLayout = ({ children }: QuestionnaireLayoutProps) => {
  const { form, pageIndex, goTo } = useQuestionnaire();
  return (
    <>
      <div className="h-screen w-screen flex flex-col items-stretch justify-stretch">
        {/* MOBILE HEADER */}
        <div className="sticky w-screen top-0 md:hidden bg-white">
          <div className="w-full grid grid-cols-3 p-4">
            {/* LEFT MOBILE HEADER */}
            <div>{/* Add any button or icon here if needed */}</div>
            {/* CENTER MOBILE HEADER */}
            <div className="flex items-center justify-center">
              {/* <Link href={routePaths.DASHBOARD}> */}
                <img
                  className="max-w-[100px]"
                  alt="Bridge Financial logo"
                  src="/assets/images/Bridge-logo.png"
                />
              {/* </Link> */}
            </div>
            {/* RIGHT MOBILE HEADER */}
            <div></div>
          </div>
          <div className="w-full h-[3px] linear-gradient-orange-purple-blue"></div>
        </div>

        {/* DESKTOP NAV */}
        <div className="w-full grow-0 hidden md:flex flex-col box-border py-7 px-16 bg-white z-10">
          {/* <Link href={routePaths.DASHBOARD}> */}
            <img
              className="max-w-[120px]"
              alt="Bridge logo"
              src="/assets/images/Bridge-logo.png"
            />
          {/* </Link> */}
        </div>

        {/* BODY */}
        <div className="grow bg-white overflow-scroll w-full">
          {/* MOBILE PROGRESS */}
          {/* TODO: Implement mobile progress bar if needed */}
          <div className="pt-8 md:pt-6 box-border flex flex-col min-h-full mx-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireLayout;
