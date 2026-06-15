// src/config/design-system.ts
export const designSystem = {
  colors: {
    primary: {
      DEFAULT: '#4F19A4',
      50: '#F5F3FA',
      100: '#EAE5F5',
      200: '#D2C4E7',
      300: '#B8A0D9',
      400: '#9B7BC9',
      500: '#784FBA',
      600: '#4F19A4',
      700: '#3F1483',
      800: '#2D0E5E',
      900: '#1C093B',
      950: '#110524',
    },
    white: '#FFFFFF',
    black: '#0A0A0A',
  },
  
  typography: {
    fonts: {
      heading: 'Inter',
      body: 'Open Sans',
    },
    sizes: {
      display: {
        1: 'clamp(3.5rem, 8vw, 6rem)',
        2: 'clamp(2.5rem, 6vw, 4.5rem)',
      },
      heading: {
        1: 'clamp(2rem, 4vw, 3.5rem)',
        2: 'clamp(1.5rem, 3vw, 2.5rem)',
        3: 'clamp(1.25rem, 2vw, 2rem)',
      },
      body: {
        lg: '1.125rem',
        DEFAULT: '1rem',
        sm: '0.875rem',
      },
    },
  },
  
  spacing: {
    section: {
      sm: '4rem',
      DEFAULT: '6rem',
      lg: '8rem',
    },
  },
} as const;