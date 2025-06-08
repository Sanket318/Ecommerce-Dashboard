import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Topbar = ({ onMobileMenuClick, isMobile }) => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={1}
      sx={{
        backgroundColor: '#2c2f33',
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1, 
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%' }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open sidebar"
            onClick={onMobileMenuClick}
            sx={{ mr: 2 }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h4"
          letterSpacing={-0.5}
          fontWeight={800}
          sx={{ flexGrow: 1, userSelect: 'none' }}
        >
          E-Commerce Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
