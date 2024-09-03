import React, { useState } from "react";
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TitleText from "@/components/design-system/atoms/typography/TitleText";
import { BarProps } from "./PortalLayout.types";

interface TitleBarProps extends Partial<BarProps> {}

const TitleBar: React.FC<TitleBarProps> = ({ title, user, logout }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

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
            maxWidth: "1200px",
            color: theme.palette.text.primary,
            paddingY: 2,
            paddingX: 0,
            backgroundColor: "inherit",
            margin: "0 auto",
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

export default TitleBar;
