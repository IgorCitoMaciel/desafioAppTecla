export const colors = {
  primary: {
    main: '#1a237e',
    light: '#534bae',
    dark: '#000051',
  },
  secondary: {
    main: '#0288d1',
    light: '#5eb8ff',
    dark: '#005b9f',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#121212',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9E9E9E',
    light: '#FFFFFF',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
  },
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
  },
} as const;

export type ColorKeys = keyof typeof colors;
export type SubColorKeys<T extends ColorKeys> = keyof (typeof colors)[T];
