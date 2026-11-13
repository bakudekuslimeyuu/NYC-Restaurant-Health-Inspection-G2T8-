import { useEffect, useRef, useState } from "react";
import { Icon, icons } from "./Icon.jsx";
import { pad } from "../lib/format.js";

// Height of the Tableau toolbar shown under the viz (toolbar="bottom").
const TOOLBAR = 30;

// <tableau-viz> comes from the Tableau Embedding API v3 script loaded in index.html.
// plain: no teal header bar (used for walkthrough steps, which have their own heading).
// lazy: only load the viz once the frame is close to being scrolled into view, so a page with many charts stays quick.
// caption: replaces the default "FIG." caption text.
// bare: no border, rounding or caption, for placing the chart inside another card.
export function TableauFrame({ n, question, views, source, onViewChange, plain, lazy, caption, bare }){
  const [active, setActive] = useState(0);
  const [vizHeight, setVizHeight] = useState(null);
  const [near, setNear] = useState(!lazy);
  const vizRef = useRef(null), boxRef = useRef(null);
  const v = views[active];

  useEffect(() => {
    if (near) return;
    const box = boxRef.current;
    if (!box || !("IntersectionObserver" in window)) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(box);
    return () => io.disconnect();
  }, [near]);
  // Tableau share links often carry ?:language=... etc. The viz only needs the bare /views/Workbook/Sheet URL.
  // Profile-page links (/app/profile/<user>/viz/Workbook/Sheet) are rewritten to that form too.
  const src = v.url && v.url.split("?")[0].replace(/\/app\/profile\/[^/]+\/viz\//, "/views/");

  // Dashboards with a set size (fixed, or a range) report their height once loaded; grow the frame to fit so nothing is clipped.
  // If Tableau doesn't report one, v.height from content.js is used (set it for every dashboard so the frame is right
  // even before the dashboard loads); automatic-size dashboards fill whatever space they get.
  useEffect(() => {
    setVizHeight(null);
    const el = vizRef.current;
    if (!el) return;
    const onReady = () => {
      const size = el.workbook?.activeSheet?.size;
      const h = size?.maxSize?.height || size?.minSize?.height;
      if (size && size.behavior !== "automatic" && h) setVizHeight(h + TOOLBAR);
    };
    el.addEventListener("firstinteractive", onReady);
    return () => el.removeEventListener("firstinteractive", onReady);
  }, [src, near]);

  const height = vizHeight ?? v.height;
  return (
    <figure className="m-0">
      <div ref={boxRef} className={`overflow-hidden bg-white ${bare ? "" : "rounded-2xl border border-line"}`}>
        {!plain && <div className="flex flex-wrap items-center justify-between gap-3 bg-accent px-5 py-4">
          <p className="text-[15px] font-semibold leading-snug text-white">{question}</p>
          {views.length > 1 && (
            <div className="flex flex-wrap gap-1.5">
              {views.map((x, i) => (
                <button key={i} onClick={() => { setActive(i); onViewChange?.(i); }}
                  className={`rounded-full border px-3 py-1 text-[12.5px] font-semibold transition duration-200 ease-out ${
                    i === active ? "border-white bg-white text-accent" : "border-white/60 text-white hover:border-white"}`}>{x.label}</button>
              ))}
            </div>
          )}
        </div>}
        <div className={`relative overflow-x-auto ${height ? "" : "h-[480px] sm:h-[620px]"}`} style={height ? { height } : undefined}>
          {src ? near && <tableau-viz ref={vizRef} key={src} src={src} toolbar="bottom" hide-tabs="" width="100%" height="100%" class="absolute inset-0 block h-full w-full"></tableau-viz>
            : (
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div className="max-w-sm">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-band text-accent"><Icon d={icons.chart} className="h-5 w-5" /></span>
                  <p className="mt-5 text-[16px] font-semibold">{v.label}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-sub">Tableau dashboard slot. Paste the published link for this workbook and it will load inside this frame.</p>
                </div>
              </div>
            )}
        </div>
      </div>
      {!bare && <figcaption className="mt-3 font-mono text-[11px] text-sub">{caption ?? <>FIG. {pad(n)}{views.length > 1 ? `.${active + 1}` : ""} — {v.label} · Source: {source}</>}</figcaption>}
    </figure>
  );
}
