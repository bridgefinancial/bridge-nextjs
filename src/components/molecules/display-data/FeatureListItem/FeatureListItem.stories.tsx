import { colors } from '@/theme/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import FeatureListItem from './FeatureListItem.component';

// Default export for Storybook metadata
const meta: Meta<typeof FeatureListItem> = {
  title: 'components/molecules/display-data/FeatureListItem',
  component: FeatureListItem,
  argTypes: {
    onClick: { action: 'clicked' }, // Logs actions for onClick
  },
};

export default meta;
type Story = StoryObj<typeof FeatureListItem>;

// Default Story
export const Example: Story = {
  args: {
    text: 'Secure streamlined document management for easy collaboration.',
    icon: (
      <CheckCircleIcon
        sx={{
          color: colors.bridgeDarkGreen,
        }}
      />
    ),
    onClick: () => console.log('Default item clicked'),
  },
};

// Call-to-Action Story
export const CallToAction: Story = {
  args: {
    text: 'What is a certified valuation?',
    icon: (
      <Image
        height={10.5}
        width={10.5}
        alt="video-play-icon"
        src={'/assets/icons/play-video-icon.svg'}
      />
    ),
    isCallToAction: true,
    onClick: () => console.log('Call-to-action item clicked'),
  },
};
