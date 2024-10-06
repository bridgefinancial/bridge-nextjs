"use client";

import { Suspense } from "react";
import DocumentList from "./DocumentList/DocumentList.component";

const DocumentsPage = () => {

  return (
    <Suspense>
      <DocumentList />
    </Suspense>
  );
}

export default DocumentsPage;
