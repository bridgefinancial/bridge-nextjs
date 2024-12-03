import { FormidableForm } from '@/types/forms.types';
import { baseUrls } from '@/utils/env-variables';
import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query';

// Use static django json files
const BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL ?? baseUrls.api.full;

const PUBLIC_QUESTIONNAIRE_JSON_BUCKET_PREFIX = `${BASE_URL}/static/bridge_portal/q`;

export const getFormById = (id: number) => {
  const url = `${PUBLIC_QUESTIONNAIRE_JSON_BUCKET_PREFIX}/${id}.json`;
  return fetch(url, { cache: 'force-cache', next: { revalidate: 7200 } }).then(
    (response) => {
      return response.json() as Promise<FormidableForm>;
    }
  );
};

const getFormJsonQueryVariables = (
  id: number
): UseQueryOptions<FormidableForm> => {
  return {
    queryKey: ['formjson', id],
    queryFn: () => getFormById(id),
  };
};

export const useFormJson = (
  id: number,
  options?: { onSuccess?: () => void }
) => {
  return useQuery(getFormJsonQueryVariables(id));
};

export const useMultipleFormJson = (ids: number[]) => {
  return useQueries({
    queries: ids.map((id) => getFormJsonQueryVariables(id)),
  });
};

export const VALUATION_FORM_ID = 8;

export const RECOMMENDATION_GENERAL_INFO_FORM_ID = 9;
export const RECOMMENDATION_BUSINESS_OFFERING_FORM_ID = 10;
export const RECOMMENDATION_MARKETING_FORM_ID = 11;
export const RECOMMENDATION_CONVERSION_FORM_ID = 12;
export const RECOMMENDATION_SYSTEMS_FORM_ID = 13;

export const SELLER_READINESS_FORM_ID = 14;
export const SELLER_READINESS_FINANCES_FORM_ID = 15;
export const SELLER_READINESS_REASON_FORM_ID = 16;
export const SELLER_READINESS_MARKET_FORM_ID = 17;
export const SELLER_READINESS_OPERATIONS_FORM_ID = 18;
export const SELLER_READINESS_GROWTH_POTENTIAL_FORM_ID = 19;
