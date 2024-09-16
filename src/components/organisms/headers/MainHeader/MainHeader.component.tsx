import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { Button } from "@mui/material";
import React from "react";

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
    linkProps = {
      href: "/",
    },
    LinkComponent = Link,
    logoPath = "/assets/images/bridge-logo.png",
    HeaderActions = <></>,
  } = props;

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "white",
        height: "99px",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            maxWidth: 928,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "transparent",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <LinkComponent href={linkProps.href}>
              <Image
                loading={"lazy"}
                src={logoPath} // Adjust the path to your actual logo file location
                width={150} // Image width
                height={42} // Image height
                alt="Logo"
                unoptimized={false}
              />
            </LinkComponent>

            <div>{HeaderActions ? HeaderActions : null}</div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
