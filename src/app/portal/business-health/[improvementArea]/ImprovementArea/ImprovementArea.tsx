'use client';
import ContainedButton from '@/components/atoms/buttons/ContainedButton';
import LoadingSpinner from '@/components/atoms/loaders/LoadingSpinner';
import ImprovementAreaDialog from '@/components/molecules/dialogs/ImprovementAreaDialog/ImprovementAreaDialog';
import {
  useImprovementArea,
  useServiceCategoryRecommendations,
  useToggleRecommendationCompletion,
} from '@/services/recommendations.service';
import { colors } from '@/theme/theme';
import { Recommendation } from '@/types/recommendations.types';
import { routePaths } from '@/types/routes.enum';
import {
  ArrowBack,
  ArrowDropDown,
  ArrowForward,
  ArrowRight,
  ExpandMore,
  InfoOutlined,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  IconButton,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import './ImprovementArea.scss';

type ImprovementAreaProps = {
  improvementAreaId: number;
};

const ImprovementArea = ({ improvementAreaId }: ImprovementAreaProps) => {
  // STATE
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedRecommendationId, setExpandedRecommendationId] = useState<
    number | undefined
  >();

  // QUERIES
  const { data: improvementArea, isLoading: isLoadingImprovementArea } =
    useImprovementArea({
      id: improvementAreaId,
    });
  const {
    data: recommendationsResponse,
    isLoading: isLoadingRecommendationsResponse,
  } = useServiceCategoryRecommendations({
    improvement_area: improvementAreaId.toString(),
  });

  // MUTATIONS
  const { mutateAsync: toggleComplete } = useToggleRecommendationCompletion();

  // CALCULATED
  const recommendations = recommendationsResponse?.results;
  const completedRecommendationsLength = recommendations?.filter(
    (r) => !!r.dt_done,
  ).length;
  const completedRecommendationsPercent =
    completedRecommendationsLength && recommendations
      ? (completedRecommendationsLength / recommendations.length) * 100
      : 0;
  const isLoading =
    isLoadingImprovementArea || isLoadingRecommendationsResponse;

  // HANDLERS
  const toggleCollapseRecommendation = (
    shouldCollapse: boolean,
    recommendation: Recommendation,
  ) => {
    if (shouldCollapse) {
      setExpandedRecommendationId(undefined);
    } else {
      setExpandedRecommendationId(recommendation.id);
    }
  };

  return (
    <>
      <div>
        <div className="improvementArea__pageHeader">
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            LinkComponent={Link}
            href={routePaths.DASHBOARD}
          >
            Back to DashboardCo
          </Button>
        </div>
        {isLoadingImprovementArea ? (
          <LoadingSpinner />
        ) : (
          <div className="improvementArea__category">
            <div className="flex items-center justify-start gap-2">
              <h1 className="improvementArea__category__name">
                {improvementArea?.name}
              </h1>
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <InfoOutlined />
              </div>
            </div>
          </div>
        )}
        {isLoading ? (
          <div className="w-2/3 mx-auto my-4 rounded-lg bg-gray-200 animate-pulse h-12" />
        ) : (
          <div>
            <div className="improvementArea__progressBar mb-6">
              <p className="improvementArea__progressBar__text">
                <strong>
                  {completedRecommendationsLength}/
                  {recommendations?.length ?? 0}
                </strong>{' '}
                recommendations done
              </p>
              <div className="improvementArea__progressBar__bar">
                <div className="improvementArea__progressBar__bar__full" />
                <div
                  className="improvementArea__progressBar__bar__current"
                  style={{
                    width: `${completedRecommendationsPercent}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="quadruple-gradient mb-12 mt-16 h-1 rounded-full" />

        {recommendations?.map((recommendation) => (
          <div
            key={recommendation.id}
            className={`serviceProvider ${
              expandedRecommendationId !== recommendation.id
                ? 'serviceProvider--collapsed'
                : ''
            }`}
            style={{
              height:
                expandedRecommendationId !== recommendation.id
                  ? '74px'
                  : 'auto',
            }}
          >
            <div className="serviceProvider__header">
              <div className="mb-4 flex items-center gap-2">
                <IconButton
                  onClick={() =>
                    toggleCollapseRecommendation(
                      expandedRecommendationId === recommendation.id,
                      recommendation,
                    )
                  }
                >
                  {expandedRecommendationId !== recommendation.id ? (
                    <ArrowRight />
                  ) : (
                    <ArrowDropDown />
                  )}
                </IconButton>
                <h1 className="serviceProvider__type">
                  {recommendation.service_category.name}
                </h1>
              </div>
              <div className="serviceProvider__subheader">
                <div className="serviceProvider__action flex flex-col gap-4">
                  {recommendation.service_category.action_header && (
                    <p className="serviceProvider__subheader__text mt-2 font-bold">
                      {recommendation.service_category.action_header}
                    </p>
                  )}
                  {recommendation.service_category.action_description && (
                    <p className="serviceProvider__subheader__text">
                      {recommendation.service_category.action_description}
                    </p>
                  )}
                </div>
                <div className="serviceProvider__status">
                  <p className="serviceProvider__status__note">
                    *Mark complete when done
                  </p>
                  <div className="flex items-center">
                    <Checkbox
                      color="primary"
                      checked={!!recommendation.dt_done}
                      onChange={() =>
                        toggleComplete({ recommendationId: recommendation.id })
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                    <Typography>Completed {recommendation.name}</Typography>
                  </div>
                </div>
              </div>
            </div>

            {expandedRecommendationId === recommendation.id && (
              <div className="serviceProvider__body">
                {recommendation.service_category.services.map(
                  (service, index) => (
                    <div
                      key={index}
                      className="serviceProvider__serviceBody flex items-center gap-5 px-4 py-8"
                    >
                      <div className="serviceProvider__info">
                        <h3 className="serviceProvider__name">
                          {service.name}
                        </h3>
                        <div>
                          {service.heading && (
                            <h4 className="serviceProvider__heading">
                              {service.heading}
                            </h4>
                          )}
                          <p className="serviceProvider__description">
                            {service.paragraph}
                          </p>
                        </div>
                        <div>
                          {service.why_choose && (
                            <Accordion>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <h4>Why choose {service.name}</h4>
                              </AccordionSummary>

                              <AccordionDetails>
                                <p>{service.why_choose}</p>
                              </AccordionDetails>
                            </Accordion>
                          )}
                          {service.pros_and_cons && (
                            <Accordion>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <h4>Pros & Cons</h4>
                              </AccordionSummary>

                              <AccordionDetails>
                                <p>{service.pros_and_cons}</p>
                              </AccordionDetails>
                            </Accordion>
                          )}
                        </div>
                      </div>
                      <div className="serviceProvider__right">
                        {service.provider?.logo && (
                          <img
                            className="serviceProvider__logo"
                            src={service.provider.logo}
                            alt={service.name}
                          />
                        )}
                        <ContainedButton
                          href={service.button_url}
                          target="_blank"
                          text={service.button_text}
                          endIcon={<ArrowForward />}
                          backgroundColor={colors.bridgeDarkPurple}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <ImprovementAreaDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        improvementAreaId={improvementAreaId}
      />
    </>
  );
};

export default ImprovementArea;
