'use client';

import LogoImage, {
  DefaultLogoProps,
  LogoImageProps,
} from '@/components/atoms/images/LogoImage/LogoImage.component';
import UserProfileMenu from '@/components/molecules/menus/UserProfileMenu';
import PortalListItem from '@/components/organisms/lists/PortalListItem/PortalListItem.component';
import withAuth, { AuthInjectedProps } from '@/hoc/withAuth/withAuth';
import { useCelebration } from '@/hooks/useCelebration';
import { LayoutForPortalProps, PortalTab } from '@/types/layout.types';
import { CloseSharp, LogoutRounded } from '@mui/icons-material';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
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
import DesktopLayoutBar from '../../../organisms/headers/LayoutBar/DesktopLayoutBar/DesktopLayoutBar.component';
import MobileLayoutBar from '../../../organisms/headers/LayoutBar/MobileLayoutBar/MobileLayoutBar.component';
import { portalDrawerStyles } from './PortalLayout.styles';

export const LayoutForPortal: React.FC<LayoutForPortalProps> = ({
  window,
  logoProps = DefaultLogoProps,
  LinkComponent = Link,
  tabs = [],
  user,
  logout,
  children,
  pathname = '/auth/portal',
}) => {
  // STATE
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layoutContentHeight, setLayoutContentHeight] = useState('100vh');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const mobileBarRef = useRef<HTMLDivElement>(null);
  const segment = useSelectedLayoutSegment();
  const handleDrawerToggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  }, [isMobile, mobileOpen]);

  useCelebration();

  useEffect(() => {
    if (desktopBarRef.current) {
      setLayoutContentHeight('calc(100vh)');
    }
  }, []);

  const activeTabLabel = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active);
    if (activeTab) {
      return activeTab?.label;
    }
    if (segment) {
      return (
        segment[0].toLocaleUpperCase() + segment.slice(1).replace('-', ' ')
      );
    }
    return '';
  }, [segment, tabs]);

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

  const handleLogout: () => void = () => {
    console.log('logging out');
    if (typeof logout === 'function') {
      console.log('invoking logout function');
      // make sure this is not an await function
      logout();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#F9FAFB',
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
                    onClick: handleLogout,
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
                  active={pathname === tab.linkProps?.href}
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
            <DesktopLayoutBar
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

// all this means is that it has data, above the view
// think of it as the controller, the queries should be separate from the view,
interface PortalLayoutProps extends Partial<LayoutForPortalProps> {
  window?: () => Window;
  logoProps?: LogoImageProps;
  LinkComponent?: typeof Link;
  tabs?: PortalTab[];
  children?: React.ReactNode;
}

// Define PortalLayout using withAuth HOC
const PortalLayout = withAuth(
  ({
    sessionQuery,
    logout,
    ...rest
  }: AuthInjectedProps & { [key: string]: any }) => {
    // QUERIES
    const pathname = usePathname();
    return (
      <LayoutForPortal
        user={sessionQuery?.data}
        pathname={pathname}
        logout={logout || (() => console.log('please pass logout prop'))}
        {...rest}
      />
    );
  }
);

export default PortalLayout;
