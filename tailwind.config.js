/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AA60C8",   // For text and headers
        secondary: "#D69ADE", // Outer background gradient start
        tertiary: "#EABDE6",  // Containers/inputs background
        accent: "#FFDFEF",    // Buttons and completed tasks background
      },
    },
  },
  plugins: [],
}