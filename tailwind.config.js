/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         base: "#0F172A", // Dark Navy Background
         card: "#1E293B", // Lighter Navy for cards
         primary: "#8B5CF6", // Violet
         secondary: "#EC4899", // Pink
      }
    },
  },
  plugins: [],
}