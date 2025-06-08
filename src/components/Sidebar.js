import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = ({
  activePage,
  onChangePage,
  open,
  onClose,
  variant,
  collapsed,
  onCollapseToggle,
  drawerWidthExpanded,
  drawerWidthCollapsed,
}) => {
  const theme = useTheme();
  const isDesktop = variant === 'permanent';

  const width = isDesktop ? (collapsed ? drawerWidthCollapsed : drawerWidthExpanded) : drawerWidthExpanded;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'products', label: 'Products', icon: <Inventory2Icon /> },
  ];

  return (
    <>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width,
            bgcolor: '#2c2f33',
            pt: 2,
            borderRight: 'none',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            position: 'fixed',
            height: 'calc(100vh - 64px)',
            top: '64px',
            zIndex: variant === 'temporary' ? theme.zIndex.drawer + 1 : 'auto',
          },
          flexShrink: 0,
        }}
      >
        <Box sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-end', mb: 1 }}>
          {isDesktop && (
            <IconButton
              onClick={onCollapseToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              size="small"
              sx={{ color: '#fff' }}
            >
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          )}
        </Box>
        <Divider />
        <List sx={{ px: collapsed ? 0 : 2, mt: 1 }}>
          {menuItems.map(({ id, label, icon }) => (
            <Tooltip key={id} title={collapsed ? label : ''} placement="right" arrow>
              <ListItemButton
                selected={activePage === id}
                onClick={() => {
                  onChangePage(id);
                  if (variant === 'temporary') onClose();
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  px: collapsed ? 1 : 2,
                  justifyContent: collapsed ? 'center' : 'initial',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    justifyContent: 'center',
                    color: activePage === id ? '#1a883f' : '#fff',
                  }}
                >
                  {icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={label}
                    sx={{
                      color: activePage === id ? '#1a883f' : '#fff',
                      whiteSpace: 'nowrap',
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      {isDesktop && <Box sx={{ width, flexShrink: 0 }} aria-hidden="true" />}
    </>
  );
};

export default Sidebar;
