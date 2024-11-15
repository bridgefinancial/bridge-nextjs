import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Meta, StoryObj } from '@storybook/react';
import ListItemWithActions, {
  ListItemActionButton,
  ListItemWithActionsProps,
} from './ListItemWithActions.component';

const meta: Meta<ListItemWithActionsProps> = {
  title: 'components/molecules/lists/ListItemWithActions',
  component: ListItemWithActions,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ListItemWithActionsProps>;

export const Default: Story = {
  args: {
    title: 'Sample Document',
    subTitle: '2 MB',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('Edit clicked')}>
        <EditIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={2} onClick={() => alert('Delete clicked')}>
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/default-icon.png',
  },
};

export const WithDownloadAction: Story = {
  args: {
    title: 'Invoice.pdf',
    subTitle: '1.5 MB',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('Download clicked')}>
        <DownloadIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={2} onClick={() => alert('Delete clicked')}>
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-pdf.png',
  },
};

export const NoSubtitle: Story = {
  args: {
    title: 'No Subtitle Document',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('Info clicked')}>
        <InfoIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-info.png',
  },
};

export const CustomStyled: Story = {
  args: {
    title: 'Styled Document',
    subTitle: 'Custom Styled 3 MB',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('Edit clicked')}>
        <EditIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={2} onClick={() => alert('Delete clicked')}>
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-custom.png',
    sx: {
      border: '2px solid #4caf50',
      padding: '12px',
      borderRadius: '16px',
      '&:hover': {
        backgroundColor: '#e8f5e9',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    title: 'Mobile View Document',
    subTitle: 'Optimized for Mobile',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('Edit clicked')}>
        <EditIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={2} onClick={() => alert('Delete clicked')}>
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-mobile.png',
    sx: {
      padding: '8px',
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const DisabledActions: Story = {
  args: {
    title: 'Disabled Actions',
    subTitle: 'Actions are disabled',
    actions: [
      <ListItemActionButton
        key={1}
        sx={{ pointerEvents: 'none', opacity: 0.5 }}
      >
        <EditIcon />
      </ListItemActionButton>,
      <ListItemActionButton
        key={2}
        sx={{ pointerEvents: 'none', opacity: 0.5 }}
      >
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-disabled.png',
    sx: {
      border: '1px dashed gray',
    },
  },
};

export const MultipleActions: Story = {
  args: {
    title: 'Multiple Actions Document',
    subTitle: 'Actions: View, Edit, Delete',
    actions: [
      <ListItemActionButton key={1} onClick={() => alert('View clicked')}>
        <InfoIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={2} onClick={() => alert('Edit clicked')}>
        <EditIcon />
      </ListItemActionButton>,
      <ListItemActionButton key={3} onClick={() => alert('Delete clicked')}>
        <DeleteIcon />
      </ListItemActionButton>,
    ],
    iconSrc: '/images/icon-multiple-actions.png',
  },
};
