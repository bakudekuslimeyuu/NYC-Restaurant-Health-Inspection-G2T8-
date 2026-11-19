import { useEffect, useState } from "react";
import { Icon, icons } from "./Icon.jsx";

// Ring drawn just inside the 48px button. Its length is the full circle, so dashoffset = length × (1 − progress)
// shows how far down the page the reader is, starting at 12 o'clock and filling clockwise.
const R = 20.5, LENGTH = 2 * Math.PI * R;

// Back-to-top button, shown after 400px of scrolling. The white ring around the arrow fills as the reader scrolls
// (`progress` from useReadingProgress, 0 to 1).
export function BackToTop({ progress = 0 }){
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button aria-label="Back to top" onClick={toTop}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-[0_10px_24px_-8px_rgba(20,163,139,0.6)] transition duration-300 ease-out ${show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r={R} stroke="rgba(255,255,255,0.28)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r={R} stroke="#fff" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={LENGTH} strokeDashoffset={LENGTH * (1 - progress)} />
      </svg>
      <Icon d={icons.up} className="relative h-[18px] w-[18px]" />
    </button>
  );
}
