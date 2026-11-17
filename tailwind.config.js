/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // sub: body and secondary text. A dark grey (about 13:1 on white): easy to read but softer than the headings' ink,
        // so long paragraphs are less tiring and bold phrases still stand out. (Was #6A7078, about 4.9:1.)
        // line: borders and dividers everywhere. Darkened from #E5E7EB, which was too faint on white.
        ink: "#16181D", sub: "#2C3036", line: "#D2D6DC", band: "#F2F2F2",
        accent: "#14A38B", side: "#0A0B10", sideline: "#1E2029", sideactive: "#171922"
      },
      fontFamily: {
        sans: ['"Instrument Sans"', "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};
