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
        'explosion': "url('../../assets/Explosion.png')",
        'half': "url('../../assets/HalfandHalf.png')"
      },
      colors: {

      }
    }
  },
  plugins: [],
};
