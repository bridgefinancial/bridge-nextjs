import React from "react";
import { ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";
import { PortalListItemProps } from "./PortalLayout.types";
import ParagraphText from "@/components/design-system/atoms/typography/ParagraphText";

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
    <ListItem disablePadding {...listItemProps} sx={{ width: '100%' }}>
      <LinkComponent href={href || "#"} passHref>
        <ListItemButton
          sx={{
            width: '100%',
            padding: "16px",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: icon ? "24px auto" : "auto",
            alignItems: "center",
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
                justifyContent: "center",
              }}
            >
              <svg width={16} height={16}>
                <use href={`/assets/icons/${icon}.svg#${icon}`} />
              </svg>
            </Box>
          )}
          <ListItemText
            primary={
              <ParagraphText
                sx={{
                  fontWeight: active ? "bold" : "normal",
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
