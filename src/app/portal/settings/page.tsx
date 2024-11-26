import React, { Suspense } from 'react';
import SettingsTabs from './SettingTabs';

const SettingsPage = (): React.JSX.Element => {
  return (
    <Suspense>
      <SettingsTabs />
    </Suspense>
  );
};

export default SettingsPage;
