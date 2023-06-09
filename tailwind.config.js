/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "simple-black": "#0c0c0c",
        "simple-black-2": "#171717",
        "simple-blue": "#0a2725",
        "orange-link": "#ff9a00",
        "regal-blue": "#243c5a",
      },
      fontFamily: {
        spotify: [
          "spotify-circular",
          "spotify-circular-cyrillic",
          "spotify-circular-arabic",
          "spotify-circular-hebrew",
          "Helvetica Neue",
          "helvetica",
          "arial",
          "Hiragino Kaku Gothic Pro",
          "Meiryo",
          "MS Gothic",
        ],
      },
    },
  },
};
