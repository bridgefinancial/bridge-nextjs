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
  VALUATION_FORM_ID,
} from './forms.service';

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
}

export const VALUATION_QUESTIONNAIRE: Questionnaire = {
  formId: VALUATION_FORM_ID,
  key: 'valuation',
  stepperLabel: 'Valuation',
  slug: QuestionnaireSlugs.VALUATION,
};

export const RECOMMENDATION_GENERAL_INFO_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_GENERAL_INFO_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_BUSINESS_OFFERRING,
  key: 'general info',
  stepperLabel: 'General Information',
  slug: QuestionnaireSlugs.RECOMMENDATION_GENERAL_INFO,
};

export const RECOMMENDATION_BUSINESS_OFFERING_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_BUSINESS_OFFERING_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_MARKETING,
  key: 'business offering',
  stepperLabel: 'Business Offering',
  slug: QuestionnaireSlugs.RECOMMENDATION_BUSINESS_OFFERING,
};

export const RECOMMENDATION_MARKETING_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_MARKETING_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_CONVERSION,
  key: 'marketing',
  stepperLabel: 'Growth Marketing',
  slug: QuestionnaireSlugs.RECOMMENDATION_MARKETING,
};

export const RECOMMENDATION_CONVERSION_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_CONVERSION_FORM_ID,
  redirectPath: routePaths.RECOMMENDATION_SYSTEMS,
  key: 'conversion',
  stepperLabel: 'Lead Conversion',
  slug: QuestionnaireSlugs.RECOMMENDATION_CONVERSION,
};

export const RECOMMENDATION_SYSTEMS_QUESTIONNAIRE: Questionnaire = {
  formId: RECOMMENDATION_SYSTEMS_FORM_ID,
  key: 'systems',
  stepperLabel: 'Operations & Systems',
  slug: QuestionnaireSlugs.RECOMMENDATION_SYSTEMS,
};

export const SELLER_READINESS_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_FORM_ID,
  key: 'seller readiness',
  stepperLabel: 'Seller Readiness',
  redirectPath: routePaths.SELLER_READINESS_FINANCES,
  slug: QuestionnaireSlugs.SELLER_READINESS,
};

export const SELLER_READINESS_FINANCES_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_FINANCES_FORM_ID,
  key: 'seller readiness finances',
  stepperLabel: 'Financial Info',
  redirectPath: routePaths.SELLER_READINESS_REASON,
  slug: QuestionnaireSlugs.SELLER_READINESS_FINANCES,
};

export const SELLER_READINESS_REASON_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_REASON_FORM_ID,
  key: 'seller readiness reason',
  stepperLabel: 'Sale Reason',
  redirectPath: routePaths.SELLER_READINESS_MARKET,
  slug: QuestionnaireSlugs.SELLER_READINESS_REASON,
};

export const SELLER_READINESS_MARKET_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_MARKET_FORM_ID,
  key: 'seller readiness market',
  stepperLabel: 'Market Information',
  redirectPath: routePaths.SELLER_READINESS_OPERATIONS,
  slug: QuestionnaireSlugs.SELLER_READINESS_MARKET,
};

export const SELLER_READINESS_OPERATIONS_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_OPERATIONS_FORM_ID,
  key: 'seller readiness operations',
  stepperLabel: 'Operations & Management',
  redirectPath: routePaths.SELLER_READINESS_GROWTH_POTENTIAL,
  slug: QuestionnaireSlugs.SELLER_READINESS_OPERATIONS,
};

export const SELLER_READINESS_GROWTH_POTENTIAL_QUESTIONNAIRE: Questionnaire = {
  formId: SELLER_READINESS_GROWTH_POTENTIAL_FORM_ID,
  key: 'seller readiness growth potential',
  stepperLabel: 'Growth Potential',
  slug: QuestionnaireSlugs.SELLER_READINESS_GROWTH_POTENTIAL,
};

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
};

export const QUESTIONNAIRE_BY_FORM_ID: Map<number, Questionnaire> = new Map(
  Object.values(QUESTIONNAIRE_BY_SLUG).map((q) => [q.formId, q])
);

export const RECOMMENDATION_QUESTIONNAIRE_SLUGS: string[] = [
  QuestionnaireSlugs.RECOMMENDATION_GENERAL_INFO,
  QuestionnaireSlugs.RECOMMENDATION_BUSINESS_OFFERING,
  QuestionnaireSlugs.RECOMMENDATION_MARKETING,
  QuestionnaireSlugs.RECOMMENDATION_CONVERSION,
  QuestionnaireSlugs.RECOMMENDATION_SYSTEMS,
];

export const SELLER_READINESS_SLUGS: string[] = [
  QuestionnaireSlugs.SELLER_READINESS,
  QuestionnaireSlugs.SELLER_READINESS_FINANCES,
  QuestionnaireSlugs.SELLER_READINESS_REASON,
  QuestionnaireSlugs.SELLER_READINESS_MARKET,
  QuestionnaireSlugs.SELLER_READINESS_OPERATIONS,
  QuestionnaireSlugs.SELLER_READINESS_GROWTH_POTENTIAL,
];

export const RECOMMENDATION_QUESTIONNAIRES =
  RECOMMENDATION_QUESTIONNAIRE_SLUGS.map((slug) => QUESTIONNAIRE_BY_SLUG[slug]);

export const RECOMMENDATION_FORM_IDS = RECOMMENDATION_QUESTIONNAIRES.map(
  (q) => q.formId
);

export const SELLER_READINESS_QUESTIONNAIRES = SELLER_READINESS_SLUGS.map(
  (slug) => QUESTIONNAIRE_BY_SLUG[slug]
);
