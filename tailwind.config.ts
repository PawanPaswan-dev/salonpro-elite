import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F4E5B3",
          dark: "#8C6D0F",
          darker: "#5C480A",
        },
        charcoal: "#0a0a0a",
        ink: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-playfair)", "ui-serif", "Georgia"],
      },
      boxShadow: {
        gold: "0 0 30px rgba(212, 175, 55, 0.35)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)",
        "gold-radial": "radial-gradient(circle, #D4AF37 0%, #8C6D0F 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
