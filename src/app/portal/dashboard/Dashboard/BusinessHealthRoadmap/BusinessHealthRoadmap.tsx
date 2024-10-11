import ImprovementAreaDialog from '@/components/molecules/dialogs/ImprovementAreaDialog/ImprovementAreaDialog';
import { useImprovementCategories } from '@/services/recommendations.service';
import { routePaths } from '@/types/routes.enum';
import {
  Check,
  ChevronRight,
  InfoOutlined,
  Map,
  Summarize,
} from '@mui/icons-material';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type BusinessHealthRoadmapProps = {
  hasCompletedOnboarding: boolean;
};

const BusinessHealthRoadmap = ({
  hasCompletedOnboarding,
}: BusinessHealthRoadmapProps) => {
  // STATE
  const [openImprovementAreaDialogId, setOpenImprovementAreaDialogId] =
    useState<number | undefined>();
  // HOOKS
  const router = useRouter();

  // QUERIES
  const { data: improvementCategories, isLoading } = useImprovementCategories();

  // CALCULATED
  const totalStepsByCategory = useMemo(() => {
    const map: Record<number, number> = {};
    improvementCategories?.forEach((category) => {
      const total = category.improvement_areas.reduce(
        (areaAcc: number, area: any) => {
          return areaAcc + area.total;
        },
        0
      );
      map[category.id] = total;
    });
    return map;
  }, [improvementCategories]);

  const completedStepsByCategory = useMemo(() => {
    const map: Record<number, number> = {};
    improvementCategories?.forEach((category) => {
      const total = category.improvement_areas.reduce(
        (areaAcc: number, area: any) => {
          return areaAcc + area.completed;
        },
        0
      );
      map[category.id] = total;
    });
    return map;
  }, [improvementCategories]);

  const completionPercentageByCategory = useMemo(() => {
    const map: Record<number, number> = {};
    improvementCategories?.forEach((category) => {
      if (totalStepsByCategory[category.id] === 0) {
        map[category.id] = 100;
      } else {
        const percentage =
          completedStepsByCategory[category.id] /
          totalStepsByCategory[category.id];
        map[category.id] = Math.round(percentage * 100);
      }
    });
    return map;
  }, [improvementCategories, totalStepsByCategory, completedStepsByCategory]);

  const totalSteps = useMemo(() => {
    return Object.values(totalStepsByCategory).reduce(
      (acc, val) => val + acc,
      0
    );
  }, [totalStepsByCategory]);

  const completedSteps = useMemo(() => {
    return Object.values(completedStepsByCategory).reduce(
      (acc, val) => val + acc,
      0
    );
  }, [completedStepsByCategory]);

  const completionPercentage = useMemo(() => {
    if (!hasCompletedOnboarding) {
      return 62;
    }
    if (totalSteps === 0) {
      return 100;
    }
    return Math.round((completedSteps / totalSteps) * 100);
  }, [hasCompletedOnboarding, completedSteps, totalSteps]);

  return (
    <>
      <div className="w-full rounded-[20px] border border-solid border-bridge-gray-border">
        <div className="flex w-full flex-col gap-6 rounded-[20px] border-0 bg-white p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-start gap-2 mb-4">
            <h3>Business Health Roadmap</h3>
            <button
              className="cursor-pointer text-sm font-semibold text-bridge-dark-purple"
              onClick={() => {
                router.push(routePaths.RECOMMENDATION);
              }}
            >
              Edit survey responses
            </button>
          </div>

          {/* SCORES */}
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-5 w-full">
            {/* BUSINESS HEALTH SCORE */}
            <div className="lg:basis-1 grow shrink flex flex-col min-h-full">
              <div className="flex flex-row items-center justify-start gap-4 px-6 py-3 rounded-t-[20px] bg-[#FEF1E7] h-[86px]">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bridge-orange">
                  <Summarize />
                </div>
                <div className="flex flex-col">
                  {!isLoading ? (
                    <h2 className="text-[32px]">
                      {healthGrade(completionPercentage)}
                    </h2>
                  ) : (
                    <div className="h-8 w-24 animate-pulse bg-gray-300 rounded-full" />
                  )}
                  <p>Business Health Score</p>
                </div>
              </div>
              <div className="border border-t-0 border-solid border-bridge-gray-border rounded-b-[20px] grow flex items-center">
                <div className="px-6 py-3 flex flex-col gap-1 w-full">
                  {!isLoading ? (
                    <>
                      <p className="text-sm">
                        <strong>
                          {healthGradeHeader(completionPercentage)}
                        </strong>
                      </p>
                      <p className="text-xs">
                        {healthGradeDescription(completionPercentage)}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="h-3 w-full animate-pulse bg-gray-300 rounded-full" />
                      <div className="h-3 w-1/2 animate-pulse bg-gray-300 rounded-full" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* OVERALL PROGRESS */}
            <div className="lg:basis-1 grow shrink">
              <div className="flex flex-row items-center justify-start gap-4 px-6 py-3 rounded-t-[20px] bg-[#F1EFFA] h-[86px]">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-bridge-dark-purple text-white">
                  <Map />
                </div>
                <div className="flex flex-col">
                  {!isLoading ? (
                    <h2 className="text-[32px]">{completionPercentage}%</h2>
                  ) : (
                    <div className="h-8 w-24 animate-pulse bg-gray-300 rounded-full" />
                  )}
                  <p>Overall Progress</p>
                </div>
              </div>
              <div className="border border-t-0 border-solid border-bridge-gray-border rounded-b-[20px] self-stretch flex items-center w-full">
                <div className="px-6 py-3 flex flex-col gap-4 w-full">
                  {!isLoading ? (
                    improvementCategories?.map((category) => (
                      <div
                        key={`category-${category.id}`}
                        className="w-full flex items-center gap-2 justify-center"
                      >
                        <p className="min-w-[150px] text-left text-xs">
                          {category.name}
                        </p>
                        <div className="grow shrink bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-bridge-dark-purple h-2 rounded-full"
                            style={{
                              width: `${
                                completionPercentageByCategory[category.id]
                              }%`,
                            }}
                          />
                        </div>
                        <p className="text-xs min-w-[32px]">
                          {completionPercentageByCategory[category.id]}%
                        </p>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="h-4 w-full animate-pulse bg-gray-300 rounded-full" />
                      <div className="h-4 w-full animate-pulse bg-gray-300 rounded-full" />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RECOMMENDATIONS CHECKLIST */}
          {hasCompletedOnboarding && (
            <div className="py-4 space-y-8">
              {!isLoading ? (
                improvementCategories?.map((category) => (
                  <div
                    key={`category-breakdown-${category.id}`}
                    className="flex flex-col gap-4"
                  >
                    <h5 className="text-base">{category.name}</h5>
                    <div className="w-full border border-solid rounded-[20px] border-bridge-gray-border">
                      {category.improvement_areas.map((area, i) => (
                        <div
                          key={`area-${area.id}`}
                          className={clsx(
                            'flex items-start lg:items-center gap-6 px-4 py-6 cursor-pointer',
                            {
                              'rounded-t-[20px]': i === 0,

                              'rounded-b-[20px]':
                                i === category.improvement_areas.length - 1,

                              'bg-[#F8FCED]': area.completed === area.total,
                            }
                          )}
                          onClick={() => {
                            router.push(
                              `${routePaths.BUSINESS_HEALTH}/${area.id}`
                            );
                          }}
                        >
                          {area.completed === area.total ? (
                            <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-[#5DBF6D] rounded-full">
                              <Check className="text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 border-2 border-bridge-gray-border rounded-full shrink-0" />
                          )}
                          <div className="flex flex-col lg:flex-row gap-2 grow">
                            <div className="lg:w-2/3">
                              <div className="flex flex-col md:flex-row md:items-center justify-start gap-2">
                                <div className="flex items-center justify-start gap-1">
                                  <h5 className="text-sm">{area.name}</h5>
                                  <InfoOutlined
                                    className="text-sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenImprovementAreaDialogId(area.id);
                                    }}
                                  />
                                </div>
                                {!area.completed && (
                                  <div
                                    className={clsx(
                                      'rounded-full flex items-center justify-center p-1 w-fit',
                                      {
                                        'bg-[#FCEBE5]': area.priority > 0.5,
                                        'bg-[#FEF6EC]':
                                          area.priority > 0 &&
                                          area.priority <= 0.5,
                                        'bg-[#EDF8F2]': area.priority === 0,
                                      }
                                    )}
                                  >
                                    <p
                                      className={clsx('text-xs', {
                                        'text-[#ED682C]': area.priority > 0.5,
                                        'text-[#F2A83B]':
                                          area.priority > 0 &&
                                          area.priority <= 0.5,
                                        'text-[#B0BEC5]': area.priority === 0,
                                      })}
                                    >
                                      •{' '}
                                      {area.priority > 0.5
                                        ? 'High'
                                        : area.priority > 0
                                          ? 'Medium'
                                          : 'Low'}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">
                                {area.what_is_it}
                              </p>
                            </div>
                            <div className="flex flex-col lg:basis-[200px]">
                              <p className="text-xs">Tasks</p>
                              <div className="flex items-center gap-1 flex-wrap">
                                {area.service_category_recommendations.map(
                                  (recommendation) => (
                                    <div
                                      key={`service-category-${recommendation.id}`}
                                      className={clsx(
                                        'flex items-center px-2 py-[2px] rounded-full w-fit',
                                        {
                                          'bg-[#5DBF6D]':
                                            recommendation.dt_done,
                                          'bg-[#F0F0F0]':
                                            !recommendation.dt_done,
                                        }
                                      )}
                                    >
                                      {recommendation.dt_done && (
                                        <Check
                                          className="text-white text-[16px]"
                                          fontSize="inherit"
                                        />
                                      )}
                                      <p
                                        className={clsx('text-xs', {
                                          'text-white': recommendation.dt_done,
                                        })}
                                      >
                                        {recommendation.service_category.name}
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <ChevronRight />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-10 py-4">
                  <div className="h-20 w-full animate-pulse bg-gray-300 rounded-full" />
                  <div className="h-20 w-full animate-pulse bg-gray-300 rounded-full" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!!openImprovementAreaDialogId && (
        <ImprovementAreaDialog
          improvementAreaId={openImprovementAreaDialogId}
          onClose={() => setOpenImprovementAreaDialogId(undefined)}
          open={!!openImprovementAreaDialogId}
        />
      )}
    </>
  );
};

export default BusinessHealthRoadmap;

const healthGrade = (percentage: number) => {
  if (percentage < 10) {
    return 'F';
  } else if (percentage < 30) {
    return 'C-';
  } else if (percentage < 40) {
    return 'C';
  } else if (percentage < 50) {
    return 'C+';
  } else if (percentage < 60) {
    return 'B-';
  } else if (percentage < 70) {
    return 'B';
  } else if (percentage < 80) {
    return 'B+';
  } else if (percentage < 90) {
    return 'A-';
  } else if (percentage < 100) {
    return 'A';
  } else {
    return 'A+';
  }
};

const healthGradeHeader = (percentage: number): string => {
  if (percentage < 10) {
    return 'Starting Out';
  } else if (percentage < 30) {
    return 'Making Progress';
  } else if (percentage < 50) {
    return 'Not Bad!';
  } else if (percentage < 70) {
    return 'Great Job!';
  } else if (percentage < 90) {
    return 'Excellent Work!';
  } else if (percentage <= 100) {
    return 'Outstanding!';
  } else {
    return 'Error';
  }
};

const healthGradeDescription = (percentage: number): string => {
  if (percentage < 10) {
    return "You're just starting out. Take the first steps to make some progress!";
  } else if (percentage < 30) {
    return "Good effort! You're making progress, but there's still a lot of room for improvement. Keep pushing forward!";
  } else if (percentage < 50) {
    return "Not bad! You're getting there. Focus on the key areas that need attention to boost your score further.";
  } else if (percentage < 70) {
    return "Great job! You're more than halfway there. Keep up the good work and finish strong.";
  } else if (percentage < 90) {
    return "Excellent work! You're very close to reaching your goal. Just a few more adjustments and you'll be there.";
  } else if (percentage <= 100) {
    return "Outstanding! You've achieved an impressive level of completion. Keep maintaining this high standard.";
  } else {
    return 'Completion percentage is out of range.';
  }
};
