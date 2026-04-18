/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",     // Indigo
        secondary: "#06B6D4",   // Cyan
        accent: "#9333EA",      // Purple

        bg: "#FFFFFF",
        surface: "#F8FAFC",
        border: "#E5E7EB",

        text: "#0F172A",
        textLight: "#475569",
        muted: "#94A3B8",
      },
    },
  },
  plugins: [],
}