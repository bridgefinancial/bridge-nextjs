/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "url('/assets/images/gradient.png')",
      },
      colors: {
        'bridge-dark-blue': '#6ba0f1',
        'bridge-light-blue': '#83c4f4',
        'bridge-dark-purple': '#6a5ace',
        'bridge-light-gray': '#f6f6f6',
        'bridge-black': '#212121',
        'bridge-light-purple': '#a395f7',
        'bridge-dark-green': '#5dbf6d',
        'bridge-light-green': '#bce762',
        'bridge-orange': '#fb9f1e',
        'bridge-dark-orange': '#f48421',
        'bridge-gray-border': '#e9e9e9',
      },
      screens: {
        xs: '430px',
      },
    },
  },
  plugins: [],
};
