import { Icon, icons } from "./Icon.jsx";
import { CONTENT } from "../data/content.js";
import { pad } from "../lib/format.js";

// Reading order of the site. Scrolling past the end of a page moves along this list (see useScrollToNext).
export function pageOrder(){
  return [
    ["home", "Home"],
    ["problem", "Problem Statement"],
    ["overview", "Overview"],
    ...CONTENT.dashboards.map(d => [`dash-${d.n}`, `Dashboard ${pad(d.n)} · ${d.nav}`]),
    ["redesign", "Redesign Proposal"]
  ];
}

// The pages before and after `route`, as [hash, label], or null at either end.
export function neighbours(route){
  const order = pageOrder();
  const i = order.findIndex(([hash]) => hash === route);
  return { prev: order[i - 1] ?? null, next: i >= 0 ? order[i + 1] ?? null : null };
}

// Tells the reader where scrolling past the edge will take them; also a plain link.
export function ScrollCue({ item, up }){
  const [hash, label] = item;
  return (
    <a href={`#${hash}`}
      className={`group mx-auto flex w-fit flex-col items-center gap-1 px-6 text-center text-sub transition-colors duration-200 ease-out hover:text-accent ${
        up ? "pt-6" : "pb-12 pt-4"}`}>
      {up && <Icon d={icons.chev} className="h-4 w-4 rotate-180" />}
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em]">{up ? "Scroll up for" : "Keep scrolling for"}</span>
      <span className="text-[14px] font-semibold text-ink group-hover:text-accent">{label}</span>
      {!up && <Icon d={icons.chev} className="h-4 w-4 motion-safe:animate-bounce" />}
    </a>
  );
}
