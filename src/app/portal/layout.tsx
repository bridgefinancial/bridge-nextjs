import React, { ReactNode, Suspense } from "react";
import PortalLayout from "@/components/templates/layouts/PortalLayout";
import { routePaths } from "@/types/routes.enum";
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <PortalLayout
        tabs={[
          {
            label: "Dashboard",
            icon: "dashboard",
            linkProps: {
              href: routePaths.DASHBOARD,
            },
          },
          {
            label: "Blueprint",
            icon: "pencil",
            linkProps: {
              href: routePaths.BLUEPRINT,
            },
          },
          {
            label: "Documents",
            icon: "graph",
            linkProps: {
              href: routePaths.DOCUMENTS,
            },
          },
          {
            label: "Settings",
            icon: "settings",
            linkProps: {
              href: routePaths.SETTINGS,
            },
          },
        ]}
      >
        {children}
      </PortalLayout>
    </Suspense>
  );
};

export default Layout;
