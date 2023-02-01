/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Vollkorn", ...defaultTheme.fontFamily.sans],
      serif: ["Vollkorn", ...defaultTheme.fontFamily.serif],
      mono: ["Fira Mono", ...defaultTheme.fontFamily.mono],
    },
    extend: {
      colors: {
        "rwb-background-dark": "#101315",
        "rwb-text-dark": "#e8e6e3",
        "rwb-link-light": "#3366cc",
        "rwb-link-dark": "#689fd9",
        "rwb-button-background-dark": "#254a93",
        "rwb-slate-light": "#ebedef",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
