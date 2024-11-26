'use client';
import React, { Suspense } from 'react';
import { ValuationEstimate } from './ValuationEstimate/ValuationEstimate.component';
import { useSessionUser } from '@/services/users.service';

// Page component
export default function ValuationEstimatePage() {
  const { data: user, isLoading } = useSessionUser();
  return (
    <Suspense>
      <ValuationEstimate
        companyValuation={user?.company.valuation}
        industry={user?.company.industry}
        isLoading={isLoading}
      />
    </Suspense>
  );
}
