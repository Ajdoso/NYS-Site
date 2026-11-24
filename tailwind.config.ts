import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        tyn: {
          dark: "#0a1f26",
          primary: "#0d4352",
          secondary: "#165b6e",
          accent: "#c49a45",
          accentLight: "#dfb86c",
          cream: "#f7f5f0",
          sand: "#ede7dc",
          sandDark: "#d5cabb",
          charcoal: "#1c2224",
          text: "#1e282d",
        },
        pro: {
          black: "#050505",
          dark: "#0f0f10",
          card: "#17181a",
          border: "#25272a",
          lime: "#ccff00",
          limeHover: "#b8e600",
          orange: "#ff5500",
          orangeHover: "#e64a00",
          gray: "#8c8e94",
          lightGray: "#d4d6db",
          white: "#ffffff",
        },
      },
      fontFamily: {
        tynHeading: ["var(--font-tyn-heading)", "Georgia", "serif"],
        tynBody: ["var(--font-tyn-body)", "sans-serif"],
        proDisplay: ["var(--font-pro-display)", "Impact", "sans-serif"],
        proBody: ["var(--font-pro-body)", "monospace", "sans-serif"],
      },
      letterSpacing: {
        widestEditorial: "0.25em",
        tactical: "0.15em",
      },
      boxShadow: {
        'pro-glow': '0 0 20px -3px rgba(204, 255, 0, 0.35)',
        'pro-orange-glow': '0 0 20px -3px rgba(255, 85, 0, 0.4)',
        'tyn-subtle': '0 10px 30px -10px rgba(13, 67, 82, 0.12)',
        'tyn-elevated': '0 20px 40px -15px rgba(13, 67, 82, 0.18)',
      },
    },
  },
  plugins: [],
};
export default config;
