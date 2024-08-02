/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "custom-image": "url('/src/assets/images/Login/credsback.svg')",
      }),
    },
  },
  plugins: [],
};
