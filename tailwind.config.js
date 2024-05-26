/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        base: '48px', // Set a larger base font size
      },
      lineHeight: {
        base: '1.6', // Set a custom base line height
      },
    },
  },
  plugins: [],
}

