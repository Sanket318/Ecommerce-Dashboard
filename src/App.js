import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Container, useTheme, useMediaQuery } from '@mui/material';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ProductManagement from './components/Products/ProductManagement';

const DRAWER_WIDTH_EXPANDED = 280;
const DRAWER_WIDTH_COLLAPSED = 72;

const App = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile); 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  const [activePage, setActivePage] = useState('dashboard');
  
  useEffect(() => {
    setSidebarOpen(!isMobile);
    setSidebarCollapsed(false);
  }, [isMobile]);

  const toggleSidebarCollapse = () => {
    if (!isMobile) setSidebarCollapsed((prev) => !prev);
  };

  const openSidebarMobile = () => {
    if (isMobile) setSidebarOpen(true);
  };
  const closeSidebarMobile = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Topbar onMobileMenuClick={openSidebarMobile} isMobile={isMobile} />
      <Box sx={{ display: 'flex', pt: '64px'}}>
        <Sidebar
          activePage={activePage}
          onChangePage={(page) => {
            setActivePage(page);
            if (isMobile) closeSidebarMobile(); 
          }}
          open={sidebarOpen}
          onClose={closeSidebarMobile}
          variant={isMobile ? 'temporary' : 'permanent'}
          collapsed={sidebarCollapsed}
          onCollapseToggle={toggleSidebarCollapse}
          drawerWidthExpanded={DRAWER_WIDTH_EXPANDED}
          drawerWidthCollapsed={DRAWER_WIDTH_COLLAPSED}
        />
        <Container
          maxWidth="lg"
          sx={{
            mt: 3,
            mb: 6,
            flexGrow: 1,
            minHeight: 'calc(100vh - 96px)',
            ml: !isMobile
              ? sidebarCollapsed
                ? `${DRAWER_WIDTH_COLLAPSED}px`
                : `${DRAWER_WIDTH_EXPANDED}px`
              : 0,
            transition: 'margin-left 0.3s ease',
          }}
        >
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'products' && <ProductManagement />}
        </Container>
      </Box>
    </>
  );
};

export default App;
