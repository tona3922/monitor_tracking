/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/components/**/*.{js,jsx}",
    // "./src/pages/**/*.{js,jsx}",
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
}