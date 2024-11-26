import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import FormFooter from './FormFooter.component';

const mockButtonConfig = {
  onClick: action('Button clicked'),
  text: 'Button',
  hidden: false,
  disabled: false,
  isLoading: false,
};

const meta: Meta<typeof FormFooter> = {
  title: 'components/organisms/FormFooter',
  component: FormFooter,
  parameters: {
    docs: {
      description: {
        component:
          'A footer component for forms with fixed positioning and responsive styling.',
      },
    },
  },
  argTypes: {
    isScrolling: {
      control: 'boolean',
      description: 'Indicates whether the user is currently scrolling.',
    },
    previousButtonConfig: {
      control: 'object',
      description: 'Configuration for the previous button.',
    },
    nextButtonConfig: {
      control: 'object',
      description: 'Configuration for the next button.',
    },
    submitButtonConfig: {
      control: 'object',
      description: 'Configuration for the submit button.',
    },
    className: {
      control: 'text',
      description: 'Additional classes for the footer container.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof FormFooter>;

export const Default: Story = {
  args: {
    isScrolling: false,
    previousButtonConfig: {
      ...mockButtonConfig,
      text: 'Previous',
    },
    nextButtonConfig: {
      ...mockButtonConfig,
      text: 'Next',
    },
    submitButtonConfig: {
      ...mockButtonConfig,
      text: 'Submit',
    },
    className: 'custom-class',
  },
};

export const Scrolling: Story = {
  args: {
    isScrolling: true,
    previousButtonConfig: {
      ...mockButtonConfig,
      text: 'Back',
      hidden: false,
      disabled: false,
      isLoading: false,
    },
    nextButtonConfig: {
      ...mockButtonConfig,
      text: 'Forward',
      hidden: false,
      disabled: false,
      isLoading: false,
    },
    submitButtonConfig: {
      ...mockButtonConfig,
      text: 'Submit',
      hidden: false,
      disabled: false,
      isLoading: false,
    },
    className: 'custom-scrolling-class',
  },
};
