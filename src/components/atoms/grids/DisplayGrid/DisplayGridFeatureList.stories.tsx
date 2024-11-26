// src/components/design-system/molecules/DisplayGrid.stories.tsx
import FeatureListItem, {
  FeatureListItemProps,
} from '@/components/molecules/display-data/FeatureListItem/FeatureListItem.component';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Meta, StoryObj } from '@storybook/react';
import DisplayGrid, { DisplayGridProps } from './DisplayGrid.component';

import Image from 'next/image';

const sampleFeatureDataUsingImages: FeatureListItemProps[] = [
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Clear, actionable guidance on what to focus on now, next, and in the future.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={30}
        height={30}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Assess performance in Product Market Fit, Lead Generation, Conversion, and Operations with a Health Score.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: '12 months of strategic guidance from a dedicated business advisor.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: 'Obtain a certified valuation and discover growth opportunities for revenue and value.',
  },
  {
    icon: (
      <Image
        alt="checkmark-icon"
        width={24}
        height={24}
        src="/assets/icons/checkmark-circle-icon.svg"
      />
    ),
    text: "Receive tailored strategies to address your business's unique challenges and goals.",
  },
  {
    icon: (
      <Image
        alt="video-play-icon"
        width={18}
        height={18}
        src="/assets/icons/video-play-favicon.svg"
      />
    ),
    isCallToAction: true,
    href: '#',
    text: 'What is a certified valuation?',
  },
];

// Generate a new array with CheckCircleIcon replacing icons for non-call-to-action items
const sampleFeatureDataUsingIcons: FeatureListItemProps[] =
  sampleFeatureDataUsingImages.map((item) => ({
    ...item,
    icon: !item.isCallToAction ? (
      <CheckCircleIcon sx={{ color: '#5dbf6d' }} />
    ) : (
      item.icon
    ),
  }));

const meta: Meta<DisplayGridProps<FeatureListItemProps>> = {
  title: 'components/atoms/grids/DisplayGrid/FeatureListGrid',
  component: DisplayGrid,
  argTypes: {
    data: { control: { disable: true } },
    renderItem: { control: { disable: true } },
    config: { control: { type: 'object' } },
    spacing: { control: { type: 'number' } },
    containerStyle: { control: { type: 'object' } },
    itemStyle: { control: { type: 'object' } },
    keyExtractor: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<DisplayGridProps<FeatureListItemProps>>;

export const Default: Story = {
  args: {
    data: sampleFeatureDataUsingImages,
    renderItem: (item) => <FeatureListItem {...item} />,
  },
};

export const WithContainerStyle: Story = {
  args: {
    data: sampleFeatureDataUsingImages,
    renderItem: (item) => <FeatureListItem {...item} />,
    containerStyle: {
      maxWidth: 966,
      margin: 'auto',
    },
  },
};

export const UsingIconsInsteadOfImages: Story = {
  args: {
    data: sampleFeatureDataUsingIcons,
    renderItem: (item) => <FeatureListItem {...item} />,
    containerStyle: {
      maxWidth: 966,
      margin: 'auto',
    },
  },
};
