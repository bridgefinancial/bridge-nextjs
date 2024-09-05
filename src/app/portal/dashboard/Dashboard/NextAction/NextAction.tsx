import ContainedButton from "@/components/atoms/buttons/ContainedButton";
import { Recommendation } from "@/types/recommendations.types";
import { routePaths } from "@/types/routes.enum";
import { useRouter } from "next/navigation";
import React from "react";
import "./NextAction.scss";

type NextActionProps = {
  recommendation: Recommendation;
};

const NextAction = ({ recommendation }: NextActionProps) => {
  // HOOKS
  const router = useRouter();

  return (
    <div className="vertical-purple-gradient relative flex h-full w-full items-stretch justify-between rounded-[20px]">
      <div className="flex shrink grow-0 basis-[550px] flex-col justify-between gap-8 py-6 pl-6 pr-28">
        {recommendation ? (
          <>
            <div className="space-y-1">
              <h3 className="text-white">
                {recommendation.service_category.action_header}
              </h3>
              <p className="text-sm text-white">
                {recommendation.service_category.action_description}
              </p>
            </div>
            <ContainedButton
              text="Learn more"
              onClick={() => {
                router.push(
                  `${routePaths.PORTAL}/${recommendation.service_category.action_header}`
                );
              }}
            ></ContainedButton>
          </>
        ) : (
          <div className="space-y-1">
            <h3 className="text-white">All Actions Complete</h3>
            <p className="text-sm text-white">You're all done, congrats!</p>
          </div>
        )}
      </div>
      <div className="absolute right-0 top-0 h-full w-full bg-[url('/assets/images/transparent-cards.png')] bg-contain bg-right bg-no-repeat"></div>
    </div>
  );
};

export default NextAction;
