'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  MenuItem,
  Menu,
  Badge,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = () => {
    router.push('/notification');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    handleMenuClose();
    router.replace('/');
  };

  return (
    <>
      <AppBar
        position={isMobile ? 'fixed' : 'sticky'}
        sx={{
          backgroundColor: '#062144',
          top: 0,
          borderRadius: { xs: 0, sm: '8px' },
           boxShadow: {
           xs: 'none',     
           sm: 3,           
        },
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: { xs: 16, sm: 20 } }}>
            Nxt Js Base
          </Typography>

          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={4} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ ml: 1 }} onClick={handleAvatarClick}>
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>

          {/* Hide name and role on mobile */}
          {!isMobile && (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              <Typography variant="body1" sx={{ color: '#FFFFFF' }}>
                Vignesh S
              </Typography>
              <Typography variant="body2" sx={{ color: '#007FFF' }}>
                Front-End Developer
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 22,
              width: 10,
              height: 10,
              bgcolor: '#FFFFFF',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
