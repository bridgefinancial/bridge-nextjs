import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import useMergeStyles from '@/hooks/useMergeStyles.hook';

export interface Action {
  icon: React.ReactNode;
  onClick: () => void;
}

export interface ListItemWithActionsProps {
  fileIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  actions: Action[];
  sx?: any; // custom styles
}

const ListItemWithActions: React.FC<ListItemWithActionsProps> = (props) => {
  const {
    fileIcon,
    title,
    subtitle,
    actions,
    sx,
  } = props;

  const defaultStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: 'gray.100',
    },
  };

  const mergedStyles = useMergeStyles(defaultStyles, sx);

  return (
    <Box sx={mergedStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {fileIcon && <Box>{fileIcon}</Box>}
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="subtitle1">{title}</Typography>
          {subtitle && <Typography variant="caption">{subtitle}</Typography>}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {actions.map((action, index) => (
          <IconButton key={index} onClick={action.onClick}>
            {action.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};

export default ListItemWithActions;
