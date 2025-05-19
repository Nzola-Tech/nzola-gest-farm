import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    './frontend/src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './frontend/src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
}
