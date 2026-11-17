import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon, icons } from "./Icon.jsx";
import { pad } from "../lib/format.js";

// Height of the Tableau toolbar shown under the viz (toolbar="bottom").
const TOOLBAR = 30;

// Full-screen view of one dashboard, opened with the Expand button.
// The layer goes into the browser's real full-screen mode (no tabs or address bar).
// Automatic-size dashboards are drawn by Tableau to fill the screen; fixed-size ones are scaled up (CSS zoom)
// as far as the screen allows and centred. (Switching a fixed dashboard to automatic via the API drew it small
// in the corner on Tableau Public, so it is not attempted.)
function ExpandedViz({ src, label, onClose }){
  const layerRef = useRef(null), vizRef = useRef(null), stageRef = useRef(null);
  const [fixedSize, setFixedSize] = useState(null);  // { w, h } when the dashboard keeps a set size
  const [stage, setStage] = useState(null);          // { w, h } of the area available on screen

  // Real full screen, like a video player. Leaving it (Esc, or the browser's own control) closes the layer.
  useEffect(() => {
    const layer = layerRef.current;
    let entered = false;
    const onChange = () => {
      if (document.fullscreenElement === layer) entered = true;
      else if (entered) onClose();
    };
    document.addEventListener("fullscreenchange", onChange);
    layer?.requestFullscreen?.().catch(() => { /* not allowed: stays as a full-window layer */ });
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      if (document.fullscreenElement === layer) document.exitFullscreen?.().catch(() => {});
    };
  }, [onClose]);

  // Esc also closes when full screen wasn't available; the page behind doesn't scroll while open.
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape" && !document.fullscreenElement) onClose(); };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [onClose]);

  // Track the available area so the scaling follows window resizes.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStage({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = vizRef.current;
    if (!el) return;
    const onReady = () => {
      const size = el.workbook?.activeSheet?.size;
      const w = size?.maxSize?.width, h = size?.maxSize?.height;
      if (size && size.behavior !== "automatic" && w && h) setFixedSize({ w, h: h + TOOLBAR });
    };
    el.addEventListener("firstinteractive", onReady);
    return () => el.removeEventListener("firstinteractive", onReady);
  }, [src]);

  const zoom = fixedSize && stage ? Math.min(stage.w / fixedSize.w, stage.h / fixedSize.h) : null;
  const box = zoom ? { position: "absolute", width: fixedSize.w * zoom, height: fixedSize.h * zoom,
    left: (stage.w - fixedSize.w * zoom) / 2, top: (stage.h - fixedSize.h * zoom) / 2 } : { position: "absolute", inset: 0 };

  return createPortal(
    <div ref={layerRef} role="dialog" aria-modal="true" aria-label={label} className="fixed inset-0 z-[100] flex flex-col bg-white">
      <div className="flex items-center justify-between gap-3 bg-accent px-5 py-3">
        <p className="text-[14px] font-semibold text-white">{label}</p>
        <button onClick={onClose} aria-label="Close full screen" title="Close (Esc)"
          className="grid h-8 w-8 place-items-center rounded-full border border-white/60 text-white transition-colors duration-200 ease-out hover:border-white hover:bg-white/10">
          <Icon d={icons.close} className="h-4 w-4" />
        </button>
      </div>
      <div ref={stageRef} className="relative flex-1 overflow-hidden">
        <div style={box}>
          <tableau-viz ref={vizRef} src={src} toolbar="bottom" hide-tabs="" width="100%" height="100%"
            style={zoom ? { display: "block", width: fixedSize.w, height: fixedSize.h, zoom } : { display: "block", width: "100%", height: "100%" }}></tableau-viz>
        </div>
      </div>
    </div>,
    document.body
  );
}

// <tableau-viz> comes from the Tableau Embedding API v3 script loaded in index.html.
// plain: no teal header bar (used for walkthrough steps, which have their own heading).
// lazy: only load the viz once the frame is close to being scrolled into view, so a page with many charts stays quick.
// caption: replaces the default "FIG." caption text.
// bare: no border, rounding or caption, for placing the chart inside another card.
export function TableauFrame({ n, question, views, source, onViewChange, plain, lazy, caption, bare }){
  const [active, setActive] = useState(0);
  const [vizHeight, setVizHeight] = useState(null);
  const [near, setNear] = useState(!lazy);
  const [expanded, setExpanded] = useState(false);
  const closeExpanded = useCallback(() => setExpanded(false), []);
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
          <div className="flex flex-wrap items-center gap-1.5">
            {views.length > 1 && views.map((x, i) => (
              <button key={i} onClick={() => { setActive(i); onViewChange?.(i); }}
                className={`rounded-full border px-3 py-1 text-[12.5px] font-semibold transition duration-200 ease-out ${
                  i === active ? "border-white bg-white text-accent" : "border-white/60 text-white hover:border-white"}`}>{x.label}</button>
            ))}
            {src && (
              <button onClick={() => setExpanded(true)} aria-label="Expand to full screen" title="Expand to full screen"
                className="ml-1 grid h-[30px] w-[30px] place-items-center rounded-full border border-white/60 text-white transition-colors duration-200 ease-out hover:border-white hover:bg-white/10">
                <Icon d={icons.expand} className="h-[15px] w-[15px]" />
              </button>
            )}
          </div>
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
      {expanded && src && <ExpandedViz src={src} label={views.length > 1 ? `${question} · ${v.label}` : (question ?? v.label)} onClose={closeExpanded} />}
    </figure>
  );
}
