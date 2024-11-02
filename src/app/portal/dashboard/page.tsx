import { getFormById } from '@/services/forms.service';
import {
  RECOMMENDATION_QUESTIONNAIRES,
  VALUATION_QUESTIONNAIRE,
} from '@/services/questionnaires.service';
import { Suspense } from 'react';
import Dashboard from './Dashboard/Dashboard';

export const ALL_ONBOARDING_QUESTIONNAIRES = [
  VALUATION_QUESTIONNAIRE,
  ...RECOMMENDATION_QUESTIONNAIRES,
];

export default async function DashboardPage() {
  const forms = await Promise.all(
    ALL_ONBOARDING_QUESTIONNAIRES.map((q) => getFormById(q.formId))
  );
  return (
    <Suspense>
      <Dashboard forms={forms} />
    </Suspense>
  );
}
