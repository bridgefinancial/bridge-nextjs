import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

export const portalDrawerStyles = {
  desktop: {
    drawerStyles: {
      maxWidth: 220,
      width: 220,
    },
    listStyles: {
      maxWidth: 280,
    },
  },
  mobile: {
    listStyles: {
      maxWidth: 300,
    },
    drawerStyles: {
      maxWidth: 320,
      width: 320,
    },
  },
};
interface PortalDrawerContentProps {
  isMobile: boolean;
}

export const PortalLayoutContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#F9FAFB",
}));

export const PortalNav = styled(Box)(({ theme }) => ({
  width: theme.breakpoints.up("sm")
    ? portalDrawerStyles.desktop.drawerStyles.width
    : portalDrawerStyles.mobile.drawerStyles.width,
  flexShrink: 0,
  backgroundColor: "#F9FAFB",
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    backgroundColor: "#FFFFFF", // Additional mobile-specific styles if needed
  },
}));

export const PortalDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: theme.breakpoints.down("sm")
      ? portalDrawerStyles.mobile.drawerStyles.width
      : portalDrawerStyles.desktop.drawerStyles.width,
    backgroundColor: "#FFFFFF", // Ensure the background color is applied consistently
  },
}));

export const PortalMainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: "#F9FAFB",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // This will be dynamically updated in the component
  width: "100%",
  maxWidth: "1200px",
  boxSizing: "border-box",
}));

export const PortalDrawerContent = styled("div")<PortalDrawerContentProps>(
  ({ theme, isMobile }) => ({
    maxWidth: isMobile
      ? portalDrawerStyles.mobile.drawerStyles.width
      : portalDrawerStyles.desktop.drawerStyles.width, // Drawer width based on screen size
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing(1),
  }),
);

export const PortalDivider = styled(Divider)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
