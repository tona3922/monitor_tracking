/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/components/**/*.{js,jsx}",
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{js,jsx}",
    './src/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('tailwindcss'),
    // require('precss'),
    // require('autoprefixer')
  ],
  important: true,
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}