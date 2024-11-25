import { routePaths } from './types/routes.enum';

export const PORTAL_TABS = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    linkProps: {
      href: routePaths.DASHBOARD,
    },
  },
  {
    label: 'Certified Valuation',
    icon: 'graph',
    linkProps: {
      href: routePaths.CERTIFIED_VALUATION,
    },
  },
  {
    label: 'Optimize',
    icon: 'graph',
    linkProps: {
      href: routePaths.OPTIMIZATION_PACKAGE,
    },
  },
  {
    label: 'Seller Readiness',
    icon: 'graph',
    linkProps: {
      href: routePaths.SELLER_READINESS_PACKAGE,
    },
  },
  {
    label: 'Documents',
    icon: 'graph',
    linkProps: {
      href: routePaths.DOCUMENTS,
    },
  },
  {
    label: 'Settings',
    icon: 'settings',
    linkProps: {
      href: routePaths.SETTINGS,
    },
  },
];
