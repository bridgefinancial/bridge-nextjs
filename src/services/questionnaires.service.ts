import { FormidableForm } from "@/types/forms.types";
import {
  CHIROPRACTOR_VALUATION_FORM_DEFINITION,
  RECOMMENDATION_FORM_DEFINITION,
  VALUATION_FORM_DEFINITION,
} from "./forms.service";

export const VALUATION_QUESTIONNAIRE: FormidableForm[] = [
  VALUATION_FORM_DEFINITION,
];
export const RECOMMENDATION_QUESTIONNAIRE: FormidableForm[] = [
  RECOMMENDATION_FORM_DEFINITION,
];

export const COMBINED_QUESTIONNAIRE: FormidableForm[] = [
  VALUATION_FORM_DEFINITION,
  RECOMMENDATION_FORM_DEFINITION,
];

export const CHIROPRACTOR_QUESTIONNAIRE: FormidableForm[] = [
  CHIROPRACTOR_VALUATION_FORM_DEFINITION,
];

export enum QuestionnaireSlugs {
  VALUATION = "valuation",
  RECOMMENDATION = "recommendations",
  ONBOARD = "onboard",
  CHIROPRACTOR_VALUATION = "chiropractor-valuation",
}

export const QUESTIONNAIRE_BY_SLUG: Record<string, FormidableForm[]> = {
  [QuestionnaireSlugs.ONBOARD]: COMBINED_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION]: RECOMMENDATION_QUESTIONNAIRE,
  [QuestionnaireSlugs.VALUATION]: VALUATION_QUESTIONNAIRE,
  [QuestionnaireSlugs.CHIROPRACTOR_VALUATION]: CHIROPRACTOR_QUESTIONNAIRE,
};
