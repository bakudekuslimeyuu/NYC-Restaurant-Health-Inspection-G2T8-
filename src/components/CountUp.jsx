import { useEffect, useRef, useState } from "react";

// Counts from 0 up to `value` (a number or a string such as "88,828") when it first scrolls into view,
// after an optional `delay` in ms (used to start a row of numbers one after another).
// It eases out over `duration` ms, so it runs fast at first and slows into the final number.
// Readers who ask for reduced motion see the final number straight away.
export function CountUp({ value, duration = 1600, delay = 0 }){
  const target = typeof value === "number" ? value : Number(String(value).replace(/[^\d.]/g, ""));
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let frame, timer;
    const run = () => {
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));  // ease-out cubic
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { io.disconnect(); timer = setTimeout(run, delay); } }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(frame); };
  }, [target, duration, delay]);

  // tabular-nums keeps every digit the same width, so the number doesn't jitter while counting.
  // Screen readers get the final number only.
  return (
    <span ref={ref} className="tabular-nums" aria-label={target.toLocaleString("en-US")}>
      <span aria-hidden="true">{n.toLocaleString("en-US")}</span>
    </span>
  );
}
