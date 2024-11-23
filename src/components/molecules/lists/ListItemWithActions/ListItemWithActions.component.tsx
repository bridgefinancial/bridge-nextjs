import { Box, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import ParagraphText from '@/components/atoms/typography/ParagraphText';
import useMergeStyles from '@/hooks/useMergeStyles.hook';

/**
 * Props for the `ListItemWithActions` component.
 */
export interface ListItemWithActionsProps {
  title: string;
  subTitle?: string;
  onClick?: () => void;
  actions: React.ReactNode[];
  sx?: any;
  iconSrc?: string;
}

/**
 * `ListItemWithActions` component displays a document item with actions such as view, download, and delete.
 */
const ListItemWithActions: React.FC<ListItemWithActionsProps> = (props) => {
  const { title, subTitle, actions, onClick, sx, iconSrc } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const defaultStyles = {
    display: 'flex',
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    cursor: 'pointer',
    borderRadius: 2,
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  };

  const mergedStyles = useMergeStyles(defaultStyles, sx);

  return (
    <Box
      sx={mergedStyles}
      onClick={() => (typeof onClick === 'function' ? onClick() : null)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',

          width: '100%',
        }}
      >
        <img className="h-6 w-6" src={iconSrc} alt="PDF Icon" />
        <Grid container={true} spacing={isMobile ? 0 : 2} alignItems="center">
          <Grid item={true} xs={12} sm={6}>
            <ParagraphText>
              <strong>{title}</strong>
            </ParagraphText>
          </Grid>

          {!!subTitle && (
            <Grid item={true} xs={12} sm={4}>
              <ParagraphText>{subTitle}</ParagraphText>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {actions.map((action, index) => {
          return <div key={index}>{action}</div>;
        })}
      </Box>
    </Box>
  );
};

interface ListItemActionButtonProps {
  sx?: any;
  children: React.ReactNode;
  onClick?: () => void;
}

export const ListItemActionButton: React.FC<ListItemActionButtonProps> = (
  props
) => {
  const { sx = {}, onClick = () => {}, children } = props;

  const defaultStyles = {
    width: 40,
    height: 40,
    // Add any default styles here
  };

  const mergedStyles = useMergeStyles(defaultStyles, sx);

  return (
    <IconButton onClick={onClick} sx={mergedStyles}>
      {children ? children : null}
    </IconButton>
  );
};

export default ListItemWithActions;
