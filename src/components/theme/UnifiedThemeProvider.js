import React from 'react';
import { Box } from '@mui/material';

const UnifiedThemeProvider = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--primary-gradient)',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: -1,
        }
      }}
    >
      <Box
        className="unified-theme-container"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          padding: '1rem',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default UnifiedThemeProvider;
