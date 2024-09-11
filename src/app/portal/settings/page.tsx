import React, { Suspense } from "react";
import SettingsTabs from "./SettingTabs";

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsTabs />
    </Suspense>
  );
}
