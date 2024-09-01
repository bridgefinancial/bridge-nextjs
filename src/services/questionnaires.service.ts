import { FormidableForm } from "@/types/forms.types";
import { RECOMMENDATION_FORM_DEFINITION, VALUATION_FORM_DEFINITION } from "./forms.service";
import { QuestionnaireRoutes } from "@/types/routes.enum";

export const VALUATION_QUESTIONNAIRE: FormidableForm[] = [VALUATION_FORM_DEFINITION]
export const RECOMMENDATION_QUESTIONNAIRE: FormidableForm[] = [RECOMMENDATION_FORM_DEFINITION]

export const COMBINED_QUESTIONNAIRE: FormidableForm[] = [VALUATION_FORM_DEFINITION, RECOMMENDATION_FORM_DEFINITION]

export enum QuestionnaireSlugs {
  VALUATION = "valuation",
  RECOMMENDATION = "recommendations",
  ONBOARD = "onboard"
}

export const QUESTIONNAIRE_BY_SLUG: Record<string, FormidableForm[]> = {
    [QuestionnaireSlugs.ONBOARD]: COMBINED_QUESTIONNAIRE,
    [QuestionnaireSlugs.RECOMMENDATION]: RECOMMENDATION_QUESTIONNAIRE,
    [QuestionnaireSlugs.VALUATION]: VALUATION_QUESTIONNAIRE,
}