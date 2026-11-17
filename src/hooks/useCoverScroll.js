import { useEffect } from "react";

// Home page only: the cover fills the screen and has nothing below it, so any downward scroll (mouse wheel, trackpad,
// a swipe up on a phone, or the ↓ / Page Down / Space keys) moves on to the page at `hash`.
// One way only: other pages never jump on scroll, and scrolling up on the next page does not come back here.
export function useCoverScroll(hash){
  useEffect(() => {
    const start = Date.now();
    let touchY = null, done = false;
    // Ignore the first moment, so leftover scroll momentum from arriving on the page doesn't skip the cover.
    const go = () => { if (!done && Date.now() - start > 500) { done = true; window.location.hash = hash; } };

    const onWheel = e => { if (e.deltaY > 20) go(); };
    const onTouchStart = e => { touchY = e.touches[0].clientY; };
    const onTouchEnd = e => {
      if (touchY !== null && touchY - e.changedTouches[0].clientY > 50) go();  // finger moved up = scrolling down
      touchY = null;
    };
    const onKey = e => {
      if (e.target.closest?.("input, textarea, select, button, a")) return;
      if (["ArrowDown", "PageDown"].includes(e.key) || (e.key === " " && !e.shiftKey)) { e.preventDefault(); go(); }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [hash]);
}
