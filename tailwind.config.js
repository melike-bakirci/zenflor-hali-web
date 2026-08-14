/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#66101F',
          hover: '#561621',
          light: '#855A5C',
          dark: '#3A0912',
        },
        secondary: {
          DEFAULT: '#D3D3D3',
          light: '#F3F4F6',
          dark: '#9CA3AF',
        },
        accent: {
          DEFAULT: '#855A5C',
          hover: '#9c6f71',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
};
