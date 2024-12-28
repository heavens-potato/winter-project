/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        openSans: ['"Open Sans"', 'sans-serif'],
        orelega: ['"Orelega One"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

