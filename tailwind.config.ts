import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f8f1e6",
        linen: "#efe2d0",
        clay: "#b9785f",
        moss: "#7d8a62",
        bark: "#5c4737",
        cacao: "#3f3027",
        sage: "#c4ccb1",
        sand: "#ddc7aa"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(92, 71, 55, 0.13)",
        glow: "0 0 0 4px rgba(196, 204, 177, 0.58), 0 18px 44px rgba(125, 138, 98, 0.25)"
      },
      fontFamily: {
        thai: ["var(--font-noto-thai)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
