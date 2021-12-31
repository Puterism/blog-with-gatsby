const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      gray: colors.gray,
      white: colors.white,
      primary: '#222222',
      secondary: '#f8ea32',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
