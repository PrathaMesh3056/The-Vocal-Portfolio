/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // --- ADD THIS BLOCK ---
  safelist: [
    'bg-slate-900',
  ],
  // ---------------------
  theme: {
    extend: {},
  },
  plugins: [],
}