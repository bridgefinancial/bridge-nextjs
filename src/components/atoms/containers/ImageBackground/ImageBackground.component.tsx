import React from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';

interface ImageBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const ImageBackground: React.FC<ImageBackgroundProps> = ({
  src,
  alt,
  children,
  objectFit = 'cover',
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit={objectFit}
        quality={100}
        style={{ zIndex: -1 }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default ImageBackground;
