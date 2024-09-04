import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import useMergeStyles from '@/hooks/useMergeStyles.hook';

/**
 * Props for the `ListItemWithActions` component.
 */
export interface ListItemWithActionsProps {
  /**
   * Document information to be displayed, including description and updated date.
   */
  document: {
    description: string;
    updatedAt: Date;
  };

  /**
   * Callback to handle viewing the document.
   */
  onViewDocument: (document: any) => void;

  /**
   * Callback to handle deletion of the document.
   */
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Custom styles to override or extend default styles.
   */
  sx?: any;
}

/**
 * `ListItemWithActions` component displays a document item with actions such as view, download, and delete.
 * It provides flexible styling and uses Material UI components.
 *
 * @param props - The properties passed to the component.
 *
 * @example
 * // Example 1: Displaying a list of documents with actions
 * ```tsx
 * import React from 'react';
 * import { ListItemWithActions } from '@/components/ListItemWithActions';
 *
 * const documents = [
 *   { description: 'Document 1', updatedAt: new Date() },
 *   { description: 'Document 2', updatedAt: new Date() },
 * ];
 *
 * const handleViewDocument = (document: any) => {
 *   console.log('Viewing document:', document.description);
 * };
 *
 * const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('Deleting document...');
 * };
 *
 * const DocumentList: React.FC = () => {
 *   return (
 *     <>
 *       {documents.map((doc) => (
 *         <ListItemWithActions
 *           key={doc.description}
 *           document={doc}
 *           onViewDocument={handleViewDocument}
 *           onDelete={handleDelete}
 *         />
 *       ))}
 *     </>
 *   );
 * };
 * ```
 *
 * @example
 * // Example 2: Custom styling for the document list item
 * ```tsx
 * import React from 'react';
 * import { ListItemWithActions } from '@/components/ListItemWithActions';
 *
 * const document = { description: 'Styled Document', updatedAt: new Date() };
 *
 * const handleViewDocument = (document: any) => {
 *   console.log('Viewing document:', document.description);
 * };
 *
 * const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('Deleting document...');
 * };
 *
 * const CustomStyledDocument: React.FC = () => {
 *   return (
 *     <ListItemWithActions
 *       document={document}
 *       onViewDocument={handleViewDocument}
 *       onDelete={handleDelete}
 *       sx={{
 *         border: '2px solid #000',
 *         borderRadius: '12px',
 *         padding: '16px',
 *         backgroundColor: '#f5f5f5',
 *       }}
 *     />
 *   );
 * };
 * ```
 *
 * @example
 * // Example 3: List item with disabled delete action
 * ```tsx
 * import React from 'react';
 * import { ListItemWithActions } from '@/components/ListItemWithActions';
 *
 * const document = { description: 'Non-Deletable Document', updatedAt: new Date() };
 *
 * const handleViewDocument = (document: any) => {
 *   console.log('Viewing document:', document.description);
 * };
 *
 * const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
 *   console.log('Delete action is disabled');
 * };
 *
 * const NonDeletableDocument: React.FC = () => {
 *   return (
 *     <ListItemWithActions
 *       document={document}
 *       onViewDocument={handleViewDocument}
 *       onDelete={handleDelete}
 *     />
 *   );
 * };
 * ```
 */
const ListItemWithActions: React.FC<ListItemWithActionsProps> = (props) => {
  const { document, onViewDocument, onDelete, sx } = props;

  const defaultStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  };

  const mergedStyles = useMergeStyles(defaultStyles, sx);

  return (
    <Box sx={mergedStyles} onClick={() => onViewDocument(document)}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img className="h-6 w-6" src="/assets/images/pdf-file-icon.png" alt="PDF Icon" />
        <Box>
          <Typography variant="subtitle1">
            <strong>{document.description}</strong>
          </Typography>
          <Typography variant="caption">{document.updatedAt.toLocaleDateString()}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconButton onClick={(e) => e.stopPropagation()}>
          <DownloadIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ListItemWithActions;