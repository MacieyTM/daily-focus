export const lightColors = {
  background: '#f5f5f5',
  surface: '#ffffff',
  text: '#111111',
  textSecondary: '#666666',
  textMuted: '#888888',
  border: '#dddddd',

  successBackground: '#ecfdf3',
  successText: '#166534',
  successTextSecondary: '#15803d',

  danger: '#d11a2a',
} as const;

export const darkColors = {
  background: '#111111',
  surface: '#1c1c1e',
  text: '#f5f5f5',
  textSecondary: '#b3b3b3',
  textMuted: '#888888',
  border: '#333333',

  successBackground: '#12351f',
  successText: '#86efac',
  successTextSecondary: '#4ade80',

  danger: '#ff5c6c',
} as const;

export type ThemeColors = typeof lightColors | typeof darkColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
} as const;

export const fontSize = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 36,
} as const;
