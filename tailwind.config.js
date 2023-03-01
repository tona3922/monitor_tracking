/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,jsx}",
    './src/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors:{
      "white-primary": "#fcfcfc"
    },
    extend: {
      
    },
  },
  plugins: [
    // require('tailwindcss'),
    // require('precss'),
    // require('autoprefixer')
  ],
  // important: true,
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}