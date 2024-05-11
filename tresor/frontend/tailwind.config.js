import daisyui from 'daisyui';
import daisyUIThemes from 'daisyui/src/theming/themes';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],

  daisyui:{
    themes: [
      "purple",
      {
        purple:{
          ...daisyUIThemes["retro"],
          primary: "rgb(90, 72, 163)",
          secondary: "rgb(229, 119, 61)",
          accent: "rgb(236, 227,202)",
        }
      }
    ]
  }
}