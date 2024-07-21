import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["selector", '[data-theme="dark"]', ".dark"] as any,
  content: ["./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("hocus-within", ["&:hover", "&:focus-within"]);
      addVariant("hocus-visible", ["&:hover", "&:focus-visible"]);

      const groupHoverSelector = ":merge(.group):hover &";

      addVariant("group-hocus", [groupHoverSelector, ":merge(.group):focus &"]);
      addVariant("group-hocus-within", [
        groupHoverSelector,
        ":merge(.group):focus-within &",
      ]);
      addVariant("group-hocus-visible", [
        groupHoverSelector,
        ":merge(.group):focus-visible &",
      ]);
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE, Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome */,
          },
        },
        ".scrollbar-default": {
          "ms-overflow-style": "auto",
          "scrollbar-width": "auto",
          "&::-webkit-scrollbar": {
            display: "block",
          },
        },
      });
    }),
  ],
} satisfies Config;

export default config;
