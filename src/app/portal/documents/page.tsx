"use client"

import React from 'react'
import DocumentList from './DocumentList/DocumentList.component'
export default function DocumentsPage() {
  // this is where you would put the api call that actually gets the documents
  // when the documents get submitted, you you refetch them again using loaddocuments in the component below it
  // in the finally promise statement, 
  
  return (
    <DocumentList 
    loading={false}
    loadDocuments={() => {}}
        documents={[
          { filename: 'Mock Document 1', date: '2023-09-01' },
          { filename: 'Mock Document 2', date: '2023-08-20' },
        ]}
      
    />
  )
}
