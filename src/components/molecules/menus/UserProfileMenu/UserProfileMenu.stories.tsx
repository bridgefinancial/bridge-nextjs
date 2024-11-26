// src/components/design-system/atoms/UserProfileMenu.stories.tsx
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import type { Meta, StoryObj } from '@storybook/react';
import UserProfileMenu, {
  UserProfileMenuProps,
} from './UserProfileMenu.component';

const meta: Meta<UserProfileMenuProps> = {
  title: 'components/molecules/menus/UserProfileMenu',
  component: UserProfileMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<UserProfileMenuProps>;

export const Default: Story = {
  args: {
    user: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      id: '',
      last_login: null,
      is_superuser: false,
      image: null,
      phone: '',
      date_joined: '',
      is_active: false,
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
    },
    isExpanded: false,
    menuOptions: [
      {
        text: 'Profile',
        startIcon: <PersonIcon />,
        onClick: () => console.log('Profile clicked'),
      },
      {
        text: 'Settings',
        startIcon: <SettingsIcon />,
        onClick: () => console.log('Settings clicked'),
      },
      {
        text: 'Logout',
        startIcon: <LogoutIcon />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};

export const Expanded: Story = {
  args: {
    user: {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'janesmith@example.com',
      id: '',
      last_login: null,
      is_superuser: false,
      image: null,
      phone: '',
      date_joined: '',
      is_active: false,
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
    },
    isExpanded: true,
    menuOptions: [
      {
        text: 'Profile',
        startIcon: <PersonIcon />,
        onClick: () => console.log('Profile clicked'),
      },
      {
        text: 'Settings',
        startIcon: <SettingsIcon />,
        onClick: () => console.log('Settings clicked'),
      },
      {
        text: 'Logout',
        startIcon: <LogoutIcon />,
        onClick: () => console.log('Logout clicked'),
      },
    ],
  },
};

export const NoUser: Story = {
  args: {
    user: undefined,
    isExpanded: false,
    menuOptions: [
      {
        text: 'Login',
        startIcon: <PersonIcon />,
        onClick: () => console.log('Login clicked'),
      },
    ],
  },
};

export const CustomStyles: Story = {
  args: {
    user: {
      first_name: 'Custom',
      last_name: 'User',
      email: 'customuser@example.com',
      id: '',
      last_login: null,
      is_superuser: false,
      image: null,
      phone: '',
      date_joined: '',
      is_active: false,
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
    },
    isExpanded: true,
    menuOptions: [
      {
        text: 'Styled Profile',
        startIcon: <PersonIcon />,
        onClick: () => console.log('Styled Profile clicked'),
        sx: { color: '#4caf50' },
      },
      {
        text: 'Styled Settings',
        startIcon: <SettingsIcon />,
        onClick: () => console.log('Styled Settings clicked'),
        sx: { color: '#ff5722' },
      },
    ],
  },
};
