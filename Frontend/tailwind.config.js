import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cream-base": "#F5F1E6",
        "maroon-primary": "#7B011E",
        "maroon-hover": "#9B0D2A",
        "text-dark": "#2A1A1D",
        "pure-white": "#FFFFFF",
      },
    },
  },
  plugins: [daisyui],
};
