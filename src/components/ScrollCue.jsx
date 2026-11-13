import { Icon, icons } from "./Icon.jsx";

// Pages joined by scrolling, in reading order: only the short intro pages.
// Scrolling past the end of one of these moves along the list (see useScrollToNext); other pages are left alone.
const ORDER = [
  ["home", "Home"],
  ["problem", "Problem Statement"],
  ["overview", "Overview"]
];

// The pages before and after `route`, as [hash, label]; null at either end or for pages not in the list.
export function neighbours(route){
  const i = ORDER.findIndex(([hash]) => hash === route);
  if (i < 0) return { prev: null, next: null };
  return { prev: ORDER[i - 1] ?? null, next: ORDER[i + 1] ?? null };
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
