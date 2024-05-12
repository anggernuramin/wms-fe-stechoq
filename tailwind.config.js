/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        // custom color
        primary: '#F0F1F3',
        secondary: '#FFF',
        btnPrimary: '#7367F0',
        TxtPrimary: {
          700: '#383E49'
        }
      }
    }
  },
  plugins: [require('flowbite/plugin'), daisyui]
}
