import React from 'react';
import { Box, Container } from '@mui/material';
import { backgroundImages, antiqueBackgroundStyles } from '../../theme/antiqueTheme';

// Unified layout component for consistent page structure
const UnifiedLayout = ({ 
  children, 
  backgroundType = 'main',
  maxWidth = 'lg',
  showOverlay = true,
  customBackground = null 
}) => {
  const backgroundImage = customBackground || backgroundImages[backgroundType] || backgroundImages.main;

  return (
    <Box
      sx={{
        ...antiqueBackgroundStyles,
        backgroundImage: `url(${backgroundImage})`,
        position: 'relative',
        '&::before': showOverlay ? {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        } : {},
      }}
    >
      <Container 
        maxWidth={maxWidth}
        sx={{ 
          position: 'relative', 
          zIndex: 2,
          py: 4,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

// Unified section component for consistent spacing
export const UnifiedSection = ({ 
  children, 
  spacing = 4, 
  centerContent = false,
  fullHeight = false 
}) => {
  return (
    <Box
      sx={{
        py: spacing,
        ...(centerContent && {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }),
        ...(fullHeight && {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }),
      }}
    >
      {children}
    </Box>
  );
};

// Unified card grid for consistent item display
export const UnifiedCardGrid = ({ 
  children, 
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  spacing = 3 
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columns.xs}, 1fr)`,
          sm: `repeat(${columns.sm}, 1fr)`,
          md: `repeat(${columns.md}, 1fr)`,
          lg: `repeat(${columns.lg}, 1fr)`,
        },
        gap: spacing,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

// Unified hero section
export const UnifiedHero = ({ 
  title, 
  subtitle, 
  actions, 
  centerContent = true 
}) => {
  return (
    <UnifiedSection centerContent={centerContent} spacing={6}>
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {title}
        {subtitle && (
          <Box sx={{ mt: 2, mb: 4 }}>
            {subtitle}
          </Box>
        )}
        {actions && (
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            justifyContent: centerContent ? 'center' : 'flex-start',
            flexWrap: 'wrap' 
          }}>
            {actions}
          </Box>
        )}
      </Box>
    </UnifiedSection>
  );
};

// Unified content wrapper
export const UnifiedContent = ({ children, spacing = 4 }) => {
  return (
    <Box sx={{ flex: 1, py: spacing }}>
      {children}
    </Box>
  );
};

export default UnifiedLayout;
