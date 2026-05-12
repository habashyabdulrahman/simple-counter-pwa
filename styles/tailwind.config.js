// ============================================
//   SIMPLE COUNTER PWA — Tailwind Config
//   Loaded via <script> before the CDN script
//   so the CDN picks up our customizations.
// ============================================

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        slate: {
          950: "#020617",
        },
      },
    },
  },
};
