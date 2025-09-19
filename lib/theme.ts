export interface ThemeColors {
  // Background Colors
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    overlay: string;
  };

  // Text Colors
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
  };

  // Border Colors
  border: {
    primary: string;
    secondary: string;
    focus: string;
    hover: string;
  };

  // Brand Colors - Professional Medical
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
  };

  // Status Colors - Clinical
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
    neutral: string;
  };

  // Risk Colors - Medical Grade
  risk: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };

  // Interactive Elements
  interactive: {
    primary: string;
    secondary: string;
    hover: string;
    active: string;
    disabled: string;
  };
}

// Professional Dark Theme - Inspired by medical equipment and clinical software
export const darkTheme: ThemeColors = {
  background: {
    primary: '#0B0F14',      // Deep navy - professional, medical-grade
    secondary: '#151B23',     // Charcoal blue - sophisticated
    tertiary: '#1E252E',      // Slate - card backgrounds
    elevated: '#252D38',      // Elevated surfaces
    overlay: 'rgba(0, 0, 0, 0.8)', // Modal overlays
  },

  text: {
    primary: '#F8FAFC',       // Pure white - maximum readability
    secondary: '#CBD5E1',     // Light gray - secondary text
    tertiary: '#94A3B8',      // Medium gray - tertiary info
    inverse: '#0B0F14',       // Inverse for light backgrounds
    disabled: '#64748B',      // Disabled state
  },

  border: {
    primary: '#334155',       // Professional border
    secondary: '#475569',     // Secondary borders
    focus: '#2563EB',         // Focus states - medical blue
    hover: '#3B82F6',         // Hover states
  },

  brand: {
    primary: '#2563EB',       // Medical blue - trustworthy, professional
    secondary: '#1E40AF',     // Deeper blue - secondary actions
    accent: '#3B82F6',        // Bright blue - highlights
    muted: '#1E3A8A',         // Muted blue - backgrounds
  },

  status: {
    success: '#059669',       // Medical green - success states
    warning: '#D97706',       // Amber - warnings
    error: '#DC2626',         // Medical red - errors
    info: '#0284C7',          // Info blue
    neutral: '#6B7280',       // Neutral gray
  },

  risk: {
    low: '#059669',           // Green - safe
    medium: '#D97706',        // Amber - caution
    high: '#DC2626',          // Red - danger
    critical: '#991B1B',      // Dark red - critical
  },

  interactive: {
    primary: '#2563EB',       // Primary buttons
    secondary: '#475569',     // Secondary buttons
    hover: '#3B82F6',         // Hover state
    active: '#1D4ED8',        // Active state
    disabled: '#374151',      // Disabled state
  },
};

// Professional Light Theme - Clinical white with medical accents
export const lightTheme: ThemeColors = {
  background: {
    primary: '#FFFFFF',       // Pure white - clinical
    secondary: '#F8FAFC',     // Off-white - subtle backgrounds
    tertiary: '#F1F5F9',      // Light gray - cards
    elevated: '#E2E8F0',      // Elevated surfaces
    overlay: 'rgba(15, 23, 42, 0.8)', // Dark overlay for modals
  },

  text: {
    primary: '#0F172A',       // Near black - maximum readability
    secondary: '#334155',     // Dark gray - secondary text
    tertiary: '#64748B',      // Medium gray - tertiary info
    inverse: '#F8FAFC',       // Inverse for dark backgrounds
    disabled: '#94A3B8',      // Disabled state
  },

  border: {
    primary: '#CBD5E1',       // Light professional border
    secondary: '#94A3B8',     // Secondary borders
    focus: '#2563EB',         // Focus states - consistent blue
    hover: '#3B82F6',         // Hover states
  },

  brand: {
    primary: '#2563EB',       // Same medical blue - consistency
    secondary: '#1E40AF',     // Deeper blue
    accent: '#3B82F6',        // Bright blue
    muted: '#EFF6FF',         // Light blue backgrounds
  },

  status: {
    success: '#059669',       // Consistent green
    warning: '#D97706',       // Consistent amber
    error: '#DC2626',         // Consistent red
    info: '#0284C7',          // Info blue
    neutral: '#6B7280',       // Neutral gray
  },

  risk: {
    low: '#059669',           // Consistent risk colors
    medium: '#D97706',
    high: '#DC2626',
    critical: '#991B1B',
  },

  interactive: {
    primary: '#2563EB',       // Primary buttons
    secondary: '#E2E8F0',     // Light secondary buttons
    hover: '#3B82F6',         // Hover state
    active: '#1D4ED8',        // Active state
    disabled: '#F1F5F9',      // Disabled state
  },
};

export type ThemeName = 'light' | 'dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

// Legacy theme object for backward compatibility
export const theme = {
  colors: {
    // HOPE brand palette - Updated to professional colors
    background: darkTheme.background.primary,
    surface: darkTheme.background.tertiary,
    surfaceHover: darkTheme.background.elevated,
    surfaceBorder: darkTheme.border.primary,

    // Primary colors
    primary: darkTheme.brand.primary,
    primaryHover: darkTheme.brand.accent,

    // Status colors
    success: darkTheme.status.success,
    warning: darkTheme.status.warning,
    danger: darkTheme.status.error,

    // Text colors
    textPrimary: darkTheme.text.primary,
    textSecondary: darkTheme.text.secondary,
    textTertiary: darkTheme.text.tertiary,

    // Chart colors - Professional medical palette
    chart: {
      primary: darkTheme.brand.primary,
      secondary: darkTheme.status.info,
      tertiary: darkTheme.status.success,
      quaternary: darkTheme.status.warning,
      grid: darkTheme.border.primary
    }
  },

  // Risk score colors
  risk: {
    low: darkTheme.risk.low,
    medium: darkTheme.risk.medium,
    high: darkTheme.risk.high
  },

  // Spacing scale
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  }
} as const;

export type Theme = typeof theme;