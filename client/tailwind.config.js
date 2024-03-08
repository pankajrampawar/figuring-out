/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns : {
        '13' : 'repeat(13, minmax(0, 1fr))'
      },
      colors: {
        surface: "#1F1F1F",
        secondary: '#303030',
        primary: '#67E3AF',
        primary2: '#696969',
        bg1: '#B4EC7C',
        bg2: '#7CECEC',
        bg3: '#E3EC7C',
      }
    },

    keyframes: {
      shimmer: {
        '100%' : {
          transform: 'translateX(100%)'
        }
      }
    }
  },
  plugins: [],
};
