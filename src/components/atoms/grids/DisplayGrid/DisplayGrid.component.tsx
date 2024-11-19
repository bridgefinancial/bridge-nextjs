import React from 'react';
import { StyledGridContainer, StyledGridItem } from './DisplayGrid.styles';

export interface DisplayGridProps<T = any> {
  /**
   * List of data to display in the grid.
   */
  data: T[];

  /**
   * Function to render each grid item.
   * @param item - The data item to render.
   * @param index - The index of the data item.
   * @returns ReactNode to render.
   */
  renderItem: (item: T, index: number) => React.ReactNode;

  /**
   * Configuration for the grid layout breakpoints.
   * @default { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
   */
  config?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };

  /**
   * Spacing between grid items.
   * @default 2
   */
  spacing?: number | string;

  /**
   * Optional styles for the grid container.
   */
  containerStyle?: React.CSSProperties;

  /**
   * Optional styles for each grid item.
   */
  itemStyle?: React.CSSProperties;

  /**
   * Optional prop to set a unique key extractor function for each item.
   * Defaults to using the index as the key.
   */
  keyExtractor?: (item: T, index: number) => string | number;
}

export interface GridStyles {
  spacing?: DisplayGridProps['spacing'];
  itemStyle?: DisplayGridProps['itemStyle'];
  config: DisplayGridProps['config'];
  containerStyle: DisplayGridProps['containerStyle'];
}

const DisplayGrid = <T,>({
  data = [],
  renderItem,
  config = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 },
  spacing = 2,
  containerStyle,
  itemStyle = { minWidth: 320, maxWidth: '100%' },
  keyExtractor,
}: DisplayGridProps<T>): JSX.Element => {
  return (
    <StyledGridContainer container spacing={spacing} style={containerStyle}>
      {data.map((item, index) => (
        <StyledGridItem
          item
          xs={config.xs}
          sm={config.sm}
          md={config.md}
          lg={config.lg}
          xl={config.xl}
          key={keyExtractor ? keyExtractor(item, index) : index}
          style={itemStyle}
        >
          {renderItem(item, index)}
        </StyledGridItem>
      ))}
    </StyledGridContainer>
  );
};

export default DisplayGrid;
