/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        truexxii: {
          parchment: "#E8DCC2",
          forest: "#2F4F2F",
          olive: "#5A7C3E",
          earth: "#8B7355",
          cocoa: "#4B3A2F",
          charcoal: "#3A3A3A",
          paperShadow: "#C9BBA4",
        },
      },
      boxShadow: {
        parchment: "8px 10px 0 rgba(201, 187, 164, 0.35)",
        sketch: "4px 6px 0 rgba(58, 58, 58, 0.16)",
      },
    },
  },
  plugins: [],
};
