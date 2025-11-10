export const colors = {
  white: {
    primary: 'var(--primary-white-color)',
    secondary: 'var(--secondary-white-color)',
  },
  black: {
    primary: 'var(--primary-black-color)',
    secondary: 'var(--secondary-black-color)',
    tertiary: 'var(--tertiary-black-color)',
  },
  gray: {
    primary: 'var(--primary-gray-color)',
    secondary: 'var(--secondary-gray-color)',
    border: {
      primary: 'var(--primary-gray-border)',
      secondary: 'var(--secondary-gray-border)',
    },
  },
  green: {
    primary: 'var(--primary-green-color)',
    secondary: 'var(--secondary-green-color)',
  },
  red: {
    primary: 'var(--primary-red-color)',
    secondary: 'var(--secondary-red-color)',
  },
  orange: {
    primary: 'var(--primary-orange-color)',
  },
  blue: {
    primary: 'var(--primary-blue-color)',
    secondary: 'var(--secondary-blue-color)',
    tertiary: 'var(--tertiary-blue-color)',
  },
  yellow: {
    primary: 'var(--primary-yellow-color)',
  },
} as const

export type ColorPalette = typeof colors
