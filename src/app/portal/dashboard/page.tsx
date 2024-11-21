'use client';
import { getFormById } from '@/services/forms.service';
import {
  RECOMMENDATION_QUESTIONNAIRES,
  SELLER_READINESS_QUESTIONNAIRES,
  VALUATION_QUESTIONNAIRE,
} from '@/services/questionnaires.service';
import { Suspense } from 'react';
import Dashboard from './Dashboard/Dashboard';

export default async function DashboardPage() {
  const recommendationForms = await Promise.all(
    RECOMMENDATION_QUESTIONNAIRES.map((q) => getFormById(q.formId))
  );
  const sellerReadinessForms = await Promise.all(
    SELLER_READINESS_QUESTIONNAIRES.map((q) => getFormById(q.formId))
  );
  const valuationForms = [await getFormById(VALUATION_QUESTIONNAIRE.formId)];

  return (
    <Suspense>
      <Dashboard
        optimizationForms={recommendationForms}
        sellerReadinessForms={sellerReadinessForms}
        valuationForms={valuationForms}
      />
    </Suspense>
  );
}
