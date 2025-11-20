/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indigo-500': '#6366f1',
        'sky-500': '#0ea5e9',
        'emerald-400': '#34d399',
      },
    },
  },
  plugins: [],
}
