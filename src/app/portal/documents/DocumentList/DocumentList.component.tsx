"use client"

import React, { useMemo, useState } from 'react';
import { Box, Button, IconButton, Paper, Typography, Grid, Avatar } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadDialog from '@/components/design-system/molecules/dialogs/UploadDialog';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import ListItemWithActions from '@/components/design-system/molecules/lists/ListItemWithActions';




interface Document {
  filename: string;
  date: string;
}

interface DocumentListProps {
  documents: Document[];
  handleOpenDelete: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, handleOpenDelete }) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenUpload = () => setUploadDialogOpen(true);
  const handleCloseUpload = () => setUploadDialogOpen(false);

  const handleNewFilesProvided = (files: File[]) => {
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleRemoveFileAtIndex = (index: number) => {
    setUploadedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSubmitting(true);
    setTimeout(() => {
      console.log('Files saved:', uploadedFiles);
      setSubmitting(false);
      setUploadDialogOpen(false);
    }, 2000);
  };

  const renderedDocuments = useMemo(() => {
    return documents.map((document, index) => (
      <Grid
        container
        key={index}
        alignItems="center"
        spacing={2}
        sx={{ p: 2, '&:hover': { backgroundColor: 'grey.100' } }}
      >
        {/* File Icon and Name */}
        <Grid item xs={12} lg={4} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src="/assets/images/pdf-file-icon.png"
            alt="PDF File Icon"
            sx={{ width: 24, height: 24 }}
          />
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {document.filename}
            </Typography>
            <Typography variant="body2" sx={{ display: { xs: 'block', lg: 'none' } }}>
              {new Date(document.date).toLocaleDateString('en-US')}
            </Typography>
          </Box>
        </Grid>

        {/* Date Uploaded */}
        <Grid item xs={12} lg={2} sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center' }}>
          <Typography>{new Date(document.date).toLocaleDateString('en-US')}</Typography>
        </Grid>

        {/* Actions */}
        <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          
          <IconButton>
            <DownloadIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenDelete(document)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    ));
  }, [documents, handleOpenDelete]);

  return (
    <Box py={{ xs: 4, lg: 8 }}>
      {/* Upload Button */}
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <ContainedButton
       
         backgroundColor='#6a5ace'
         onClick={handleOpenUpload}
         text='Upload'
         sx={{ borderRadius: '50px', paddingLeft: 3, paddingRight: 3, fontWeight: 600 }}
         startIcon={<UploadIcon color="inherit" />}
        />

       
        
      </Box>

      {/* Document List */}
      <Paper variant="outlined" sx={{ p: 2, borderRadius: '10px', borderColor: 'bridge-gray-border' }}>
        <Grid container spacing={2} sx={{ display: { xs: 'none', lg: 'flex' }, mb: 2 }}>
          <Grid item xs={12} lg={4}>
            <Typography>File Name</Typography>
          </Grid>
          <Grid item xs={12} lg={2}>
            <Typography>Date Uploaded</Typography>
          </Grid>
          <Grid item xs={12} lg={6}></Grid>
        </Grid>
        {renderedDocuments}
      </Paper>



      {/* Upload Dialog */}
      <UploadDialog
        open={uploadDialogOpen}
        onClose={handleCloseUpload}
        onNewFilesProvided={handleNewFilesProvided}
        uploadedFiles={uploadedFiles}
        handleRemoveFileAtIndex={handleRemoveFileAtIndex}
        handleSave={handleSave}
        submitting={submitting}
        
        avatarIcon="/assets/images/pdf-file-icon.png"
        dropzoneText="Drop your files here"
        supportedFormatsText="Supported formats: PDF, DOCX, JPG"
        completeText="Uploaded"
        cancelText="Cancel"
        saveText="Save"
      />
    </Box>
  );
};

export default DocumentList;
