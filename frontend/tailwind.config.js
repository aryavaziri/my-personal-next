/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "450px",
      md: "899px",
      lg: "1439px",
    },
    extend: {
      colors: {
        arya1: "#caf0f8",
        arya2: "#90e0ef",
        arya3: "#023e8a",
        arya4: "#5390d9",
        dark: "#f1f2f2",
        light: "#caf0f8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionDelay: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
    },
  },
  plugins: [],
};
