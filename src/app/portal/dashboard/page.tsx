import React, { Suspense } from "react";
import Dashboard from "./Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}
