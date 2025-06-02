import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Container,
  alpha,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import GavelIcon from '@mui/icons-material/Gavel';

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMobileMenuClose();
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  if (loading) {
    // Don't render Navbar until auth state is known
    return null;
  }

  const menuItems = user ? [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    ...(user.user_type !== 'admin' ? [{ text: 'Create Item', icon: <AddCircleOutlineIcon />, path: '/create-item' }] : []),
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
  ] : [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Register', icon: <PersonAddIcon />, path: '/register/user' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E9ECEF',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        minHeight: '70px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '64px !important', py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to={user ? "/home" : "/"}
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              fontFamily: '"Inter", sans-serif',
              fontSize: { xs: '1rem', sm: '1.1rem' },
              fontWeight: 800,
              letterSpacing: '0.5px',
              position: 'relative',
              '&:hover': {
                transform: 'scale(1.02)',
                transition: 'transform 0.2s ease',
              },
            }}
          >
            {/* Simple Auction Icon */}
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                backgroundColor: '#DAA520',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <GavelIcon sx={{
                fontSize: 20,
                color: '#FFFFFF',
              }} />
            </Box>

            {/* Brand Text */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                sx={{
                  color: '#495057',
                  fontSize: { xs: '1.2rem', sm: '1.3rem' },
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  fontFamily: '"Inter", sans-serif',
                }}
              >
                Auction House
              </Typography>
            </Box>
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    mx: 0.5,
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    color: '#6C757D',
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    minHeight: '40px',
                    textTransform: 'none',
                    background: isActive(item.path)
                      ? 'rgba(0, 123, 255, 0.1)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 123, 255, 0.08)',
                      color: '#007BFF',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.text}
                </Button>
              ))}

              {/* Theme Toggle */}
              <Box sx={{ mx: 1 }}>
                <ThemeToggle size="medium" />
              </Box>

              {user && (
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    ml: 2,
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    minHeight: '40px',
                    backgroundColor: '#DC3545',
                    color: '#FFFFFF',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#C82333',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Logout
                </Button>
              )}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuToggle}
              sx={{
                color: '#6C757D',
                width: 40,
                height: 40,
                borderRadius: 2,
                border: '1px solid #E9ECEF',
                '&:hover': {
                  backgroundColor: 'rgba(0, 123, 255, 0.08)',
                  color: '#007BFF',
                  border: '1px solid rgba(0, 123, 255, 0.2)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(40, 35, 30, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            borderLeft: '2px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.1)',
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="antique-mobile" patternUnits="userSpaceOnUse" width="15" height="15"><circle cx="7.5" cy="7.5" r="0.5" fill="%23D4AF37" opacity="0.08"/></pattern></defs><rect width="100" height="100" fill="url(%23antique-mobile)"/></svg>')`,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#D4AF37',
              fontFamily: '"Playfair Display", serif',
              letterSpacing: '1px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <GavelIcon sx={{ mr: 1, color: '#D4AF37' }} />
            Antique Auctions
          </Typography>
        </Box>
        <Divider sx={{ borderColor: 'rgba(193, 154, 107, 0.3)' }} />
        <List sx={{ p: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.path}
              onClick={handleMobileMenuClose}
              selected={isActive(item.path)}
              sx={{
                mb: 1,
                borderRadius: 1,
                backgroundColor: isActive(item.path)
                  ? 'rgba(193, 154, 107, 0.2)'
                  : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(193, 154, 107, 0.1)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(193, 154, 107, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(193, 154, 107, 0.3)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{
                color: isActive(item.path) ? '#D4AF37' : '#C19A6B',
                minWidth: '40px',
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: {
                    color: '#E8DFD0',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.1rem',
                    letterSpacing: '0.5px',
                  }
                }}
              />
            </ListItem>
          ))}

          {/* Theme Toggle in Mobile Menu */}
          <Divider sx={{
            my: 2,
            borderColor: 'rgba(193, 154, 107, 0.3)'
          }} />
          <ListItem sx={{ justifyContent: 'center', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                sx={{
                  color: '#E8DFD0',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1rem',
                  letterSpacing: '0.5px',
                }}
              >
                Theme
              </Typography>
              <ThemeToggle size="small" showTooltip={false} />
            </Box>
          </ListItem>

          {user && (
            <>
              <Divider sx={{
                my: 2,
                borderColor: 'rgba(193, 154, 107, 0.3)'
              }} />
              <ListItem
                button
                onClick={handleLogout}
                sx={{
                  borderRadius: 1,
                  border: '1px solid rgba(193, 154, 107, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(193, 154, 107, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{
                  color: '#C19A6B',
                  minWidth: '40px',
                }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    sx: {
                      color: '#E8DFD0',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1.1rem',
                      letterSpacing: '0.5px',
                    }
                  }}
                />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;