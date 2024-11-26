import { PaginatedResponse } from '@/types/api.types';
import {
  ImprovementArea,
  ImprovementCategory,
  Recommendation,
} from '@/types/recommendations.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchWithAuth } from './authorized-request.service';

export const getNextActionRecommendations = async (): Promise<
  Recommendation[]
> => {
  const url = '/api/service-category-recommendations/get_next_action/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useNextRecommendations = () => {
  return useQuery({
    queryFn: getNextActionRecommendations,
    queryKey: ['next-action-recommendation'],
  });
};

// Function to fetchWithAuth improvement areas
const getImprovementAreas = async () => {
  const url = '/api/improvement-areas/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type GetImprovementAreaRequest = {
  id: number;
};

// Function to fetchWithAuth improvement area by ID
const getImprovementArea = async ({
  id,
}: GetImprovementAreaRequest): Promise<ImprovementArea> => {
  const url = `/api/improvement-areas/${id}`;

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useImprovementArea = (variables: GetImprovementAreaRequest) => {
  return useQuery({
    queryFn: () => getImprovementArea(variables),
    queryKey: ['improvement-area', variables],
  });
};

// Function to fetchWithAuth improvement categories
const getImprovementCategories = async (): Promise<ImprovementCategory[]> => {
  const url = '/api/improvement-categories/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useImprovementCategories = () => {
  return useQuery({
    queryFn: getImprovementCategories,
    queryKey: ['improvement-categories'],
  });
};

export const useTasksCompletion = () => {
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
        0,
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
        0,
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
      0,
    );
  }, [totalStepsByCategory]);

  const completedSteps = useMemo(() => {
    return Object.values(completedStepsByCategory).reduce(
      (acc, val) => val + acc,
      0,
    );
  }, [completedStepsByCategory]);

  const completionPercentage = useMemo(() => {
    if (totalSteps === 0) {
      return 100;
    }
    return Math.round((completedSteps / totalSteps) * 100);
  }, [completedSteps, totalSteps]);

  return { completionPercentage };
};

// Function to fetchWithAuth services
const getServices = async () => {
  const url = '/api/services/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetchWithAuth service categories
const getServiceCategories = async () => {
  const url = '/api/service-categories/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetchWithAuth service providers
const getServiceProviders = async () => {
  const url = '/api/service-providers/';

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type GetServiceCategoryRecommendationsRequest = {
  improvement_area?: string;
};

type GetServiceCategoryRecommendationsResponse =
  PaginatedResponse<Recommendation>;

// Function to fetchWithAuth service category recommendations
const getServiceCategoryRecommendations = async (
  variables: GetServiceCategoryRecommendationsRequest,
): Promise<GetServiceCategoryRecommendationsResponse> => {
  const searchParams = new URLSearchParams(variables);
  const url = `/api/service-category-recommendations/?${searchParams.toString()}`;

  const response = await fetchWithAuth(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useServiceCategoryRecommendations = (
  variables: GetServiceCategoryRecommendationsRequest,
) => {
  return useQuery({
    queryFn: () => getServiceCategoryRecommendations(variables),
    queryKey: ['service-category-recommendations', variables],
  });
};

type UpdateRecommendationCompletionVariables = {
  recommendationId: number;
};

export const toggleRecommendationCompletion = async ({
  recommendationId,
}: UpdateRecommendationCompletionVariables): Promise<Recommendation> => {
  const url = `/api/service-category-recommendations/${recommendationId}/toggle_complete/`;

  const response = await fetchWithAuth(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Include other headers if needed, like Authorization
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const useToggleRecommendationCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleRecommendationCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['service-category-recommendations'],
      });
    },
  });
};

export {
  getImprovementArea,
  getImprovementAreas,
  getImprovementCategories,
  getServiceCategories,
  getServiceCategoryRecommendations,
  getServiceProviders,
  getServices,
};
