import PortalLayout from '@/components/templates/layouts/PortalLayout';
import React, { ReactNode, Suspense } from 'react';
import { PORTAL_TABS } from 'src/constants';

interface LayoutProps {
  children: ReactNode;
}

// I am adding logoProps here because I believe this path needs to be relative to the public folder,
// i am sick of getting this error though, I attempted by having a reusable props for logo we could use, 
// but I think it's better to just to code it to avoid the error

// ⨯ Error: Failed to parse src "assets/images/Bridge-logo.png" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)
//   at Array.map (<anonymous>)
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <PortalLayout logoProps={{
        src: '/assets/images/Bridge-logo.png',
        alt: 'Logo for Bridge Financial',
      }} tabs={PORTAL_TABS}>{children}</PortalLayout>
    </Suspense>
  );
};

export default Layout;
