'use client';

import LogoImage, {
  DefaultLogoProps,
} from '@/components/atoms/images/LogoImage/LogoImage.component';
import UserProfileMenu from '@/components/molecules/menus/UserProfileMenu';
import PortalListItem from '@/components/organisms/lists/PortalListItem/PortalListItem.component';
import { useLogoutUser, useSessionUser } from '@/services/users.service';
import { LayoutForPortalProps } from '@/types/layout.types';
import { CloseSharp, LogoutRounded } from '@mui/icons-material';
import { Box, CssBaseline } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import MobileLayoutBar from '../../../organisms/headers/LayoutBar/MobileLayoutBar/MobileLayoutBar.component';
import { portalDrawerStyles } from '../PortalLayout/PortalLayout.styles';
export interface OfferLayoutProps extends LayoutForPortalProps {}

// it might be a good idea to have a containers, or views folder where we connect these to data
export const OfferLayout: React.FC<OfferLayoutProps> = ({
  window,
  logoProps = DefaultLogoProps,
  LinkComponent = Link,
  tabs = [],
  children,
  user = {},
  logout = () => {},
  pathname = '/auth/portal',
}) => {
  // STATE
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layoutContentHeight, setLayoutContentHeight] = useState('100vh');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  }, [isMobile, mobileOpen]);

  useEffect(() => {
    if (desktopBarRef.current) {
      setLayoutContentHeight('calc(100vh)');
    }
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerStylesToUse = isMobile
    ? portalDrawerStyles.mobile
    : portalDrawerStyles.desktop;
  const drawerWidth = drawerStylesToUse.drawerStyles.width;

  const renderLogo = useMemo(() => {
    return (
      <Toolbar>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'auto 1fr' : '1fr',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LogoImage {...(logoProps as any)} />
          {isMobile ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
              <IconButton
                edge="end"
                color="inherit"
                sx={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  padding: '6px',
                  backgroundColor: theme.palette.common.white,
                  zIndex: 10, // Add z-index to bring it to the front
                  '&:hover': {
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
  }, [
    isMobile,
    logoProps,
    theme.palette.common.white,
    theme.palette.grey,
    handleDrawerToggle,
  ]);

  return (
    <div
      test-id={'offer-layout'}
      style={{
        display: 'flex',

        width: '100%',
        backgroundColor: '#FBFBFB',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <CssBaseline />
      <span ref={mobileBarRef}>
        {isMobile ? (
          <MobileLayoutBar
            handleDrawerToggle={handleDrawerToggle}
            logoProps={logoProps}
          />
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
                    text: 'Log out',
                    onClick: () => {
                      console.log('logging out');
                      if (typeof logout === 'function') {
                        logout();
                      }
                    },
                  },
                ]}
                user={user as any}
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
                  active={pathname === tab.linkProps?.href}
                  icon={tab.icon}
                />
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <main
        test-id="main-box"
        style={{
          flexGrow: 1,
          padding: 0,
          backgroundColor: 'transparent',
          marginLeft: isMobile ? 0 : `${drawerWidth}px`,
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          minHeight: layoutContentHeight,
        }}
      >
        <div
          test-id="inner-box-for-main"
          style={{
            width: '100%',
            // maxWidth: '1200px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'transparent',
          }}
        >
          {children ? children : null}
        </div>
      </main>
    </div>
  );
};

// all this means is that it has data, above the view
// think of it as the controller, the queries should be separate from the view

interface OfferLayoutWithDataProps extends Partial<OfferLayoutProps> {}

const OfferLayoutWithData: React.FC<OfferLayoutWithDataProps> = (props) => {
  const { tabs: tempTabs = [], ...rest } = props;

  // QUERIES
  const { data: user } = useSessionUser();

  // HOOKS
  const { mutateAsync: logout } = useLogoutUser();
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  // Map and determine active tabs in a single step
  const tabs = useMemo(() => {
    let activeTabFound = false;

    return tempTabs.map((tab) => {
      const isActive =
        tab.active ||
        (!activeTabFound &&
          tab.label?.toLowerCase() === segment?.toLowerCase());
      if (isActive) activeTabFound = true; // Ensure only one active tab
      return { ...tab, active: isActive };
    });
  }, [tempTabs, segment]);

  return (
    <OfferLayout
      user={user}
      pathname={pathname}
      logout={logout}
      tabs={tabs}
      {...rest}
    />
  );
};
export default OfferLayoutWithData;
