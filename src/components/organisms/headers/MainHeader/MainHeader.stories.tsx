// src/components/molecules/MainHeader/MainHeader.stories.tsx
import Button from '@mui/material/Button';
import { Meta, StoryObj } from '@storybook/react';
import MainHeader, { HeaderProps } from './MainHeader.component';

export default {
  title: 'components/molecules/MainHeader',
  component: MainHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<HeaderProps>;

const Template: StoryObj<HeaderProps> = {
  args: {
    logoPath: '/assets/images/bridge-logo.png',
    linkProps: { href: '/' },
    HeaderActions: (
      <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
        <Button variant="outlined" color="primary">
          Sign In
        </Button>
        <Button variant="contained" color="secondary">
          Sign Up
        </Button>
      </div>
    ),
  },
};

export const Default = Template;

export const MobileView: StoryObj<HeaderProps> = {
  args: {
    ...Template.args,
    logoPath: '/assets/images/mobile-logo.png',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1', // Uses Storybook's mobile viewport
    },
  },
};

export const WithoutActions: StoryObj<HeaderProps> = {
  args: {
    logoPath: '/assets/images/bridge-logo.png',
    linkProps: { href: '/' },
    HeaderActions: null,
  },
};

export const CustomLogo: StoryObj<HeaderProps> = {
  args: {
    logoPath: '/assets/images/custom-logo.png',
    linkProps: { href: '/' },
    HeaderActions: (
      <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
        <Button variant="outlined" color="primary">
          Log In
        </Button>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </div>
    ),
  },
};
