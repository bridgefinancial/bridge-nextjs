// app/client.ts
'use client';

import React from 'react';
// nothing is wrong with my version of my app
// but this tool is really useful for debugging how components render
// and it will be nice to have later
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
