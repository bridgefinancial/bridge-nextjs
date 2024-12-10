const getMimeType = (format: string): string | null => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return 'application/pdf';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case 'doc':
      return 'application/msword';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'txt':
      return 'text/plain';
    case 'csv':
      return 'text/csv';
    case 'rtf':
      return 'application/rtf';
    default:
      return null;
  }
};

export default getMimeType;
