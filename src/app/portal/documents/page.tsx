'use client';

import { Suspense } from 'react';
import DocumentListWrapper from './DocumentList/DocumentListWrapper.component';

const DocumentsPage = () => {
  return (
    <Suspense>
      <DocumentListWrapper />
    </Suspense>
  );
};

export default DocumentsPage;
