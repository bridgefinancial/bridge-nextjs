"use client";

import React from "react";
import Valuation from "./Valuation/Valuation";
import NextAction from "./NextAction/NextAction";
import BusinessHealthRoadmap from "./BusinessHealthRoadmap/BusinessHealthRoadmap";
import LockedContent from "./LockedContent/LockedContent";
import { useRouter } from "next/navigation";
import { routePaths } from "@/types/routes.enum";
import { useSessionUser } from "@/services/users.service";
import { useNextRecommendations } from "@/services/recommendations.service";

const Dashboard = () => {
  // HOOKS
  const router = useRouter();

  // QUERIES
  const { data: user, isLoading: isLoadingUser } = useSessionUser();
  const { data: nextActions, isLoading: isLoadingNextAction } =
    useNextRecommendations();

  // CALCULATED
  const hasCompletedOnboarding = !!user?.company?.has_finished_onboarding;
  const hasValuation = !!user?.company?.valuation;

  return (
    <div className="flex flex-col items-stretch w-full gap-6 py-4">
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
        <div className="grow shrink basis-0">
          {isLoadingUser ? (
            <div className="bg-gray-200 animate-pulse h-60 rounded-[20px]"></div>
          ) : (
            <LockedContent
              body="Estimate the value of your business!"
              buttonLabel="Finish Valuation"
              blurred={!hasValuation}
              onAction={() => {
                router.push(routePaths.VALUATION);
              }}
            >
              <Valuation />
            </LockedContent>
          )}
        </div>

        <div className="grow shrink basis-0">
          {isLoadingNextAction ? (
            <div className="bg-gray-200 animate-pulse h-60 rounded-[20px]"></div>
          ) : (
            <LockedContent
              body="Get personalized next steps for your business by completing your business profile!"
              buttonLabel="Complete Profile"
              blurred={!hasCompletedOnboarding}
              onAction={() => {
                router.push(routePaths.RECOMMENDATION);
              }}
            >
              <NextAction recommendations={nextActions} />
            </LockedContent>
          )}
        </div>
      </div>

      {isLoadingUser ? (
        <div className="bg-gray-200 animate-pulse h-60 rounded-[20px] w-full"></div>
      ) : (
        <LockedContent
          body="Access your business roadmap and recommendations by completing your business profile!"
          blurred={!hasCompletedOnboarding}
          onAction={() => {
            router.push(routePaths.RECOMMENDATION);
          }}
        >
          <BusinessHealthRoadmap
            hasCompletedOnboarding={hasCompletedOnboarding}
          />
        </LockedContent>
      )}
    </div>
  );
};

export default Dashboard;
