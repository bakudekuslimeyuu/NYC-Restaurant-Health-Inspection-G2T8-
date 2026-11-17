/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // sub: body and secondary text. Set to the same near-black as headings (ink) so long text is easy to read;
        // headings still stand out through size and weight. (Was #6A7078, about 4.9:1 on white.)
        ink: "#16181D", sub: "#16181D", line: "#E5E7EB", band: "#F2F2F2",
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
