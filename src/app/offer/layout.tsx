import OfferLayoutWithData from '@/components/templates/layouts/OfferLayout/OfferLayout.component';
import React, { ReactNode, Suspense } from 'react';
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <OfferLayoutWithData
        tabs={[
          {
            label: 'Dashboard',
            icon: 'dashboard',
            linkProps: {
              href: '/offer/dahboard',
            },
          },
        ]}
      >
        {children}
      </OfferLayoutWithData>
    </Suspense>
  );
};

export default Layout;
