/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      screens: {
        'ssm': '320px', // Tạo breakpoint 'sm' với độ rộng tối thiểu là 320px
        '2lg': '1350px', // Tạo breakpoint 'xl' với độ rộng tối thiểu là 1280px
      },
      colors: {
        'fav-icon': '#rgba(0, 0, 0, 0.5)',
        'fav-icon-active': '#ff385c',
        'checkout-bg': 'rgb(221, 221, 221)',
        customColor: 'rgba(0, 0, 0, 0.57)',
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "5px",
        lg: "8px",
        xl: "16px",
      },
      boxShadow: {
        'checkout-shadow': 'rgba(0, 0, 0, 0.12) 0px 6px 16px;',
      }
    },
  },
  plugins: [],
};
