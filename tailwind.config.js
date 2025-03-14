module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-blue-500',
    'text-red-500',
    // Add other dynamic classes here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};