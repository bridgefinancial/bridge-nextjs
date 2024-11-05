import { getFormById } from '@/services/forms.service';
import { ALL_ONBOARDING_QUESTIONNAIRES } from '@/services/questionnaires.service';
import { Suspense } from 'react';
import Dashboard from './Dashboard/Dashboard';

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
