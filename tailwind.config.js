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
    },
  },
  plugins: [],
};
