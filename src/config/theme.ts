export const theme = {
  colors: {
    primary: '#3eabfa',    // Light blue - Used for primary actions and highlights
    secondary: '#3552e1',  // Deep blue - Used for secondary actions and accents
    accent: '#1d3459',     // Navy blue - Used for text and important elements
    background: '#f2f5f8', // Light gray - Used for backgrounds and subtle elements
  },
  gradients: {
    primary: 'from-[#3eabfa] to-[#3552e1]',
    hover: 'from-[#3552e1] to-[#1d3459]',
  }
} as const;

export type ThemeColors = keyof typeof theme.colors;
export type ThemeGradients = keyof typeof theme.gradients;
