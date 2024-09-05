import React, { useState } from "react";
import { AppBar, Toolbar, Box, Avatar, Menu, MenuItem, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TitleText from "@/components/atoms/typography/TitleText";
import { BarProps } from "./PortalLayout.types";
import { ArrowDropDown, LogoutRounded } from "@mui/icons-material";
import UserProfileMenu from "./UserProfileMenu.component";

interface TitleBarProps extends Partial<BarProps> {}

const TitleBar: React.FC<TitleBarProps> = ({ title, user, logout }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      elevation={0}
      position="relative"
      sx={{
        backgroundColor: "transparent",
        padding: 0,
        borderWidth: 1,
        borderColor: "transparent"
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
 
          {isMobile? null:
            <UserProfileMenu
            user={user as any}
            menuOptions={[
              {
                startIcon: <LogoutRounded />,
                text: "Log Out",
                onClick: () =>
                  typeof logout === "function"
                    ? logout()
                    : console.log("no existing logout function"),
              },
            ]}
            />}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
