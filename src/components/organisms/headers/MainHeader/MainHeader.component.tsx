import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  pathForHome?: string,
  logoPath?: string
}

 function MainHeader(props: HeaderProps) {
  const {pathForHome = "/", logoPath = "/assets/images/bridge-logo.png"} = props
  return (
    <AppBar position="relative" sx={{ backgroundColor: 'white', height: '99px', borderWidth: 1, borderColor: 'blue', justifyContent: 'center' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: '100%', maxWidth: 928, alignItems: 'center',borderWidth: 1, borderColor: 'blue'  }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
            <Link href={pathForHome}>
            <Image
              loading={'lazy'}
              src={logoPath} // Adjust the path to your actual logo file location
              width={150}             // Image width
              height={42}             // Image height
              alt="Logo"
              unoptimized={false}
        
            />
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default MainHeader

