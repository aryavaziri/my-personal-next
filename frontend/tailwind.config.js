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
      sm: "599px",
      md: "899px",
      lg: "1200px",
    },
    extend: {
      boxShadow: {
        'center': '0 0px 0px -5px rgba(250, 250, 250, 0.3)',
        'arya': '0 0 10px -5px',
      },
      colors: {
        arya1: "#caf0f8",
        arya2: "#cag0b8",
        arya3: "#cbf4f8",
        danger: "#FF6969",
        secondaryLight: "#56a020",
        secondaryDark: "#99ee88",
        arya6: "#f1f2f2",
        aryaBorder1: "#033a60",
        aryaBorder2: "#2f547e",
        aryaBorder3: "#466a94",
        aryaBorder4: "#809ec0",
        gradientDark: "#5390D9",
        gradientLight: "#023e8a",
        dark: "#033a60",
        light: "#ADD8E6",
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
