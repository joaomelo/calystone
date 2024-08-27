/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./display/**/*.vue",
    "./lib/**/*.vue",
    "./main/**/*.vue",
    "./main/index.html",
  ],
  plugins: [require("tailwindcss-primeui")],
  theme: {
    extend: {},
  }
};