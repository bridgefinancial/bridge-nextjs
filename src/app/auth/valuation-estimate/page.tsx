"use client";
import React, { Suspense } from "react";
import { ValuationEstimate } from "./ValuationEstimate/ValuationEstimate.component";

// Page component
export default function ValuationEstimatePage() {
  return (
    <Suspense>
      <ValuationEstimate />
    </Suspense>
  );
}
