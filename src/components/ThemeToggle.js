import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ size = 'medium', showTooltip = true }) => {
  const { toggleTheme, isLight, isDark } = useTheme();

  const toggleButton = (
    <IconButton
      onClick={toggleTheme}
      size={size}
      sx={{
        color: isLight ? '#8B4513' : '#DAA520',
        backgroundColor: isLight ? 'rgba(139, 69, 19, 0.1)' : 'rgba(218, 165, 32, 0.1)',
        border: `1px solid ${isLight ? 'rgba(139, 69, 19, 0.2)' : 'rgba(218, 165, 32, 0.2)'}`,
        borderRadius: '12px',
        padding: size === 'small' ? '6px' : '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: isLight ? 'rgba(139, 69, 19, 0.15)' : 'rgba(218, 165, 32, 0.15)',
          border: `1px solid ${isLight ? 'rgba(139, 69, 19, 0.4)' : 'rgba(218, 165, 32, 0.4)'}`,
          transform: 'scale(1.05)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: size === 'small' ? 20 : 24,
          height: size === 'small' ? 20 : 24,
        }}
      >
        {/* Light Mode Icon */}
        <LightModeIcon
          sx={{
            fontSize: size === 'small' ? 18 : 22,
            position: 'absolute',
            opacity: isLight ? 1 : 0,
            transform: isLight ? 'rotate(0deg) scale(1)' : 'rotate(180deg) scale(0.5)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            color: '#DAA520',
          }}
        />

        {/* Dark Mode Icon */}
        <DarkModeIcon
          sx={{
            fontSize: size === 'small' ? 18 : 22,
            position: 'absolute',
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            color: '#8B4513',
          }}
        />
      </Box>
    </IconButton>
  );

  if (!showTooltip) {
    return toggleButton;
  }

  return (
    <Tooltip
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Theme`}
      placement="bottom"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#FFFFFF',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: '8px',
            padding: '8px 12px',
            backdropFilter: 'blur(10px)',
          },
        },
        arrow: {
          sx: {
            color: 'rgba(0, 0, 0, 0.8)',
          },
        },
      }}
    >
      {toggleButton}
    </Tooltip>
  );
};

export default ThemeToggle;
