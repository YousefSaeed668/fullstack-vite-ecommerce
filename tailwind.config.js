/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1C1C1C",
        // "grey-600": "#505050",
        "grey-600": "#505050c7",
        "grey-500": "#8B96A5",
        "grey-400": "#BDC4CD",
        "grey-300": "#DEE2E7",
        "grey-200": "#EFF2F4",
        "grey-100": "#F7FAFC",
        "base-color-blue-100": "#E3F0FF",
        primary: "#0D6EFD",
        pblack: "#070707",
        "light-green": "#C3FFCB",
        green: "#00B517",
        "light-yellow": "#FFE5BF",
        orange: "#FF9017",
        red: "#FA3434",
      },
      screens: {
        xs: "480px",
      },
      animation: {
        "spin-slow": "spin 1.5s linear infinite",

        loading: "loading 2s infinite",
      },
      keyframes: {
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
