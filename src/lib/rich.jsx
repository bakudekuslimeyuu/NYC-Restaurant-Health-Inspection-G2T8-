// Colours used in the Dashboard 3 charts, so text can name a colour in the same colour as the marks.
// grey is darker than the chart's light grey bars so it stays readable as text.
const CHART_COLOURS = { orange: "#E8590C", purple: "#5B3A8C", grey: "#7A7A7A" };

// Formatting for text from content.js: **text** becomes bold, {orange:text} / {purple:text} / {grey:text} become bold text
// in that chart colour, and [[text]] becomes a link that scrolls smoothly to the element with id `linkTo` on the same page
// (the hash isn't changed, so the page route stays put).
export function rich(t, linkTo){
  return t.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\{(?:orange|purple|grey):[^}]+\})/).map((part, k) => {
    const colour = part.match(/^\{(orange|purple|grey):([^}]+)\}$/);
    if (colour) return <b key={k} className="font-semibold" style={{ color: CHART_COLOURS[colour[1]] }}>{colour[2]}</b>;
    if (part.startsWith("**") && part.endsWith("**")) return <b key={k} className="font-semibold text-ink">{part.slice(2, -2)}</b>;
    if (part.startsWith("[[") && part.endsWith("]]")) return (
      <a key={k} href={`#${linkTo}`} onClick={e => { e.preventDefault(); document.getElementById(linkTo)?.scrollIntoView({ behavior: "smooth" }); }}
        className="font-semibold text-accent underline-offset-4 hover:underline">{part.slice(2, -2)}</a>
    );
    return part;
  });
}
