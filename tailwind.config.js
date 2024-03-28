/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // custom color
        primary: '#F0F1F3',
        secondary: '#FFF',
        btnPrimary: '#009ed8',
        TxtPrimary: {
          700: '#383E49'
        }
      }
    }
  },
  plugins: []
}
