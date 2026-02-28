/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-blue": "#111827",
        "crisp-white": "#FFFFFF",
        "pastel-green": "#01C16A",
      },
    },
  },
  plugins: [],
};
