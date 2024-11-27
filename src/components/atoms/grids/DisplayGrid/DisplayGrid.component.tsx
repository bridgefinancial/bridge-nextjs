import React from 'react';
import { Grid } from '@mui/material';

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
   * Configuration for each grid item's column widths at
   * different breakpoints.
   * @default { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }
   */
  gridItemSizes?: {
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

const DisplayGrid = <T,>({
  data = [],
  renderItem,
  gridItemSizes = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 },
  spacing = 2,
  containerStyle,
  itemStyle = { minWidth: 320, maxWidth: '100%' },
  keyExtractor,
}: DisplayGridProps<T>): JSX.Element => {
  return (
    <Grid container={true} spacing={spacing} style={containerStyle}>
      {data.map((item, index) => (
        <Grid
          item={true}
          xs={gridItemSizes.xs}
          sm={gridItemSizes.sm}
          md={gridItemSizes.md}
          lg={gridItemSizes.lg}
          xl={gridItemSizes.xl}
          key={keyExtractor ? keyExtractor(item, index) : index}
          style={{ transition: 'transform 0.3s ease-in-out', ...itemStyle }}
        >
          {renderItem(item, index)}
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayGrid;
