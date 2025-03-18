/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the `pages` directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the `components` directory
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the `app` directory (if using App Router)
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Include all files in the `src` directory (if using a `src` folder)
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    // Add other dynamic classes here
    { pattern: /bg-(red|blue|green)-(500|600|700)/ }, // Safelist all bg-{color}-{shade} classes
    { pattern: /text-(red|blue|green)-(500|600|700)/ }, // Safelist all text-{color}-{shade} classes
  ],
  theme: {
    extend: {
      // Add custom theme extensions here if needed
    },
  },
  plugins: [
    // Add Tailwind plugins here if needed
  ],
};