import { DefaultLogoProps } from '@/components/atoms/images/LogoImage/LogoImage.component';
import { User } from '@/types/users.types';
import { Meta, StoryObj } from '@storybook/react';
import Link from 'next/link';
import { LayoutForPortal } from './PortalLayout.component';

const meta: Meta<typeof LayoutForPortal> = {
  title: 'components/templates/layouts/LayoutForPortal',
  component: LayoutForPortal,
  args: {
    logoProps: DefaultLogoProps,
    LinkComponent: Link,
    pathname: '/auth/portal',
  },
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;

type Story = StoryObj<typeof LayoutForPortal>;

const mockTabs = [
  { label: 'Home', icon: 'home', linkProps: { href: '/home' }, active: false },
  {
    label: 'Dashboard',
    icon: 'dashboard',
    linkProps: { href: '/dashboard' },
    active: true,
  },
  {
    label: 'Settings',
    icon: 'settings',
    linkProps: { href: '/settings' },
    active: false,
  },
];

const mockUser: User = {
  id: '1',
  email: 'johndoe@example.com',
  last_login: null,
  is_superuser: false,
  first_name: 'John',
  last_name: 'Doe',
  image: null,
  phone: '123-456-7890',
  date_joined: '2022-01-01',
  is_active: true,
  is_staff: false,
  is_verified: false,
  groups: [],
  user_permissions: [],
  company: {
    address: null,
    city: null,
    country: null,
    created_at: '',
    email: null,
    has_finished_onboarding: false,
    id: 0,
    industry: {
      id: '',
      created_at: '',
      updated_at: '',
      name: '',
      revenue_multiple: 0,
      ebitda_multiple: 0,
      median_sale_price: 0,
    },
    is_blueprint: false,
    name: '',
    phone_number: null,
    postal_code: null,
    state: null,
    updated_at: '',
    valuation: 0,
    website: null,
  },
};

// Default Story
export const Default: Story = {
  args: {
    tabs: mockTabs,
    user: mockUser,
    children: <div>Welcome to the portal</div>,
  },
};

// Story with Custom Logo
export const WithCustomLogo: Story = {
  args: {
    tabs: mockTabs,
    logoProps: {
      src: '/custom-logo.png',
      alt: 'Custom Logo',
      width: 120,
      height: 40,
    },
    user: mockUser,
    children: <div>Welcome to the portal with a custom logo</div>,
  },
};

// Story with Logged-Out State
export const LoggedOut: Story = {
  args: {
    tabs: mockTabs,
    user: undefined,
    logout: undefined,
    children: <div>Please log in to access the portal</div>,
  },
};

// Story with Celebration Triggered
export const WithCelebration: Story = {
  args: {
    tabs: mockTabs,
    user: mockUser,
    children: <div>Celebration triggered!</div>,
  },
  parameters: {
    celebrate: true,
  },
};

// Story without Drawer Toggle
export const WithoutDrawerToggle: Story = {
  args: {
    tabs: mockTabs,
    user: mockUser,
    children: <div>Portal without drawer toggle functionality</div>,
    window: undefined, // Optional custom window for testing if needed
  },
};

// Story with Mobile View
export const MobileView: Story = {
  args: {
    tabs: mockTabs,
    user: mockUser,
    children: <div>Portal in mobile view</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
