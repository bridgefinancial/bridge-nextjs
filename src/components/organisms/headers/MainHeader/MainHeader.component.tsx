import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link, { LinkProps } from 'next/link';

export interface HeaderProps {
  pathForHome?: string,
  logoPath?: string
  LinkComponent?: typeof Link,
  linkProps?: LinkProps
}

 function MainHeader(props: HeaderProps) {
  const {
    linkProps ={ 
      href: '/'
    },
    LinkComponent = Link,
     logoPath = "/assets/images/bridge-logo.png"} = props
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: "white",
        height: "99px",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '100%', maxWidth: 928, alignItems: 'center',borderWidth: 1, borderColor: 'blue'  }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <LinkComponent href={linkProps.href}>
            <Image
              loading={'lazy'}
              src={logoPath} // Adjust the path to your actual logo file location
              width={150}             // Image width
              height={42}             // Image height
              alt="Logo"
              unoptimized={false}
        
            />
            </LinkComponent>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainHeader;
