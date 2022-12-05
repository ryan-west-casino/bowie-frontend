/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    mytheme: {
        "primary": "#FBBD23",
        "secondary": "#374151",
        "accent": "#1FB2A6",
        "neutral": "#191D24",
        "base-100": "#2A303C",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
    },
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
      themes: ["dark", "corporate", "synthwave", "aqua", "black", "luxury", "dracula", "business", "coffee"],
},
};
