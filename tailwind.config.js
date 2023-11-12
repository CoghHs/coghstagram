module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slider: {
          "0%": {
            transform: "translateX(0px)",
          },
          "50%": {
            transform: "translateX(-700px)",
          },
          "100%": {
            transform: "translateX(-1400px)",
          },
        },
      },
      animation: {
        slider: "slider 100s linear infinite",
      },
    },
  },
  plugins: [],
};
