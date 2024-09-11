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
  const { form, pageIndex, defaultValues, goTo } = useQuestionnaire();
  return (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row items-stretch justify-stretch">
        {/* MOBILE HEADER */}
        <div className="sticky w-screen top-0 md:hidden bg-white">
          <div className="w-full grid grid-cols-3 p-4">
            {/* LEFT MOBILE HEADER */}
            <div>{/* Add any button or icon here if needed */}</div>
            {/* CENTER MOBILE HEADER */}
            <div className="flex items-center justify-center">
              <Link href={routePaths.DASHBOARD}>
                <img
                  className="max-w-[100px]"
                  alt="Bridge Financial logo"
                  src="/assets/images/Bridge-logo.png"
                />
              </Link>
            </div>
            {/* RIGHT MOBILE HEADER */}
            <div></div>
          </div>
          <div className="w-full h-[3px] linear-gradient-orange-purple-blue"></div>
        </div>

        {/* DESKTOP NAV */}
        <div className="h-full grow-0 hidden md:flex flex-col basis-[422px] box-border py-6 pl-4 pr-4 bg-white border-0 border-r border-solid border-gray-300 z-10">
          <Link className="mb-8" href={routePaths.DASHBOARD}>
            <img
              className="max-w-[120px]"
              alt="Bridge logo"
              src="/assets/images/Bridge-logo.png"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-6 items-center">
              <ParagraphText sx={{ fontWeight: "600" }}>
                {form?.name}
              </ParagraphText>
            </div>
            <div className="py-2 flex flex-col gap-2 pl-4">
              {form?.definition?.pages.map((page, j) => (
                <div
                  key={j}
                  className={clsx("flex flex-row items-center gap-4", {
                    "cursor-not-allowed": j > pageIndex && !defaultValues,
                    "cursor-pointer": j < pageIndex || !!defaultValues,
                  })}
                  onClick={() => {
                    if (j < pageIndex || !!defaultValues) {
                      goTo({ pageIndex: j });
                    }
                  }}
                >
                  {pageIndex > j ? (
                    <Check fontSize="inherit" className="text-[16px] mr-2">
                      check
                    </Check>
                  ) : (
                    <Circle
                      fontSize="inherit"
                      className={clsx("text-[8px] mx-2", {
                        "text-bridge-dark-purple": pageIndex === j,
                        "text-gray-400": pageIndex !== j,
                      })}
                    />
                  )}
                  <ParagraphText
                    className={clsx({
                      "font-semibold text-bridge-dark-purple": pageIndex === j,
                      "text-gray-400": pageIndex < j,
                    })}
                  >
                    {page.header}
                  </ParagraphText>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="grow bg-gray-50 w-full overflow-scroll">
          {/* MOBILE PROGRESS */}
          {/* TODO: Implement mobile progress bar if needed */}
          <div className="w-full pt-8 md:pt-6 box-border flex flex-col min-h-full">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionnaireLayout;
