import { Questionnaire } from '@/types/forms.types';

export const getLandingConfigKey = (questionnaire: Questionnaire) => {
  return `last-viewed-${questionnaire.key}`;
};
