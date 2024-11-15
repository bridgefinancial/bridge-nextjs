// DesktopLayoutBar.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import DesktopLayoutBar, {
  DesktopLayoutBarProps,
} from './DesktopLayoutBar.component';

export default {
  title: 'components/organisms/headers/LayoutBar/DesktopLayoutBar',
  component: DesktopLayoutBar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    handleDrawerToggle: { action: 'drawer toggled' },
    logout: { action: 'logout clicked' },
  },
} as Meta;

const Template: StoryFn<DesktopLayoutBarProps> = (
  args: DesktopLayoutBarProps
) => <DesktopLayoutBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Dashboard',
};

export const WithDrawerToggle = Template.bind({});
WithDrawerToggle.args = {
  title: 'Dashboard with Drawer',
  handleDrawerToggle: () => console.log('Drawer toggled'),
};

export const WithLogout = Template.bind({});
WithLogout.args = {
  title: 'Dashboard with Logout',
  logout: () => console.log('Logging out'),
};

export const FullyConfigured = Template.bind({});
FullyConfigured.args = {
  title: 'Full DesktopLayoutBar',
  handleDrawerToggle: () => console.log('Drawer toggled'),
  logout: () => console.log('Logging out'),
};
