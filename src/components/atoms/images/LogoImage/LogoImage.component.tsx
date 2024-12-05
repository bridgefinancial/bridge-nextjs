import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { ImageProps } from 'next/image';
import { CSSProperties } from 'react';

// Define LogoProps without making src and alt required
export interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: string | StaticImport;
  alt?: string;
}

// this right here needs to be "assets/" or the image is going to break for the layout
export const DefaultLogoProps = {
  src: 'assets/images/Bridge-logo.png',
  alt: 'Bridge Financial Logo',
  height: 34.23,
  width: 120,
};

// Extend LogoImageProps from LogoProps and add optional containerStyle
export interface LogoImageProps extends Partial<LogoProps> {
  width?: number;
  height?: number;
  containerStyle?: CSSProperties;
}

const LogoImage: React.FC<LogoImageProps> = (props) => {
  const {
    src = DefaultLogoProps.src, // Use default src if not provided
    alt = DefaultLogoProps.alt, // Use default alt if not provided
    width = DefaultLogoProps.width,
    height = DefaultLogoProps.height,
    containerStyle = {},
  } = props;

  return (
    <div style={containerStyle}>
      <Image
        src={src as string | StaticImport} // Type assertion to satisfy ImageProps requirements
        alt={alt as string} // Type assertion to satisfy ImageProps requirements
        height={height}
        width={width}
      />
    </div>
  );
};

export default LogoImage;
