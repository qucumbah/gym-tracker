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
        adaptive: "clamp(1rem, .9rem + .2vw, 1.2rem)"
      }
    },
  },
  plugins: [],
};
