"use client";

import { useDocumentsForm } from "@/hooks/useDocumentsForm";
import { Suspense } from "react";
import DocumentList from "./DocumentList/DocumentList.component";
export default function DocumentsPage() {

  const {
    formState,

    isLoading,
    refetchFiles,
    onUploadFiles,
    handleSubmit,
    onFileDelete,
  } = useDocumentsForm()
  // this is where you would put the api call that actually gets the documents
  // when the documents get submitted, you you refetch them again using loaddocuments in the component below it
  // in the finally promise statement,

  return (
    <Suspense>
      <DocumentList
   
        formState={formState}
       isLoading={isLoading}
          refetchFiles={refetchFiles}
          onUploadFiles={onUploadFiles}
          handleSubmit={handleSubmit}
          onFileDelete={onFileDelete}

      />
    </Suspense>
  );
}
