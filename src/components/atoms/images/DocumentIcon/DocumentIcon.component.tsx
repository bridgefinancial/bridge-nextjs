import { useDocumentIconPath } from '@/hooks/useDocumentIconPath.hook';
import Image from 'next/image';
const DocumentIcon = ({ fileName }: { fileName: string }) => {
  const iconPath = useDocumentIconPath(fileName);

  return (
    <span>
      <Image src={iconPath} alt={`${fileName} icon`} width={48} height={48} />
    </span>
  );
};

export default DocumentIcon;
