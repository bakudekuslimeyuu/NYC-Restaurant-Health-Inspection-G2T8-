import { useState } from "react";
import { Icon, icons } from "./Icon.jsx";

export function InsightsAccordion({ items }){
  const [open, setOpen] = useState(-1);
  return (
    <div className="mt-7 space-y-3">
      {items.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="overflow-hidden rounded-xl">
            <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 bg-coral px-5 py-4 text-left text-[15px] font-semibold leading-snug text-white">
              {q}<span className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}><Icon d={icons.chev} className="h-4 w-4" /></span>
            </button>
            <div className={`grid bg-band transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden"><p className="px-5 py-4 text-[15px] leading-[1.75] text-sub">{a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
