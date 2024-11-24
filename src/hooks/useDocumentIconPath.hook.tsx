import { useMemo } from 'react';
const fileTypePaths: Record<string, string> = {
  csv: '/assets/icons/csv-icon.svg',
  docx: '/assets/icons/docx-icon.svg',
  xlsx: '/assets/icons/xlsx-icon.svg',
  pdf: '/assets/icons/pdf-icon.svg',
};

/**
 * Hook to get the document icon path from a file name.
 * @param fileName - The name of the file to determine the icon path.
 * @returns The file path of the corresponding file icon.
 */
export const useDocumentIconPath = (fileName: string): string => {
  const iconPath = useMemo(() => {
    if (!fileName) return fileTypePaths.pdf; // Default for missing file names

    // Extract the file extension
    const extension = fileName.split('.').pop()?.toLowerCase();

    // Return the corresponding path or default to PDF
    return (
      fileTypePaths[extension as keyof typeof fileTypePaths] ||
      fileTypePaths.pdf
    );
  }, [fileName]);

  return iconPath;
};
