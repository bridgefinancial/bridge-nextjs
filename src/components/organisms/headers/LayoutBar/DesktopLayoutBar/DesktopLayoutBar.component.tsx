import TitleText from '@/components/atoms/typography/TitleText';
import UserProfileMenu from '@/components/molecules/menus/UserProfileMenu';
import { LogoutRounded } from '@mui/icons-material';
import { AppBar, Box, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import { LayoutBarProps } from '../LayoutBar.types';

export interface DesktopLayoutBarProps extends Partial<LayoutBarProps> {}

const DesktopLayoutBar: React.FC<DesktopLayoutBarProps> = ({
  title,
  user,
  logout,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    if (logout && typeof logout === 'function') {
      console.log('logging out');
      logout();
    }
  };
  return (
    <AppBar
      elevation={0}
      position="relative"
      sx={{
        backgroundColor: 'transparent',
        padding: 0,

        borderWidth: 1,
        borderColor: 'transparent',
      }}
    >
      <Toolbar
        disableGutters={true}
        sx={{ height: 80, padding: 0, backgroundColor: 'inherit' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            color: theme.palette.text.primary,
            paddingY: 2,
            paddingX: 0,
            backgroundColor: 'inherit',
            margin: '0 auto',
          }}
        >
          <TitleText
            component={'h1'}
            sx={{
              fontSize: 32,
              fontWeight: 600,
            }}
            style={{
              color: '#212121',
            }}
          >
            {title}
          </TitleText>

          {isMobile ? null : (
            <UserProfileMenu
              user={user as any}
              menuOptions={[
                {
                  startIcon: <LogoutRounded />,
                  text: 'Log Out',
                  onClick: () => handleLogout(),
                },
              ]}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DesktopLayoutBar;