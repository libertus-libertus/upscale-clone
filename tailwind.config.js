/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./index.html",
    ],
    theme: {
      extend: {
        colors: {
            'bg-secondary': '#F1F5F7',
          // Di sini Anda akan menambahkan warna kustom Anda
        },
      },
    },
    plugins: [],
  }