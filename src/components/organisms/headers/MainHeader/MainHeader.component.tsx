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
  const {pathForHome = "/", logoPath = "/images/bridge-logo.png"} = props
  return (
    <AppBar position="absolute" sx={{ backgroundColor: 'white', height: '99px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '99px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {/* <Link href={pathForHome}> */}
            <Image
            loading={'lazy'}
              src={logoPath} // Adjust the path to your actual logo file location
              width={150}             // Image width
              height={42}             // Image height
              alt="Logo"
             unoptimized={true}
        
            />

            <img src={logoPath}  width={20} height={20}/>
                        {/* </Link> */}

                      

          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default MainHeader

