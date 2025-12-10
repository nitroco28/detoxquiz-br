/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Paleta Desinflama.ai
        'desinflama': {
          'teal': {
            DEFAULT: '#2C5F5D',
            50: '#E8F0F0',
            100: '#C8DCDB',
            200: '#9BC2C0',
            300: '#6EA8A5',
            400: '#4D8481',
            500: '#2C5F5D',
            600: '#254F4D',
            700: '#1E3F3D',
            800: '#172F2E',
            900: '#0F1F1E',
          },
          'sage': {
            DEFAULT: '#8FA39A',
            50: '#F4F6F5',
            100: '#E5EBE8',
            200: '#CDD8D3',
            300: '#B4C5BD',
            400: '#9CB4A8',
            500: '#8FA39A',
            600: '#738B82',
            700: '#5A6D66',
            800: '#42504A',
            900: '#2A332F',
          },
          'terracotta': {
            DEFAULT: '#C17F68',
            50: '#F9F1EE',
            100: '#F0DFD7',
            200: '#E4C5B6',
            300: '#D7AA94',
            400: '#CB9573',
            500: '#C17F68',
            600: '#A86A56',
            700: '#865544',
            800: '#644032',
            900: '#422B21',
          },
          'gold': {
            DEFAULT: '#B8955A',
            50: '#F7F3E8',
            100: '#EDE3CA',
            200: '#DCC89D',
            300: '#CBAD70',
            400: '#C1A164',
            500: '#B8955A',
            600: '#9A7D4B',
            700: '#7C643C',
            800: '#5D4B2D',
            900: '#3E321E',
          },
          'cream': {
            DEFAULT: '#EDE8E1',
            50: '#FFFFFF',
            100: '#F9F7F4',
            200: '#EDE8E1',
            300: '#DED5C9',
            400: '#CFC2B1',
            500: '#C0AF99',
            600: '#A89477',
            700: '#8B7860',
            800: '#665948',
            900: '#413A30',
          },
        }
      },
    },
  },
  plugins: [],
}

