import ParagraphText from '@/components/atoms/typography/ParagraphText';
import useMergeStyles from '@/hooks/useMergeStyles.hook';
import { Box, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';

/**
 * Props for the `ListItemWithStatus` component.
 */
export interface ListItemWithStatusProps {
  /**
   * Optional icon to represent the file or item.
   */

  /**
   * Main title text for the list item.
   */
  title: string;

  /**
   * Optional subtitle text for additional details.
   */
  subtitle?: string;

  /**
   * Status text that describes the current state of the item.
   */
  status: string;

  /**
   * Optional color for the status text. Defaults to 'green'.
   */
  statusColor?: string;

  /**
   * Optional icon for an action button, such as deleting or editing the item.
   */
  actionIcon?: React.ReactNode;

  /**
   * Callback function when the action button is clicked.
   */
  onAction?: () => void;

  /**
   * Custom styles to override or extend default styles.
   */
  sx?: any;

  iconSrc: string;
}

/**
 * `ListItemWithStatus` component is a flexible and customizable list item
 * that can display an icon, title, subtitle, status, and an action button.
 * It uses Material UI components and allows custom styles via the `sx` prop.
 *
 * @param props - The properties passed to the component.
 *
 * @example
 * // Example 1: Displaying uploaded files
 * ```tsx
 * import React from 'react';
 * import { ListItemWithStatus } from '@/components/ListItemWithStatus';
 * import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
 * import DeleteIcon from '@mui/icons-material/Delete';
 *
 * const UploadedFiles: React.FC = () => {
 *   const files = [
 *     { name: 'Document.pdf', size: '2 MB', status: 'Complete' },
 *     { name: 'Image.png', size: '1.5 MB', status: 'Pending' },
 *   ];
 *
 *   const handleRemoveFile = (fileName: string) => {
 *     console.log(`Removing file: ${fileName}`);
 *   };
 *
 *   return (
 *     <>
 *       {files.map((file) => (
 *         <ListItemWithStatus
 *           key={file.name}
 *           fileIcon={<PictureAsPdfIcon />}
 *           title={file.name}
 *           subtitle={file.size}
 *           status={file.status}
 *           statusColor={file.status === 'Complete' ? 'green' : 'orange'}
 *           actionIcon={<DeleteIcon />}
 *           onAction={() => handleRemoveFile(file.name)}
 *         />
 *       ))}
 *     </>
 *   );
 * };
 * ```
 *
 * @example
 * // Example 2: Displaying process statuses
 * ```tsx
 * import React from 'react';
 * import { ListItemWithStatus } from '@/components/ListItemWithStatus';
 * import InfoIcon from '@mui/icons-material/Info';
 *
 * const ProcessStatus: React.FC = () => {
 *   const processes = [
 *     { name: 'Process 1', status: 'Running', statusColor: 'green' },
 *     { name: 'Process 2', status: 'Failed', statusColor: 'red' },
 *   ];
 *
 *   const handleViewDetails = (processName: string) => {
 *     console.log(`Viewing details for: ${processName}`);
 *   };
 *
 *   return (
 *     <>
 *       {processes.map((process) => (
 *         <ListItemWithStatus
 *           key={process.name}
 *           title={process.name}
 *           status={process.status}
 *           statusColor={process.statusColor}
 *           actionIcon={<InfoIcon />}
 *           onAction={() => handleViewDetails(process.name)}
 *         />
 *       ))}
 *     </>
 *   );
 * };
 * ```
 *
 * @example
 * // Example 3: Custom styling
 * ```tsx
 * import React from 'react';
 * import { ListItemWithStatus } from '@/components/ListItemWithStatus';
 * import EditIcon from '@mui/icons-material/Edit';
 *
 * const CustomStyledList: React.FC = () => {
 *   return (
 *     <ListItemWithStatus
 *       fileIcon={<EditIcon />}
 *       title="Custom Document"
 *       subtitle="Last edited 2 days ago"
 *       status="Draft"
 *       statusColor="blue"
 *       actionIcon={<EditIcon />}
 *       onAction={() => console.log('Editing document')}
 *       sx={{
 *         border: '2px solid blue',
 *         padding: '12px',
 *         borderRadius: '16px',
 *       }}
 *     />
 *   );
 * };
 * ```
 */
const ListItemWithStatus: React.FC<ListItemWithStatusProps> = (props) => {
  const {
    title,
    subtitle,
    status,
    statusColor = 'green',
    actionIcon,
    onAction,
    sx,
    iconSrc,
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
        <Box>
          <Image alt="File Type Icon" width={20} height={20} src={iconSrc} />
        </Box>
        <Box sx={{ marginLeft: 2 }}>
          <ParagraphText>{title}</ParagraphText>
          <Grid container={true} spacing={1}>
            <Grid item={true}>
              {subtitle && <ParagraphText>{subtitle}</ParagraphText>}
            </Grid>
            <Grid item={true}>
              <ParagraphText sx={{ color: statusColor, marginRight: 2 }}>
                {status}
              </ParagraphText>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {actionIcon && <IconButton onClick={onAction}>{actionIcon}</IconButton>}
      </Box>
    </Box>
  );
};

export default ListItemWithStatus;
