import OfferLayoutWithData from '@/components/templates/layouts/OfferLayout/OfferLayout.component';
import React, { ReactNode, Suspense } from 'react';
import { PORTAL_TABS } from 'src/constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <OfferLayoutWithData tabs={PORTAL_TABS}>{children}</OfferLayoutWithData>
    </Suspense>
  );
};

export default Layout;
