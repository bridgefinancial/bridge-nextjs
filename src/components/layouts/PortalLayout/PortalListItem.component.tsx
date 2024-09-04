import React from "react";
import { ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { PortalListItemProps } from "./PortalLayout.types";
import ParagraphText from "@/components/atoms/typography/ParagraphText";

const PortalListItem: React.FC<PortalListItemProps> = ({
  text = "",
  href = "#",
  active = false,
  icon = "",
  listItemProps,
  LinkComponent,
}) => {
  const theme: Theme = useTheme();

  return (
    <ListItem
      disablePadding
      {...listItemProps}
      sx={{
        width: "100%",
        "& a": {
          width: "inherit",
        },
      }}
    >
      <LinkComponent href={href || "#"} passHref>
        <ListItemButton
          sx={{
            width: "100%",
            padding: "16px",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: icon ? "24px auto" : "auto",
            alignItems: "center",
            "& p": {
              fontWeight: active ? 700 : 600,
              fontSize: "16px",
              "&:hover": {
                fontWeight: 700,
              },
            },
            gap: "8px",
            "&:hover": {
              backgroundColor: "rgba(229, 231, 235, 1)",
            },
            backgroundColor: active ? "rgba(229, 231, 235, 1)" : "inherit",
          }}
        >
          {icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                borderColor: "blue",
                justifyContent: "center",
              }}
            >
              <svg width={17} height={17}>
                <use href={`/assets/icons/${icon}.svg#${icon}`} />
              </svg>
            </Box>
          )}
          <ListItemText
            primary={
              <ParagraphText
                component={"p"}
                sx={{
                  fontWeight: active ? 700 : 400,
                  color: active
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                }}
              >
                {text}
              </ParagraphText>
            }
          />
        </ListItemButton>
      </LinkComponent>
    </ListItem>
  );
};

export default PortalListItem;
