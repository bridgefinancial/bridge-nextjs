// src/components/design-system/molecules/DisplayGrid.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';
import DisplayGrid, { DisplayGridProps } from './DisplayGrid.component';

const sampleData = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
}));

const meta: Meta<DisplayGridProps<{ id: number; label: string }>> = {
  title: 'components/atoms/grids/DisplayGrid',
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

type Story = StoryObj<DisplayGridProps<{ id: number; label: string }>>;

export const Default: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div
        style={{ padding: '8px', background: '#e0e0e0', textAlign: 'center' }}
      >
        {item.label}
      </div>
    ),
  },
};

export const CustomSpacing: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div
        style={{ padding: '8px', background: '#ffccbc', textAlign: 'center' }}
      >
        {item.label}
      </div>
    ),
    spacing: 4,
  },
};

export const CustomConfig: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div
        style={{ padding: '8px', background: '#bbdefb', textAlign: 'center' }}
      >
        {item.label}
      </div>
    ),
    config: { xs: 12, sm: 6, md: 3, lg: 2, xl: 1 },
  },
};

export const StyledContainer: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div
        style={{ padding: '8px', background: '#c8e6c9', textAlign: 'center' }}
      >
        {item.label}
      </div>
    ),
    containerStyle: { border: '2px solid #4caf50', padding: '16px' },
  },
};

export const StyledItems: Story = {
  args: {
    data: sampleData,
    renderItem: (item) => (
      <div
        style={{
          padding: '8px',
          background: '#ffcdd2',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        {item.label}
      </div>
    ),
    itemStyle: {
      background: '#ffcdd2',
      borderRadius: '8px',
      textAlign: 'center',
    },
  },
};

export const CustomKeyExtractor: Story = {
  args: {
    data: sampleData,
    renderItem: (item: {
      label:
        | string
        | number
        | bigint
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | Promise<AwaitedReactNode>
        | null
        | undefined;
    }) => (
      <div
        style={{ padding: '8px', background: '#fff9c4', textAlign: 'center' }}
      >
        {item.label}
      </div>
    ),
    keyExtractor: (item: { id: any }) => `custom-key-${item.id}`,
  },
};
