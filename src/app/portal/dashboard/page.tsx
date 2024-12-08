import { getFormById } from '@/services/forms.service';
import {
  RECOMMENDATION_QUESTIONNAIRES,
  SELLER_READINESS_QUESTIONNAIRES,
} from '@/services/questionnaires.service';
import Dashboard from './Dashboard/Dashboard';

export default async function DashboardPage() {
  const recommendationResults = await Promise.allSettled(
    RECOMMENDATION_QUESTIONNAIRES.map((q) => getFormById(q.formId))
  );

  const sellerReadinessResults = await Promise.allSettled(
    SELLER_READINESS_QUESTIONNAIRES.map((q) => getFormById(q.formId))
  );

  const recommendationForms = recommendationResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<any>).value);

  const sellerReadinessForms = sellerReadinessResults
    .filter((result) => result.status === 'fulfilled')
    .map((result) => (result as PromiseFulfilledResult<any>).value);

  return (
    <Dashboard
      optimizationForms={recommendationForms}
      sellerReadinessForms={sellerReadinessForms}
      // valuationForms={valuationForms}
    />
  );
}
