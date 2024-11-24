import { Button } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VideoPlayerModal, {
  VideoPlayerModalProps,
} from './VideoPlayerModal.component';

export default {
  title: 'components/molecules/modals/VideoPlayerModal',
  component: VideoPlayerModal,
  parameters: {
    layout: 'fullscreen', // Ensures modal covers the full screen in the preview
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls if the modal is open',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when the modal is closed',
    },
    title: {
      control: 'text',
      description: 'Title of the modal',
    },
  },
} as Meta<typeof VideoPlayerModal>;

const Template = (args: VideoPlayerModalProps) => {
  const [isOpen, setIsOpen] = useState(args.open || false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    args.onClose?.();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Open Video Player Modal
      </Button>
      <VideoPlayerModal {...args} open={isOpen} onClose={handleClose} />
    </div>
  );
};

// Stories
export const Default: StoryObj<VideoPlayerModalProps> = {
  render: Template,
  args: {
    open: false,
  },
};

export const SmallScreen: StoryObj<VideoPlayerModalProps> = {
  render: Template,
  args: {
    open: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphonex', // Simulate small screen (iPhone X dimensions)
    },
  },
};

export const LargeScreen: StoryObj<VideoPlayerModalProps> = {
  render: Template,
  args: {
    open: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop', // Simulate a large screen
    },
  },
};

export const CustomTitle: StoryObj<VideoPlayerModalProps> = {
  render: Template,
  args: {
    open: true,
  },
};
