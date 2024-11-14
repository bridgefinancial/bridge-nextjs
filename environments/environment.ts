import { baseUrls } from '@/utils/env-variables';

export const environment = {
  GOOGLE_ANALYTICS_ID: process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'] ?? '',
  ROLLBAR_ACCESS_TOKEN:
    process.env['NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN'] ??
    '26a9695b30054699ae5a8df321ffba09',
  DJANGO_API_BASE_URL:
    process.env['NEXT_PUBLIC_DJANGO_API_BASE_URL'] ?? baseUrls.api,
};
