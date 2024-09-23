import { Questionnaire } from "@/types/forms.types";
import {
  RECOMMENDATION_FORM_DEFINITION,
  VALUATION_FORM_DEFINITION,
} from "./forms.service";
import { routePaths } from "@/types/routes.enum";

export const VALUATION_QUESTIONNAIRE: Questionnaire = {
  forms: [VALUATION_FORM_DEFINITION],
  redirectPath: routePaths.DASHBOARD,
};
export const RECOMMENDATION_QUESTIONNAIRE: Questionnaire = {
  forms: [RECOMMENDATION_FORM_DEFINITION],
};

export const COMBINED_QUESTIONNAIRE: Questionnaire = {
  forms: [VALUATION_FORM_DEFINITION, RECOMMENDATION_FORM_DEFINITION],
};

export enum QuestionnaireSlugs {
  VALUATION = "valuation",
  RECOMMENDATION = "recommendations",
  ONBOARD = "onboard",
}

export const QUESTIONNAIRE_BY_SLUG: Record<string, Questionnaire> = {
  [QuestionnaireSlugs.ONBOARD]: COMBINED_QUESTIONNAIRE,
  [QuestionnaireSlugs.RECOMMENDATION]: RECOMMENDATION_QUESTIONNAIRE,
  [QuestionnaireSlugs.VALUATION]: VALUATION_QUESTIONNAIRE,
};
