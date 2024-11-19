import { Meta, StoryObj } from '@storybook/react';
import BaseVideoPlayer from './BaseVideoPlayer.component';

const meta: Meta<typeof BaseVideoPlayer> = {
  title: 'components/atoms/players/BaseVideoPlayer',
  component: BaseVideoPlayer,
  parameters: {
    layout: 'centered', // Ensures the video player is centered in the preview
  },
  argTypes: {
    url: {
      control: 'text',
      description: 'URL of the video (local or external)',
    },
    poster: { control: 'text', description: 'Poster image for the video' },
    controls: { control: 'boolean', description: 'Show/hide video controls' },
    autoplay: { control: 'boolean', description: 'Auto-play the video' },
    loop: { control: 'boolean', description: 'Loop the video' },
    muted: { control: 'boolean', description: 'Mute the video' },
    width: {
      control: 'text',
      description: 'Player width (e.g., "100%", "640px")',
    },
    height: {
      control: 'text',
      description: 'Player height (e.g., "100%", "360px")',
    },
    playbackRate: {
      control: { type: 'number', min: 0.5, max: 2.0, step: 0.1 },
      description: 'Playback speed (e.g., 1.0, 1.5, 2.0)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseVideoPlayer>;

export const Default: Story = {
  args: {
    url: 'https://www.youtube.com/watch?v=1ofxRiL64hU', // First YouTube URL
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    width: '720px', // Slightly larger width
    height: '400px',
    playbackRate: 1.0,
  },
  name: 'YouTube Video: Simple Playback',
};
