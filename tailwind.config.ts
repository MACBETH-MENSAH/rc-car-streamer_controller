import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FEF7CD",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#333333",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#555555",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FEF7CD",
          foreground: "#000000",
        },
        popover: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#333333",
          foreground: "#FFFFFF",
        },
      },
      keyframes: {
        "joystick-move": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(var(--x), var(--y))" },
        },
      },
      animation: {
        "joystick-move": "joystick-move 0.2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;