import React from 'react';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Paper,
  Container,
  Fade,
  Grow,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { antiqueCardStyles, antiqueButtonStyles, antiqueFormStyles, backgroundImages } from '../../theme/antiqueTheme';

// Enhanced Antique Button Component
export const AntiqueButton = styled(Button)(({ variant = 'contained', size = 'medium' }) => {
  const baseStyles = {
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: size === 'large' ? '1.2rem' : size === 'small' ? '1rem' : '1.1rem',
    fontWeight: 600,
    letterSpacing: '0.8px',
    textTransform: 'none',
    borderRadius: 1,
    padding: size === 'large' ? '14px 28px' : size === 'small' ? '8px 16px' : '12px 24px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover::before': {
      left: '100%',
    },
  };

  if (variant === 'primary' || variant === 'contained') {
    return {
      ...baseStyles,
      ...antiqueButtonStyles.primary,
    };
  } else if (variant === 'secondary' || variant === 'outlined') {
    return {
      ...baseStyles,
      ...antiqueButtonStyles.secondary,
    };
  } else if (variant === 'ghost' || variant === 'text') {
    return {
      ...baseStyles,
      ...antiqueButtonStyles.ghost,
    };
  }
  
  return baseStyles;
});

// Enhanced Antique Card Component
export const AntiqueCard = styled(Card)(({ hover = true }) => ({
  ...antiqueCardStyles,
  '&:hover': hover ? antiqueCardStyles['&:hover'] : {},
}));

// Enhanced Antique TextField Component
export const AntiqueTextField = styled(TextField)(() => ({
  ...antiqueFormStyles.textField,
}));

// Antique Typography Components
export const AntiqueTitle = styled(Typography)(({ variant = 'h1' }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: variant === 'h1' ? 700 : 600,
  letterSpacing: variant === 'h1' ? '1.2px' : '1px',
  color: '#FFFFFF',
  textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
  background: variant === 'h2' ? 'linear-gradient(45deg, #F2D77A, #D5B68A)' : 'none',
  WebkitBackgroundClip: variant === 'h2' ? 'text' : 'unset',
  WebkitTextFillColor: variant === 'h2' ? 'transparent' : 'inherit',
  display: variant === 'h2' ? 'inline-block' : 'block',
}));

export const AntiqueText = styled(Typography)(() => ({
  fontFamily: '"Cormorant Garamond", serif',
  fontSize: '1.1rem',
  letterSpacing: '0.5px',
  color: '#F5F2E9',
  fontWeight: 500,
  lineHeight: 1.6,
}));

// Antique Container with Background
export const AntiqueContainer = styled(Box)(({ backgroundType = 'main' }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImages[backgroundType]})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  position: 'relative',
}));

// Antique Paper Component
export const AntiquePaper = styled(Paper)(({ blur = true }) => ({
  background: 'rgba(28, 28, 28, 0.9)',
  backdropFilter: blur ? 'blur(12px)' : 'none',
  border: '1px solid rgba(213, 182, 138, 0.5)',
  borderRadius: 2,
  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  color: '#FFFFFF',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: '1px solid rgba(213, 182, 138, 0.7)',
    boxShadow: '0 15px 50px rgba(0,0,0,0.5)',
  },
}));

// Antique Section Component
export const AntiqueSection = ({ children, backgroundType, animation = 'fade', ...props }) => {
  const AnimationComponent = animation === 'slide' ? Slide : animation === 'grow' ? Grow : Fade;
  
  return (
    <AntiqueContainer backgroundType={backgroundType} {...props}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', py: 5 }}>
        <AnimationComponent in={true} timeout={1000}>
          <Box sx={{ width: '100%' }}>
            {children}
          </Box>
        </AnimationComponent>
      </Container>
    </AntiqueContainer>
  );
};

// Antique Form Container
export const AntiqueForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  padding: 4,
  background: 'rgba(28, 28, 28, 0.9)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(213, 182, 138, 0.5)',
  borderRadius: 2,
  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  '& .MuiTextField-root': {
    marginBottom: 2,
  },
}));

// Antique Loading Component
export const AntiqueLoading = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '200px',
      color: '#F2D77A',
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        border: '3px solid rgba(242, 215, 122, 0.3)',
        borderTop: '3px solid #F2D77A',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    />
  </Box>
);

// Antique Alert/Message Component
export const AntiqueAlert = styled(Box)(({ severity = 'info' }) => {
  const colors = {
    success: { bg: 'rgba(46, 125, 50, 0.15)', color: '#b9f6ca', border: '#4caf50' },
    error: { bg: 'rgba(211, 47, 47, 0.15)', color: '#ff8a80', border: '#f44336' },
    warning: { bg: 'rgba(237, 108, 2, 0.15)', color: '#ffcc02', border: '#ff9800' },
    info: { bg: 'rgba(2, 136, 209, 0.15)', color: '#81d4fa', border: '#2196f3' },
  };

  return {
    padding: 2,
    borderRadius: 1,
    border: `1px solid ${colors[severity].border}`,
    backgroundColor: colors[severity].bg,
    color: colors[severity].color,
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: '1rem',
    letterSpacing: '0.5px',
    backdropFilter: 'blur(4px)',
  };
});

export default {
  AntiqueButton,
  AntiqueCard,
  AntiqueTextField,
  AntiqueTitle,
  AntiqueText,
  AntiqueContainer,
  AntiquePaper,
  AntiqueSection,
  AntiqueForm,
  AntiqueLoading,
  AntiqueAlert,
};
