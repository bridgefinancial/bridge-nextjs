"use client"

import React from 'react'
import DocumentList from './DocumentList/DocumentList.component'
export default function DocumentsPage() {
  return (
    <DocumentList 
        documents={[]}
        handleOpenDelete={() => {}}
    />
  )
}
