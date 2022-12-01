/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: "#FFF4E8",
          50: "#FFDFB9",
          100: "#FFCA8B",
          200: "#FFB55D",
          300: "#FFA02E",
          400: "#FF8A00",
          500: "#D17100",
          600: "#A25800",
        },
        gray: {
          25: "#FCFCFD",
          50: "#F9FAFB",
          100: "#F2F4F7",
          200: "#E4E7EC",
          300: "#D0D5DD",
          400: "#98A2B3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1D2939",
          900: "#101828",
        },
        teal: {
          25: "#ECF9F6",
          50: "#DEF4EF",
          100: "#CCEEE7",
          200: "#99DCCF",
          300: "#66CBB6",
          400: "#33B99E",
          500: "#00A886",
          600: "#3D866E",
          700: "#2D6755",
        },
      },
      transitionProperty: {
        height: "max-height",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
