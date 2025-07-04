'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { label: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleNavigate = (path: string) => {
    if (pathname !== path) router.push(path);
  };

  // Mobile Bottom Nav
  if (isMobile) {
    const activeIndex = menuItems.findIndex((item) => pathname === item.path);
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          borderTop: '1px solid #ccc',
        }}
      >
        <BottomNavigation
          showLabels
          value={activeIndex}
          onChange={(e, newValue) => handleNavigate(menuItems[newValue].path)}
          sx={{ backgroundColor: '#0A2149', color: 'white'}}
        >
          {menuItems.map((item) => (
            <BottomNavigationAction
              key={item.label}
              // label={item.label}
              icon={item.icon}
              sx={{
                color: pathname === item.path ? '#00bcd4' : 'white',
                '&.Mui-selected': {
                  color: '#00bcd4',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Box>
    );
  }

  // Desktop Sidebar
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          margin: '8px',
          height: '97%',
          borderRadius: '8px',
          backgroundColor: '#0A2149',
          color: 'white',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ px: 1 }}>
        <List>
          {menuItems.map(({ label, icon, path }) => {
            const isActive = pathname === path;
            return (
              <ListItem
                key={label}
                onClick={() => handleNavigate(path)}
                sx={{
                  backgroundColor: isActive ? '#163F73' : 'transparent',
                  borderRadius: '4px',
                  marginY: '4px',
                  cursor: 'pointer',
                }}
              >
                <ListItemIcon sx={{ color: 'white' }}>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
