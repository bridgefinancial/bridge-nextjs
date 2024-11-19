// src/components/design-system/molecules/ListItemWithStatus.stories.tsx
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import type { Meta, StoryObj } from '@storybook/react';
import ListItemWithStatus, {
  ListItemWithStatusProps,
} from './ListItemWithStatus.component';

const meta: Meta<ListItemWithStatusProps> = {
  title: 'components/molecules/lists/ListItemWithStatus',
  component: ListItemWithStatus,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ListItemWithStatusProps>;

export const Default: Story = {
  args: {
    iconSrc: '/images/default-icon.png',
    title: 'Sample Document',
    subtitle: '2 MB',
    status: 'Complete',
    statusColor: 'green',
  },
};

export const WithActionIcon: Story = {
  args: {
    iconSrc: '/images/icon-pdf.png',
    title: 'Invoice.pdf',
    subtitle: '1.5 MB',
    status: 'Uploaded',
    statusColor: 'blue',
    actionIcon: <DeleteIcon />,
    onAction: () => alert('Delete action clicked'),
  },
};

export const RunningProcess: Story = {
  args: {
    iconSrc: '/images/icon-process.png',
    title: 'Process 1',
    status: 'Running',
    statusColor: 'orange',
    actionIcon: <InfoIcon />,
    onAction: () => alert('View details clicked'),
  },
};

export const FailedProcess: Story = {
  args: {
    iconSrc: '/images/icon-process-fail.png',
    title: 'Process 2',
    status: 'Failed',
    statusColor: 'red',
    actionIcon: <InfoIcon />,
    onAction: () => alert('View details clicked'),
  },
};

export const CustomStyled: Story = {
  args: {
    iconSrc: '/images/icon-custom.png',
    title: 'Custom Document',
    subtitle: 'Last edited 2 days ago',
    status: 'Draft',
    statusColor: 'blue',
    actionIcon: <EditIcon />,
    onAction: () => alert('Edit action clicked'),
    sx: {
      border: '2px solid blue',
      padding: '12px',
      borderRadius: '16px',
    },
  },
};

export const CustomStatusColors: Story = {
  args: {
    iconSrc: '/images/icon-status.png',
    title: 'Status Report',
    subtitle: '4.5 MB',
    status: 'Pending',
    statusColor: 'purple',
    actionIcon: <EditIcon />,
    onAction: () => alert('Edit status clicked'),
  },
};

export const WithMultipleActions: Story = {
  args: {
    iconSrc: '/images/icon-actions.png',
    title: 'User Profile',
    subtitle: 'Profile Picture',
    status: 'Updated',
    statusColor: 'teal',
    actionIcon: (
      <>
        <EditIcon onClick={() => alert('Edit clicked')} />
        <DeleteIcon onClick={() => alert('Delete clicked')} />
      </>
    ),
  },
};

export const DisabledAction: Story = {
  args: {
    iconSrc: '/images/icon-disabled.png',
    title: 'Archived Document',
    subtitle: 'Archived 3 months ago',
    status: 'Archived',
    statusColor: 'gray',
    actionIcon: <DeleteIcon />,
    onAction: () => alert('This action is disabled'),
    sx: {
      pointerEvents: 'none', // Disable click actions on the component
      opacity: 0.5,
    },
  },
};
