/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Cairo", "sans-serif"],
        accent: ["Heebo", "sans-serif"],
        audiowide: ["Audiowide", "cursive"],
      },
      fontSize: {
        adaptive: "clamp(1rem, .9rem + .2vw, 1.2rem)",
      },
      colors: {
        accent: "hsl(220, 30%, 60%)",
        neutral: "hsl(220, 10%, 30%)",
      },
      transitionTimingFunction: {
        heart: "cubic-bezier(.2,.6,.4,.9)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        heartbeat: {
          "0%": {
            transform: "scale(0.95)",
          },
          "5%": {
            transform: "scale(1.1)",
          },
          "40%": {
            transform: "scale(0.85)",
          },
          "45%": {
            transform: "scale(1)",
          },
          "60%": {
            transform: "scale(0.95)",
          },
          "100%": {
            transform: "scale(0.9)",
          },
        },
      },
    },
  },
  plugins: [],
};
