import React, { useState, useMemo, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import GradientBox from "@/components/design-system/atoms/containers/GradientBox";
import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import TitleText from "@/components/design-system/atoms/typography/TitleText";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
}

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  logoProps?: ImageProps;
  tabs?: PortalTab[];
  user?: UserProps;
  logout?: () => void;
  children?: React.ReactNode;
}

interface PortalTab {
  label?: string;
  icon?: string;
  active?: boolean;
  linkProps?: LinkProps;
}

interface DrawerListItemProps {
  text: string;
  href: string | any;
  active?: boolean;
  icon?: string;
}

export const DrawerListItem: React.FC<DrawerListItemProps> = ({
  text,
  href,
  active,
  icon,
}) => {
  const theme: Theme = useTheme();

  return (
    <ListItem disablePadding>
      <Link href={href} passHref>
        <ListItemButton
          sx={{ backgroundColor: active ? "gray.200" : "inherit" }}
        >
          <ListItemIcon>
            <Box
              sx={{
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px",
                color: active
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
              }}
            >
              <svg width="100%" height="100%">
                <use href={`/assets/icons/${icon}.svg#${icon}`} />
              </svg>
            </Box>
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              color: active
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
              fontWeight: active ? "bold" : "normal",
            }}
          />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

interface BarProps {
  logoProps: ImageProps;
  title?: string;
  handleDrawerToggle?: () => void;
  logout?: () => void;
  user?: UserProps;
}

const MobileBar: React.FC<BarProps> = (props: BarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { logoProps, handleDrawerToggle } = props;
  return (
    <AppBar
      className={""}
      position="fixed"
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
      }}
    >
      <Toolbar sx={{ height: 80, padding: 2, justifyContent: "space-between" }}>
        <div>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </div>
        <div>
          <Image width={100} height={28.52} {...logoProps} />
        </div>
        <div></div>
      </Toolbar>
      <GradientBox containerStyle={{ width: "100%", height: 3 }} />
    </AppBar>
  );
};
const DesktopBar: React.FC<BarProps> = (props: BarProps) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { title, user, logout } = props;

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };
  

  return (
    <AppBar
      elevation={0}
      position="relative"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
        padding: 0,
        borderWidth: 1,
        borderColor: "blue",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ height: 80, padding: 0, backgroundColor: "inherit" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "1200px",  // maxWidth applied here
            color: theme.palette.text.primary,
            paddingY: 2,
            paddingX: 0,
            backgroundColor: "inherit",
            margin: "0 auto",  // Center the bar
          }}
        >
          <TitleText
            component={"h1"}
            sx={{
              fontSize: 32,
              fontWeight: 600,
            }}
            style={{
              color: "#212121",
            }}
          >
            {title}
          </TitleText>
          <Box
            sx={{
              backgroundColor: "inherit",
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              gap: 2,

              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
            onClick={openMenu}
          >
            <Box
              sx={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "inherit",
                justifyContent: "center",
              }}
            >
              <Avatar>{user?.firstName ? user.firstName[0] : null}</Avatar>
            </Box>
          </Box>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={logout}>Log out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


const PortalLayout: React.FC<Props> = ({
  window,
  logoProps = {
    src: "/assets/images/bridge-logo.png",
    alt: "Bridge Financial Logo",
  },
  tabs = [],
  user,
  logout,
  children,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const desktopBarRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState("100vh");

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    }
  };

  useEffect(() => {
    if (desktopBarRef.current) {
      const desktopBarHeight = desktopBarRef.current.offsetHeight;
      setMinHeight(`calc(100vh - ${desktopBarHeight}px)`);
    }
  }, []);

  const activeTabLabel = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active);
    return activeTab ? activeTab.label : "";
  }, [tabs]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {tabs.map((tab, index) => (
          <DrawerListItem
            key={index}
            text={tab.label || ""}
            href={tab.linkProps?.href || ""}
            active={tab.active}
            icon={tab.icon}
          />
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div>

      {isMobile ? (
        <MobileBar
          handleDrawerToggle={handleDrawerToggle}
          logoProps={logoProps}
        />
      ) : null}
            </div>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={isMobile ? "temporary" : "persistent"}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, padding: 4 }}>
       
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            boxSizing: "border-box",
            backgroundColor: "#f9fafb",
            minHeight: minHeight, // Use the calculated minHeight
            display: "flex",
            flexDirection: "column", // Ensures children stack vertically
          }}
        >
           <div ref={desktopBarRef}>
          <DesktopBar
            logoProps={logoProps}
            title={activeTabLabel}
            user={user}
            logout={logout}
          />
        </div>
          <Box sx={{ flex: 1 }}>{children ? children : null}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PortalLayout;
