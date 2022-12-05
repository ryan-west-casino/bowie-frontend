/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in-up": "fadeInUp 400ms ease",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
      themes: ["synthwave", "dark", "corporate", "aqua", "black", "luxury", "dracula", "business", "coffee"],
      darkTheme: "synthwave",
},
};
