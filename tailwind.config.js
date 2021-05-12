const colors = require("@material-ui/core/colors")


module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', 'src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        brand:{
          light:colors.orange[400],
          dark:colors.orange[900]
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
