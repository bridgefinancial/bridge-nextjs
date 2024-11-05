import { Questionnaire } from '@/types/forms.types';
import { routePaths } from '@/types/routes.enum';
import {
  RECOMMENDATION_BUSINESS_OFFERING_FORM_ID,
  RECOMMENDATION_CONVERSION_FORM_ID,
  RECOMMENDATION_GENERAL_INFO_FORM_ID,
  RECOMMENDATION_MARKETING_FORM_ID,
  RECOMMENDATION_SYSTEMS_FORM_ID,
  SELLER_READINESS_FINANCES_FORM_ID,
  SELLER_READINESS_FORM_ID,
  SELLER_READINESS_GROWTH_POTENTIAL_FORM_ID,
  SELLER_READINESS_MARKET_FORM_ID,
  SELLER_READINESS_OPERATIONS_FORM_ID,
  SELLER_READINESS_REASON_FORM_ID,
  SELLER_READINESS_VALUATION_FORM_ID,
  VALUATION_FORM_ID,
} from './forms.service';

export const VALUATION_QUESTIONNAIRE: Questionnaire = {
  formId: VALUATION_FORM_ID,
  key: 'valuation',
  stepperLabel: 'Valuation',
};

export const RECOMMENDATION_GENERAL_INFO_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_GENERAL_INFO_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_BUSINESS_OFFERRING,
  key: 'general info',
  stepperLabel: 'General Information',
};

export const RECOMMENDATION_BUSINESS_OFFERING_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_BUSINESS_OFFERING_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_MARKETING,
  key: 'business offering',
  stepperLabel: 'Business Offering',
};

export const RECOMMENDATION_MARKETING_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_MARKETING_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_CONVERSION,
  key: 'marketing',
  stepperLabel: 'Growth Marketing',
};

export const RECOMMENDATION_CONVERSION_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_CONVERSION_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_SYSTEMS,
  key: 'conversion',
  stepperLabel: 'Lead Conversion',
};

export const RECOMMENDATION_SYSTEMS_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_SYSTEMS_FORM_ID,
  key: 'systems',
  stepperLabel: 'Operations & Systems',
};

export const SELLER_READINESS_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_FORM_ID,
  key: 'seller readiness',
  stepperLabel: 'Seller Readiness',
  redirectPath: routePaths.SELLER_READINESS_FINANCES,
};

export const SELLER_READINESS_FINANCES_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_FINANCES_FORM_ID,
  key: 'seller readiness finances',
  stepperLabel: 'Financial Info',
  redirectPath: routePaths.SELLER_READINESS_REASON,
};

export const SELLER_READINESS_REASON_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_REASON_FORM_ID,
  key: 'seller readiness reason',
  stepperLabel: 'Reason for Selling',
  redirectPath: routePaths.SELLER_READINESS_MARKET,
};

export const SELLER_READINESS_MARKET_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_MARKET_FORM_ID,
  key: 'seller readiness market',
  stepperLabel: 'Market Information',
  redirectPath: routePaths.SELLER_READINESS_OPERATIONS,
};

export const SELLER_READINESS_OPERATIONS_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_OPERATIONS_FORM_ID,
  key: 'seller readiness operations',
  stepperLabel: 'Operations & Management',
  redirectPath: routePaths.SELLER_READINESS_GROWTH_POTENTIAL,
};

export const SELLER_READINESS_GROWTH_POTENTIAL_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_GROWTH_POTENTIAL_FORM_ID,
  key: 'seller readiness growth potential',
  stepperLabel: 'Growth Potential',
  redirectPath: routePaths.SELLER_READINESS_VALUATION,
};

export const SELLER_READINESS_VALUATION_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_VALUATION_FORM_ID,
  key: 'seller readiness valuation',
  stepperLabel: 'Valuation',
};

export enum QuestionnaireSlugs {
  VALUATION = 'valuation',
  RECOMMENDATION_GENERAL_INFO = 'general-info',
  RECOMMENDATION_BUSINESS_OFFERING = 'business-offering',
  RECOMMENDATION_MARKETING = 'marketing',
  RECOMMENDATION_CONVERSION = 'conversion',
  RECOMMENDATION_SYSTEMS = 'systems',
  SELLER_READINESS = 'seller-readiness',
  SELLER_READINESS_FINANCES = 'seller-readiness-finances',
  SELLER_READINESS_REASON = 'seller-readiness-reason',
  SELLER_READINESS_MARKET = 'seller-readiness-market',
  SELLER_READINESS_OPERATIONS = 'seller-readiness-operations',
  SELLER_READINESS_GROWTH_POTENTIAL = 'seller-readiness-growth-potential',
  SELLER_READINESS_VALUATION = 'seller-readiness-valuation',
}

export const QUESTIONNAIRE_BY_SLUG: Record<string, Questionnaire> = {
  [QuestionnaireSlugs.RECOMMENDATION_GENERAL_INFO]:
    RECOMMENDATION_GENERAL_INFO_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION_BUSINESS_OFFERING]:
    RECOMMENDATION_BUSINESS_OFFERING_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION_MARKETING]:
    RECOMMENDATION_MARKETING_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION_CONVERSION]:
    RECOMMENDATION_CONVERSION_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION_SYSTEMS]:
    RECOMMENDATION_SYSTEMS_QUESTIONNAIRE,
  [QuestionnaireSlugs.VALUATION]: VALUATION_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS]: SELLER_READINESS_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_FINANCES]:
    SELLER_READINESS_FINANCES_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_REASON]:
    SELLER_READINESS_REASON_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_MARKET]:
    SELLER_READINESS_MARKET_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_OPERATIONS]:
    SELLER_READINESS_OPERATIONS_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_GROWTH_POTENTIAL]:
    SELLER_READINESS_GROWTH_POTENTIAL_QUESTIONNAIRE,
  [QuestionnaireSlugs.SELLER_READINESS_VALUATION]:
    SELLER_READINESS_VALUATION_QUESTIONNAIRE,
};

export const RECOMMENDATION_QUESTIONNAIRE_SLUGS: string[] = [
  QuestionnaireSlugs.RECOMMENDATION_GENERAL_INFO,
  QuestionnaireSlugs.RECOMMENDATION_BUSINESS_OFFERING,
  QuestionnaireSlugs.RECOMMENDATION_MARKETING,
  QuestionnaireSlugs.RECOMMENDATION_CONVERSION,
  QuestionnaireSlugs.RECOMMENDATION_SYSTEMS,
];

export const ONBOARDING_SLUGS: string[] = [
  QuestionnaireSlugs.VALUATION,
  ...RECOMMENDATION_QUESTIONNAIRE_SLUGS,
];

export const RECOMMENDATION_QUESTIONNAIRES =
  RECOMMENDATION_QUESTIONNAIRE_SLUGS.map((slug) => QUESTIONNAIRE_BY_SLUG[slug]);

export const RECOMMENDATION_FORM_IDS = RECOMMENDATION_QUESTIONNAIRES.map(
  (q) => q.formId
);

export const ALL_ONBOARDING_QUESTIONNAIRES = [
  VALUATION_QUESTIONNAIRE,
  ...RECOMMENDATION_QUESTIONNAIRES,
];
