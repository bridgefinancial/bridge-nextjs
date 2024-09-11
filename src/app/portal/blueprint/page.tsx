import React, { Suspense } from "react";
import BlueprintComponent from "./BluePrintCard";

export default function BlueprintPage() {
  return (
    <Suspense>
      <BlueprintComponent />
    </Suspense>
  );
}
