import React from 'react';
import ImprovementArea from './ImprovementArea/ImprovementArea';
import { notFound } from 'next/navigation';

const ImprovementAreaPage = ({
  params,
}: {
  params: { improvementArea: string };
}) => {
  const improvementAreaId = parseInt(params?.improvementArea);
  if (!params.improvementArea || !improvementAreaId) {
    notFound();
  }
  return <ImprovementArea improvementAreaId={improvementAreaId} />;
};

export default ImprovementAreaPage;
