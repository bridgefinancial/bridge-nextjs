import React, { useState, useMemo, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PortalLayoutProps } from './PortalLayout.types';
import PortalListItem from './PortalListItem.component';
import MobileBar from './MobileBar.component';
import TitleBar from './TitleBar.component';
import { portalDrawerStyles } from './PortalLayout.styles';
import Link from 'next/link';
import UserProfileMenu from './UserProfileMenu.component';
import PortalLogo, { DefaultLogoProps } from './PortalLogo.component';
import { CloseSharp, LogoutRounded } from '@mui/icons-material';

const PortalLayout: React.FC<PortalLayoutProps> = ({
  window,
  logoProps = DefaultLogoProps,
  LinkComponent = Link,
  tabs = [],
  user,
  logout,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const [layoutContentHeight, setLayoutContentHeight] = useState('100vh');
  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    if (desktopBarRef.current) {
      const desktopBarHeight = desktopBarRef.current.offsetHeight;
      setLayoutContentHeight(`calc(100vh)`);
    }
  }, []);

  const activeTabLabel = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active);
    return activeTab ? activeTab.label : '';
  }, [tabs]);

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawerStylesToUse = isMobile ? portalDrawerStyles.mobile : portalDrawerStyles.desktop;
  const drawerWidth = drawerStylesToUse.drawerStyles.width;



  const renderLogo = useMemo(() => {
    return (
      <Toolbar>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto 1fr' : '1fr',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <PortalLogo  {...logoProps as any} />
          {isMobile ? (
            <div
            style={{ 
              display: "flex",
              flexDirection: "row-reverse"
             }}>

            <IconButton
              
              edge="end"
              color="inherit"
              sx={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                padding: "6px",
                backgroundColor: theme.palette.common.white,
                zIndex: 10, // Add z-index to bring it to the front
                "&:hover": {
                  backgroundColor: theme.palette.grey[100],
                },
              }}
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <CloseSharp />
              {/* Add any icon or element you need for mobile */}
            </IconButton>
            </div>
          ) : null}
        </div>
      </Toolbar>
    );
  }, [isMobile, logoProps, handleDrawerToggle]);

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#F9FAFB',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <span ref={mobileBarRef}>
        {isMobile ? (
          <MobileBar handleDrawerToggle={handleDrawerToggle} logoProps={logoProps} />
        ) : null}
      </span>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          backgroundColor: '#F9FAFB',
        }}
        aria-label="bridge-financial-menu"
      >
        <Drawer
          container={container}
          variant={isMobile ? 'temporary' : 'persistent'}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#FFFFFF',
            },
          }}
        >
          <Box
            sx={{
              paddingLeft: '24px',
              paddingTop: '20px',
              paddingBottom: '20px',
              paddingRight: '24px',
            }}
          >
            {renderLogo}
            <Divider sx={{ marginBottom: 4.5, borderColor: 'transparent' }} />
            {isMobile && user && 'email' in user ? (
              <UserProfileMenu
                isExpanded={true}
                menuOptions={[
                  {
                    startIcon: <LogoutRounded />,
                    text: 'logout',
                    onClick: () =>
                      typeof logout === 'function'
                        ? logout()
                        : console.log('no existing logout function'),
                  },
                ]}
                user={user}
              />
            ) : null}

            <List
              sx={{
                display: 'grid',
                gridAutoRows: 'auto',
                rowGap: '4px',
                width: '100%',
                maxWidth: drawerStylesToUse.listStyles.maxWidth,
                margin: 'auto',
              }}
            >
              {tabs.map((tab, index) => (
                <PortalListItem
                  key={index}
                  LinkComponent={LinkComponent}
                  text={tab.label || ''}
                  href={tab.linkProps?.href || ''}
                  active={tab.active}
                  icon={tab.icon}
                />
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: 4,
          backgroundColor: '#F9FAFB',
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          minHeight: layoutContentHeight,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F9FAFB',
          }}
        >
          <div ref={desktopBarRef}>
            <TitleBar
              logoProps={logoProps}
              title={activeTabLabel}
              user={user}
              logout={logout}
            />
          </div>
          <Box sx={{ flex: 1 }}>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PortalLayout;
