/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        "tg-sans": "var(--tgui--font-family)",
      },
      colors: {
        "tg-subtitle": "var(--subtitle-text-color)",
        "tg-accent": "var(--accent-text-color)",
        "tg-destructive": "var(--destructive-text-color)",
      },
    },
  },
  plugins: [],
};
