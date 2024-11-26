interface ViewportStyle {
  width: string;
  height: string;
}

interface CustomViewport {
  name: string;
  styles: ViewportStyle;
  type?: string;
}

interface ViewportMap {
  [key: string]: CustomViewport;
}
// Landscape Viewport
export const landscapeViewPorts: ViewportMap = {
  tabletLandscape: {
    name: 'Tablet Landscape',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
  laptop: {
    name: 'Laptop',
    styles: {
      width: '1280px',
      height: '800px',
    },
  },
  desktop: {
    name: 'Desktop',
    styles: {
      width: '1440px',
      height: '900px',
    },
  },
  tv: {
    name: 'TV',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
  extraSmallDeviceLandscape: {
    name: 'Landscape Extra Small Device',
    styles: {
      width: '575px',
      height: '320px',
    },
    type: 'mobile',
  },
  smallDeviceLandscape: {
    name: 'Landscape Small Device',
    styles: {
      width: '576px',
      height: '320px',
    },
    type: 'mobile',
  },
  mediumDeviceLandscape: {
    name: 'Landscape Medium Device',
    styles: {
      width: '768px',
      height: '481px',
    },
    type: 'tablet',
  },
  largeDeviceLandscape: {
    name: 'Landscape Large Device',
    styles: {
      width: '992px',
      height: '769px',
    },
    type: 'tablet',
  },
  extraLargeDeviceLandscape: {
    name: 'Landscape Extra Large Device',
    styles: {
      width: '1200px',
      height: '1025px',
    },
    type: 'desktop',
  },
  iPhone12MiniLandscape: {
    name: 'iPhone 12 Mini Landscape',
    styles: {
      width: '812px',
      height: '375px',
    },
    type: 'mobile',
  },
  foldedDeviceLandscape: {
    name: 'Folded Device Landscape',
    styles: {
      width: '280px',
      height: '373px',
    },
    type: 'mobile',
  },
};

// Portrait Viewports
export const portraitViewPorts: ViewportMap = {
  iPhone12MiniPortrait: {
    name: 'iPhone 12 Mini Portrait',
    styles: {
      width: '375px',
      height: '812px',
    },
    type: 'mobile',
  },
  extraSmallDevicePortrait: {
    name: 'Portrait Extra Small Device',
    styles: {
      width: '320px',
      height: '480px',
    },
    type: 'mobile',
  },
  smallDevicePortrait: {
    name: 'Portrait Small Device',
    styles: {
      width: '390px',
      height: '480px',
    },
    type: 'mobile',
  },
  mediumDevicePortrait: {
    name: 'Portrait Medium Device',
    styles: {
      width: '481px',
      height: '768px',
    },
    type: 'tablet',
  },
  largeDevicePortrait: {
    name: 'Portrait Large Device',
    styles: {
      width: '769px',
      height: '1024px',
    },
    type: 'tablet',
  },
  extraLargeDevicePortrait: {
    name: 'Portrait Extra Large Device',
    styles: {
      width: '1025px',
      height: '1366px',
    },
    type: 'desktop',
  },
  foldedDevicePortrait: {
    name: 'Folded Device Portrait',
    styles: {
      width: '280px',
      height: '680px',
    },
    type: 'mobile',
  },
};

// Combined Custom Viewports
export const customViewPorts: ViewportMap = {
  ...landscapeViewPorts,
  ...portraitViewPorts,
};
