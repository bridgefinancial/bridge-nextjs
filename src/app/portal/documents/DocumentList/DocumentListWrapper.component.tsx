import { useGetCompaniesFilesQuery } from '@/services/documents.service';
import { useRef } from 'react';
import DocumentList from './DocumentList.component';

const DocumentListWrapper = () => {
  // State to store fetched files
  const { data: existingFilesData, refetch: refetchFiles } =
    useGetCompaniesFilesQuery();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <DocumentList
      onUploadSettled={refetchFiles}
      uploadedFiles={existingFilesData?.results}
      onUploadClicked={() => fileInputRef?.current?.click()}
      ref={fileInputRef}
    />
  );
};

export default DocumentListWrapper;
