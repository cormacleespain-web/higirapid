import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A5EBF",
        accent: "#ADD84F",
        secondary: "#50D9B2",
        surface: {
          primary: "#FFFFFF",
          subtle: "#F8FAFC",
        },
        content: {
          primary: "#0F172A",
          secondary: "#64748B",
          inverse: "#FFFFFF",
        },
        border: "#E2E8F0",
        error: "#DC2626",
        success: "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-garet)", "system-ui", "sans-serif"],
        heading: ["var(--font-nunito-heading)", "var(--font-garet-extrabold)", "var(--font-garet)", "system-ui", "sans-serif"],
        "garet-extrabold": ["var(--font-garet-extrabold)", "var(--font-garet)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
