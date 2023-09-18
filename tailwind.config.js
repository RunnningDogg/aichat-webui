/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        geek: {
          50: '#f0f5ff',
          100: '#d6e4ff',
          200: '#adc6ff',
          300: '#85a5ff',
          400: '#597ef7',
          500: '#2f54eb',
          600: '#1d39c4',
          700: '#10239e',
          800: '#061178',
          900: '#030852',
        },
        gracepurple: {
          50: '#f9f0ff',
          100: '#efdbff',
          200: '#d3adf7',
          300: '#b37feb',
          400: '#9254de',
          500: '#722ed1',
          600: '#531dab',
          700: '#391085',
          800: '#22075e',
          900: '#120338',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  corePlugins: {
    // preflight: false,
  }
}