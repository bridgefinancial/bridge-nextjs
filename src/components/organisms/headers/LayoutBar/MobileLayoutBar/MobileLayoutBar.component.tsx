import GradientBox from '@/components/atoms/containers/GradientBox';
import LogoImage, {
  DefaultLogoProps,
  LogoImageProps,
} from '@/components/atoms/images/LogoImage/LogoImage.component';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Grid, IconButton, Toolbar, useTheme } from '@mui/material';
import React from 'react';
import type { LayoutBarProps } from '../LayoutBar.types';

interface MobileLayoutBarProps extends LayoutBarProps {
  logoProps: LogoImageProps;
}

const MobileLayoutBar: React.FC<MobileLayoutBarProps> = (
  props: MobileLayoutBarProps
) => {
  const { logoProps = DefaultLogoProps, handleDrawerToggle } = props;

  const theme = useTheme();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          zIndex: theme.zIndex.drawer - 1,
          backgroundColor: theme.palette.common.white, // Set the background color to white
        }}
      >
        <Toolbar sx={{ height: 80, padding: 2 }}>
          <Grid
            container={true}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item={true}>
              <IconButton
                aria-label="open drawer"
                edge="start"
                sx={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  padding: '6px',
                  backgroundColor: theme.palette.common.white,
                  zIndex: 10, // Add z-index to bring it to the front
                  '&:hover': {
                    backgroundColor: theme.palette.grey[300],
                  },
                }}
                onClick={handleDrawerToggle}
              >
                <MenuIcon style={{ color: theme.palette.common.black }} />
              </IconButton>
            </Grid>
            <Grid item={true}>
              <LogoImage {...logoProps} width={100} height={28.52} />
            </Grid>
            <Grid item={true}>{/* Add any additional content here */}</Grid>
          </Grid>
        </Toolbar>
        <GradientBox containerStyle={{ width: '100%', height: 3 }} />
      </AppBar>
    </>
  );
};

export default MobileLayoutBar;
