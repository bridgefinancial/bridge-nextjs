import { baseUrls } from '@/utils/env-variables';

export const environment = {
  ROLLBAR_ACCESS_TOKEN:
    process.env['ROLLBAR_ACCESS_TOKEN'] ?? '26a9695b30054699ae5a8df321ffba09',
  DJANGO_API_BASE_URL:
    process.env['NEXT_PUBLIC_DJANGO_API_BASE_URL'] ?? baseUrls.api,
};
