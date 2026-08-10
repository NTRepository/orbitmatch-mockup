/** @type {import('tailwindcss').Config} */

// Brand palette from Theme / Colors Variables + Colors Styles.
// Built-in Tailwind scales are overridden so existing utility classes
// (gray-*, red-*, emerald-*, blue-*, purple-*, amber-*, indigo-*) pick up
// the brand colors app-wide. Neo Teal is exposed as `brand`.
const palette = {
  gray: {
    50: "#F9FAFA", 100: "#F1F1F2", 200: "#E7E7E8", 300: "#D3D4D5", 400: "#ABADAF",
    500: "#7D7F83", 600: "#52555A", 700: "#33373D", 800: "#1D2025", 900: "#171A1D",
  },
  red: {
    50: "#FDF6F5", 100: "#FEE2E4", 200: "#FECACE", 300: "#FCA5AB", 400: "#F9707A",
    500: "#F04343", 600: "#CD202C", 700: "#BA1B26", 800: "#9A1A23", 900: "#801C23",
  },
  orange: {
    50: "#FFFAEB", 100: "#FEF1C7", 200: "#FCE18B", 300: "#FBCC4E", 400: "#F9B626",
    500: "#F3950D", 600: "#D76F08", 700: "#B34D0A", 800: "#913B0F", 900: "#773110",
  },
  amber: {
    50: "#FFFAEB", 100: "#FEF1C7", 200: "#FCE18B", 300: "#FBCC4E", 400: "#F9B626",
    500: "#F3950D", 600: "#D76F08", 700: "#B34D0A", 800: "#913B0F", 900: "#773110",
  },
  yellow: {
    50: "#FFFEFB", 100: "#FFF8E9", 200: "#FEECBD", 300: "#FDDC87", 400: "#FBC434",
    500: "#D2A01E", 600: "#A88018", 700: "#836413", 800: "#624B0E", 900: "#513E0C",
  },
  green: {
    50: "#EBFEF6", 100: "#CFFCE8", 200: "#A3F7D6", 300: "#68EDC0", 400: "#2DDAA6",
    500: "#08C18F", 600: "#009D76", 700: "#007D61", 800: "#026B54", 900: "#035141",
  },
  emerald: {
    50: "#EBFEF6", 100: "#CFFCE8", 200: "#A3F7D6", 300: "#68EDC0", 400: "#2DDAA6",
    500: "#08C18F", 600: "#009D76", 700: "#007D61", 800: "#026B54", 900: "#035141",
  },
  brand: {
    50: "#E2F1F2", 100: "#D1E4E6", 200: "#BFD8DA", 300: "#AECBCD", 400: "#7AA5A9",
    500: "#357278", 600: "#2A5B60", 700: "#204448", 800: "#255055", 900: "#152E30",
  },
  // Neo Teal also mapped onto indigo so existing indigo-* usages become brand teal.
  indigo: {
    50: "#E2F1F2", 100: "#D1E4E6", 200: "#BFD8DA", 300: "#AECBCD", 400: "#7AA5A9",
    500: "#357278", 600: "#2A5B60", 700: "#204448", 800: "#255055", 900: "#152E30",
  },
  teal: {
    50: "#E2F1F2", 100: "#D1E4E6", 200: "#BFD8DA", 300: "#AECBCD", 400: "#7AA5A9",
    500: "#357278", 600: "#2A5B60", 700: "#204448", 800: "#255055", 900: "#152E30",
  },
  blue: {
    50: "#EEF6FF", 100: "#D9EBFF", 200: "#BBDDFF", 300: "#8CC9FF", 400: "#2E89FF",
    500: "#176AF9", 600: "#1054E5", 700: "#1444B9", 800: "#173D91", 900: "#132759",
  },
  cyan: {
    50: "#F0FAFF", 100: "#E0F4FE", 200: "#BAE9FD", 300: "#7ED9FB", 400: "#39C6F7",
    500: "#0EA3D7", 600: "#038EC6", 700: "#0471A0", 800: "#085F84", 900: "#0C4F6E",
  },
  purple: {
    50: "#FAF5FF", 100: "#F2E7FF", 200: "#E7D3FF", 300: "#D5B1FF", 400: "#BC7EFF",
    500: "#A54DFF", 600: "#902AF3", 700: "#801BDF", 800: "#691BAE", 900: "#56178C",
  },
  pink: {
    50: "#FDF5F9", 100: "#F8D9E7", 200: "#F3B9D3", 300: "#EB8DB8", 400: "#E56BA2",
    500: "#DC3882", 600: "#C4246C", 700: "#A01D58", 800: "#7D1745", 900: "#5D1133",
  },
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: palette,
    },
  },
  plugins: [],
};
