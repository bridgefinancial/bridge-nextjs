import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Image from 'next/image';

 function MainHeader() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', height: '99px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '99px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Image
              src="/images/logo.png" // Adjust the path to your actual logo file location
              width={150}             // Image width
              height={42}             // Image height
              alt="Logo"
            />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default MainHeader