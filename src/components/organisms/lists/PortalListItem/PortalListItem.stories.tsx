import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PortalListItem, {
  PortalListItemProps,
} from './PortalListItem.component';

const ForwardedLink = React.forwardRef<HTMLAnchorElement, MuiLinkProps>(
  (props, ref) => <MuiLink ref={ref} {...props} />
);
ForwardedLink.displayName = 'ForwardedLink';

const meta = {
  title: 'components/molecules/lists/PortalListItem',
  component: PortalListItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<PortalListItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Item',
    href: '/',
    LinkComponent: ForwardedLink,
  },
};

export const CustomLinkProps: Story = {
  args: {
    text: 'Custom Link Props',
    href: '/custom',
    LinkComponent: ForwardedLink,
    linkProps: { href: '/custom', scroll: false, shallow: true },
  },
  render: (args) => <PortalListItem {...args} LinkComponent={ForwardedLink} />,
};
