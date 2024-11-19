import ParagraphText from '@/components/atoms/typography/ParagraphText';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemProps,
  ListItemText,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { LinkProps } from 'next/link';
import React from 'react';

export interface PortalListItemProps {
  text: string;
  href: string | any;
  active?: boolean;
  icon?: string;
  LinkComponent: React.ForwardRefExoticComponent<
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof any> &
      any & {
        children?: React.ReactNode;
      } & React.RefAttributes<HTMLAnchorElement>
  >;
  linkProps?: LinkProps;
  listItemProps?: ListItemProps;
}
const PortalListItem: React.FC<PortalListItemProps> = ({
  text = '',
  href = '#',
  active = false,
  icon = '',
  listItemProps,
  LinkComponent,
}) => {
  const theme: Theme = useTheme();

  return (
    <ListItem
      disablePadding={true}
      {...listItemProps}
      sx={{
        width: '100%',
        '& a': {
          width: 'inherit',
        },
      }}
    >
      <LinkComponent href={href || '#'} passHref={true}>
        <ListItemButton
          sx={{
            width: '100%',
            padding: '16px',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: icon ? '24px auto' : 'auto',
            alignItems: 'center',
            '& p': {
              fontWeight: active ? 700 : 600,
              fontSize: '16px',
              '&:hover': {
                fontWeight: 700,
              },
            },
            gap: '8px',
            '&:hover': {
              backgroundColor: 'rgba(229, 231, 235, 1)',
            },
            backgroundColor: active ? 'rgba(229, 231, 235, 1)' : 'inherit',
          }}
        >
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',

                justifyContent: 'center',
              }}
            >
              <svg
                width={17}
                height={17}
                style={{
                  color: active
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                }}
              >
                <use href={`/assets/icons/${icon}.svg#${icon}`} />
              </svg>
            </Box>
          )}
          <ListItemText
            primary={
              <ParagraphText
                component={'p'}
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
