/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "rwb-text-dark": "#e8e6e3",
        "rwb-link-light": "#3366cc",
        "rwb-link-dark": "#689fd9",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
