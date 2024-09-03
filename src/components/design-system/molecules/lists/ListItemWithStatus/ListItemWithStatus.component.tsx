import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { BaseTypographyProps } from '@/types/base-typography-props.interface';
import useMergeStyles from '@/hooks/useMergeStyles.hook';

export interface ListItemWithStatusProps {
  fileIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  status: string;
  statusColor?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  sx?: any; // custom styles
}

const ListItemWithStatus: React.FC<ListItemWithStatusProps> = (props) => {
  const {
    fileIcon,
    title,
    subtitle,
    status,
    statusColor = 'green',
    actionIcon,
    onAction,
    sx,
  } = props;

  const defaultStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #000',
    borderRadius: '12px',
    padding: '8px',
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
        <Typography sx={{ color: statusColor, marginRight: 2 }}>
          {status}
        </Typography>
        {actionIcon && (
          <IconButton onClick={onAction}>
            {actionIcon}
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ListItemWithStatus;
