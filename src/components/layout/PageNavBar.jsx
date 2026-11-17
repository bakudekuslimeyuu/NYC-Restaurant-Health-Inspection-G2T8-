import { CONTENT } from "../../data/content.js";
import { Icon, icons } from "../Icon.jsx";
import { pad } from "../../lib/format.js";
import { useHashRoute } from "../../hooks/useHashRoute.js";

// Every page in reading order, as [hash, title]. The previous/next bar at the bottom of each page follows this list,
// so adding a page here is all it takes to link it in.
export const ORDER = [
  ["home", "Home"],
  ["introduction", "Introduction"],
  ["overview", "Overview"],
  ...CONTENT.dashboards.map(d => [`dash-${d.n}`, `${pad(d.n)} · ${d.nav}`]),
  ["redesign", "Redesign Proposal"]
];

// One half of the bar: a round teal arrow beside the label and page title.
function PageNav({ hash, title, label, right }){
  return (
    <a href={`#${hash}`} className={`group flex items-center gap-4 p-5 transition-colors duration-200 ease-out hover:bg-band sm:p-6 ${right ? "flex-row-reverse text-right" : ""}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-200 ease-out ${right ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"}`}>
        <Icon d={icons.arrow} className={`h-[18px] w-[18px] ${right ? "" : "rotate-180"}`} />
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sub">{label}</span>
        <span className="mt-1 text-[15px] font-semibold text-ink group-hover:text-accent">{title}</span>
      </span>
    </a>
  );
}

// Previous / next pages in one outlined bar, split by a divider (vertical on wider screens, horizontal on phones).
// The last page has no "next", so its "previous" fills the bar.
export function PageNavBar(){
  const route = useHashRoute();
  const i = ORDER.findIndex(([hash]) => hash === route);
  if (i < 0) return null;
  const prev = ORDER[i - 1], next = ORDER[i + 1];
  return (
    <nav aria-label="Previous and next page"
      className={`mt-16 grid divide-y-2 divide-accent/30 overflow-hidden rounded-2xl border-2 border-accent/40 bg-white sm:divide-y-0 ${prev && next ? "sm:grid-cols-2 sm:divide-x-2" : ""}`}>
      {prev && <PageNav hash={prev[0]} title={prev[1]} label="Previous" />}
      {next && <PageNav right hash={next[0]} title={next[1]} label="Next" />}
    </nav>
  );
}
