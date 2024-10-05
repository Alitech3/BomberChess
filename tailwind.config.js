/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bomb-pattern': "url('../../assets/BomberLogo.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      colors: {

      }
    }
  },
  plugins: [],
};
