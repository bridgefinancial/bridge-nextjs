import PortalLayout from '@/components/templates/layouts/PortalLayout';
import React, { ReactNode, Suspense } from 'react';
import { PORTAL_TABS } from 'src/constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <PortalLayout tabs={PORTAL_TABS}>{children}</PortalLayout>
    </Suspense>
  );
};

export default Layout;
