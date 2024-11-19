import LogoImage from '@/components/atoms/images/LogoImage';
import { ArrowRight } from '@mui/icons-material';
import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';
import MessageWithCTA from './MessageWithCTA.component';

const meta: Meta<typeof MessageWithCTA> = {
  title: 'components/organisms/MessageWithCTA',
  component: MessageWithCTA,
  parameters: {
    layout: 'centered', // Ensures the component is centered in the viewport
  },
  argTypes: {
    titleProps: {
      description: 'Title text and styling for the MessageWithCTA component',
    },
    paragraphProps: {
      description:
        'Paragraph text and styling for the MessageWithCTA component',
    },
    buttonProps: {
      description:
        'Props for configuring the button, including text, color, and actions',
    },
    icon: {
      description: 'Icon or graphic to display above the title',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MessageWithCTA>;

export const CustomStyles: Story = {
  args: {
    titleProps: {
      titleText: 'Custom Styled Title',
      titleStyles: { color: '#ff5722', fontSize: '24px', fontWeight: 'bold' },
    },
    paragraphProps: {
      paragraphText: 'This is a custom styled paragraph.',
      paragraphStyles: { color: '#9e9e9e', fontStyle: 'italic' },
    },
    buttonProps: {
      text: 'Styled Button',
      backgroundColor: '#03a9f4',
      textColor: '#ffffff',
      onClick: () => alert('Custom styled button clicked!'),
    },
    icon: <LogoImage width={100} height={50} />,
  },
};

export const WithoutIcon: Story = {
  args: {
    titleProps: {
      titleText: 'Title Without Icon',
    },
    paragraphProps: {
      paragraphText: 'This variant does not include an icon.',
    },
    buttonProps: {
      text: 'No Icon Button',
      onClick: () => alert('No icon button clicked!'),
    },
    icon: null, // No icon in this variant
  },
};

export const Default: Story = {
  args: {
    titleProps: {
      titleText: 'Discover your business’s worth',
    },
    paragraphProps: {
      paragraphText: 'Get a Bridge Certified Valuation for $1,999.',
    },
    buttonProps: {
      text: 'Order Certified Valuation',
      endIcon: <ArrowRight />,
      onClick: () => alert('Learn More clicked!'),
    },
    icon: (
      <Image
        width={57.93}
        height={62.37}
        alt="Bridge Financial Shield"
        src={'/assets/images/bridge-shield-icon.png'}
      />
    ),
  },
};

export const ButtonLink: Story = {
  args: {
    titleProps: {
      titleText: 'Button as a Link',
    },
    paragraphProps: {
      paragraphText: 'The button in this example behaves as a hyperlink.',
    },
    buttonProps: {
      text: 'Go to Docs',
      href: 'https://storybook.js.org/',
      target: '_blank', // Open link in a new tab
    },
    icon: (
      <Image
        width={57.93}
        height={62.37}
        alt="Bridge Financial Shield"
        src={'/assets/images/bridge-shield-icon.png'}
      />
    ),
  },
};
