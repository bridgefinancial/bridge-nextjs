import React, { useMemo } from "react";
import { Box, SxProps, useMediaQuery, useTheme, Grid } from "@mui/material";

import useMergeStyles from "@/hooks/useMergeStyles.hook";
import ParagraphText from "@/components/atoms/typography/ParagraphText";

interface Column {
  text: string;
  sx?: any; // Allow custom styles for each column
  sm?: any;
  xs?: any;
}

/**
 * Props for the `ListHeader` component.
 */
export interface ListHeaderProps {
  columns?: Column[];
  sx?: any;
}

/**
 * `ListHeader` component displays a document item with customizable columns.
 */
const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const { columns } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderColumns = useMemo(() => {
    if (isMobile) {
      return;
    }
    return columns?.map((column, index) => {
      const { text, sx, xs, sm } = column;

      return (
        <Grid sx={sx} key={index} item={true} xs={xs} sm={sm}>
          <ParagraphText>{text}</ParagraphText>
        </Grid>
      );
    });
  }, [columns, isMobile]);

  return (
    <Grid
      sx={{
        padding: isMobile ? 0 : "16px",
      }}
      container={true}
      alignItems="center"
    >
      {renderColumns}
    </Grid>
  );
};

export default ListHeader;
