import { TextButtonProps } from '@/components/atoms/buttons/TextButton/TextButton.component';
import ParagraphText from '@/components/atoms/typography/ParagraphText';
import { User } from '@/types/users.types';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface UserProfileMenuProps {
  user?: User;
  isExpanded?: boolean;
  menuOptions: MenuOptionItem[];
}

interface MenuOptionItem extends Partial<TextButtonProps> {
  text?: string;
  onClick?: () => void;
  startIcon?: React.ReactNode;
  sx?: Record<string, any>;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  user,
  isExpanded = false,
  menuOptions,
}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuAnchorEl && !menuAnchorEl.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (menuAnchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAnchorEl]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: isExpanded ? 'initial' : 100,
        height: isExpanded ? 'initial' : '100%',
        padding: isExpanded ? 2 : 0,
        backgroundColor: isExpanded ? 'white' : 'inherit',
        borderRadius: isExpanded ? '8px' : '0',
        '&:hover': {
          backgroundColor: isExpanded
            ? 'inherit'
            : (theme) => theme.palette.action.hover,
        },
      }}
    >
      {isExpanded ? (
        <Box>
          <div
            style={{ display: 'flex', alignItems: 'center', rowGap: '16px' }}
          >
            <Avatar
              sx={{ width: isExpanded ? 48 : 32, height: isExpanded ? 48 : 32 }}
            >
              <PersonIcon />
            </Avatar>
            <div style={{ marginLeft: '16px' }}>
              <ParagraphText>
                <strong>
                  {user?.first_name} {user?.last_name}
                </strong>
              </ParagraphText>
              <ParagraphText>
                {user?.email ? user.email : 'example@gmail.com'}
              </ParagraphText>
            </div>
          </div>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 2,
            }}
          >
            {menuOptions.map((option, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  ...option.sx,
                }}
                onClick={option.onClick}
              >
                {option.startIcon}
                <ParagraphText sx={{ fontSize: '16px', fontWeight: 400 }}>
                  {option.text}
                </ParagraphText>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        <>
          <IconButton
            onClick={openMenu}
            sx={{ display: 'flex', alignItems: 'center', width: 100 }}
          >
            <Avatar
              sx={{ width: isExpanded ? 48 : 32, height: isExpanded ? 48 : 32 }}
            >
              <PersonIcon />
            </Avatar>
            <ArrowDropDown />
          </IconButton>

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={closeMenu}
          >
            <Box sx={{ padding: 2, width: '250px' }}>
              <ParagraphText>
                <strong>
                  {user?.first_name} {user?.last_name}
                </strong>
              </ParagraphText>
              <ParagraphText sx={{ color: '#212529' }}>
                {user?.email ? user?.email : 'example@gmail.com'}
              </ParagraphText>
            </Box>
            {menuOptions.map((option, index) => (
              <MenuItem
                key={index}
                onClick={option.onClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  ...option.sx,
                }}
              >
                {option.startIcon}
                <ParagraphText
                  sx={{ fontSize: '16px', fontWeight: 700, color: '#212529' }}
                >
                  {option.text}
                </ParagraphText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
};

export default UserProfileMenu;
