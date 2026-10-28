/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16181D", sub: "#6A7078", line: "#E5E7EB", band: "#F2F2F2",
        coral: "#ED7A6A", side: "#0A0B10", sideline: "#1E2029", sideactive: "#171922"
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};
