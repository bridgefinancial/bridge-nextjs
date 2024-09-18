import Image from "next/image";
import { LogoProps, PortalLogoProps } from "./PortalLayout.types";

// Define DefaultLogoProps before using it
export const DefaultLogoProps: LogoProps = {
  src: "/assets/images/Bridge-logo.png",
  alt: "Bridge Financial Logo",
  height: 34.23,
  width: 120,
};

const PortalLogo: React.FC<PortalLogoProps> = (props) => {
  const {
    src,
    alt,
    width,
    height,
    containerStyle = {},
  } = { ...DefaultLogoProps, ...props };
  return (
    <div style={containerStyle}>
      <Image
        src={src || DefaultLogoProps.src}
        alt={alt || DefaultLogoProps.alt}
        height={height || DefaultLogoProps.height}
        width={width || DefaultLogoProps.width}
      />
    </div>
  );
};

export default PortalLogo;
