'use client';

import { useBreakpointQuery } from '@/hooks/useBreakpointQuery.hook';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import React from 'react';

export interface HeaderProps {
  /**
   * Path for the home link. Defaults to "/".
   */
  pathForHome?: string;

  /**
   * Path to the logo image to be displayed in the header.
   * Defaults to "/assets/images/bridge-logo.png".
   */
  logoPath?: string;

  /**
   * Custom Link component to wrap the logo. Defaults to Next.js Link.
   */
  LinkComponent?: typeof Link;

  /**
   * Props for the Link component. Defaults to `{ href: "/" }`.
   */
  linkProps?: LinkProps;

  /**
   * React Node for additional actions or buttons to be displayed
   * in the header, such as buttons or other interactive elements.
   */
  HeaderActions?: React.ReactNode;
}

/**
 * MainHeader is a functional component that displays a logo and optional
 * header actions such as buttons. It uses Material-UI's AppBar and Toolbar components
 * for layout structure and styling.
 *
 * @example
 * // Example usage of MainHeader with buttons in HeaderActions
 *
 * function ExampleHeaderUsage() {
 *   return (
 *     <MainHeader
 *       linkProps={{
 *         href: "/",  // Link to the homepage
 *       }}
 *       logoPath="/assets/images/custom-logo.png"  // Path to custom logo
 *       HeaderActions={
 *         <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
 *           <Button variant="outlined" color="primary">
 *             Sign In
 *           </Button>
 *           <Button variant="contained" color="secondary">
 *             Sign Up
 *           </Button>
 *         </div>
 *       }
 *     />
 *   );
 * }
 */
function MainHeader(props: HeaderProps) {
  const {
    linkProps = { href: '/' },
    LinkComponent = Link,
    logoPath = '/assets/images/bridge-logo.png',
    HeaderActions = <></>,
  } = props;

  const { matches: isMobile, loading } = useBreakpointQuery({
    minWidth: 300,
    maxWidth: 500,
  });

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: 'white',
        height: isMobile ? '80px' : '99px',
        justifyContent: 'center',
        transition: {
          easeInOut: '0.1s',
        },
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters={true}
          sx={{
            height: '100%',
            maxWidth: 928,
            alignItems: 'center',
            borderWidth: 0,
            borderColor: 'transparent',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <LinkComponent {...linkProps}>
              {/* Conditionally render based on screen size */}
              <Image
                loading="lazy"
                src={logoPath}
                width={isMobile ? 107 : 150}
                height={isMobile ? 30 : 42}
                alt="Bridge Financial Logo"
                unoptimized={false}
              />
            </LinkComponent>

            <div style={{ marginLeft: 'auto' }}>
              {HeaderActions ? HeaderActions : null}
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
