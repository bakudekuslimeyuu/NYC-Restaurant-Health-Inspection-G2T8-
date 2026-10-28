import { useState } from "react";
import { Icon, icons } from "./Icon.jsx";
import { pad } from "../lib/format.js";

// <tableau-viz> comes from the Tableau Embedding API v3 script loaded in index.html.
export function TableauFrame({ n, question, views, source }){
  const [active, setActive] = useState(0);
  const v = views[active];
  // Tableau share links often carry ?:language=... etc. The viz only needs the bare /views/Workbook/Sheet URL.
  const src = v.url && v.url.split("?")[0];
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-coral px-5 py-4">
          <p className="text-[15px] font-semibold leading-snug text-white">{question}</p>
          {views.length > 1 && (
            <div className="flex gap-1.5">
              {views.map((x, i) => (
                <button key={i} onClick={() => setActive(i)}
                  className={`rounded-full border px-3 py-1 text-[12.5px] font-semibold transition duration-200 ease-out ${
                    i === active ? "border-white bg-white text-coral" : "border-white/60 text-white hover:border-white"}`}>{x.label}</button>
              ))}
            </div>
          )}
        </div>
        <div className="relative h-[480px] sm:h-[620px]">
          {src ? <tableau-viz key={src} src={src} toolbar="bottom" hide-tabs="" width="100%" height="100%" class="absolute inset-0 block h-full w-full"></tableau-viz>
            : (
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div className="max-w-sm">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-band text-coral"><Icon d={icons.chart} className="h-5 w-5" /></span>
                  <p className="mt-5 text-[16px] font-semibold">{v.label}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-sub">Tableau dashboard slot. Paste the published link for this workbook and it will load inside this frame.</p>
                </div>
              </div>
            )}
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] text-sub">FIG. {pad(n)}{views.length > 1 ? `.${active + 1}` : ""} — {v.label} · Source: {source}</figcaption>
    </figure>
  );
}
