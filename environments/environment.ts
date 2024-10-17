import { baseUrls } from '@/utils/env-variables';

export const environment = {
  DJANGO_API_BASE_URL:
    process.env['NEXT_PUBLIC_DJANGO_API_BASE_URL'] ?? baseUrls.api,
};
