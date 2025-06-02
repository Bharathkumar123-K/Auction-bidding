import React from 'react';
import { Box, Chip } from '@mui/material';
import { SimpleText } from './SimpleComponents';
import { useTheme } from '../../contexts/ThemeContext';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const EnhancedFilters = ({
  filter,
  setFilter,
  favoritesCount = 0,
  isAdmin = false
}) => {
  const { isDark } = useTheme();
  const filters = [
    {
      key: 'all',
      label: 'All Items',
      icon: AllInclusiveIcon,
      color: '#667eea'
    },
    {
      key: 'ending-soon',
      label: 'Ending Soon',
      icon: AccessTimeIcon,
      color: '#ff6b35'
    },
    ...(isAdmin ? [] : [{
      key: 'favorites',
      label: `Favorites ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`,
      icon: FavoriteIcon,
      color: '#e91e63'
    }])
  ];

  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap',
      alignItems: 'center',
      mb: 4,
      p: 3,
      background: 'var(--bg-card)',
      borderRadius: 8,
      boxShadow: '0 2px 4px var(--shadow-color)',
      border: '1px solid var(--border-color)',
      transition: 'all 0.3s ease'
    }}>
      <SimpleText sx={{
        mr: 2,
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Filter:
      </SimpleText>

      {filters.map(({ key, label, icon: Icon, color }) => (
        <Chip
          key={key}
          label={label}
          icon={<Icon sx={{ fontSize: 18 }} />}
          onClick={() => setFilter(key)}
          className={`enhanced-chip ${filter === key ? 'active' : ''}`}
          sx={{
            background: filter === key
              ? 'var(--accent-color)'
              : 'var(--bg-primary)',
            color: filter === key ? 'white' : 'var(--text-primary)',
            border: `1px solid ${filter === key ? 'var(--accent-color)' : 'var(--border-color)'}`,
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              background: filter === key
                ? 'var(--accent-color)'
                : 'var(--bg-secondary)',
              transform: 'translateY(-1px)',
              boxShadow: '0 2px 8px var(--shadow-color)',
            }
          }}
        />
      ))}
    </Box>
  );
};

export default EnhancedFilters;
