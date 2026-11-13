import { useEffect } from "react";

// Scroll-to-navigate between pages, both ways.
// Keep scrolling down at the bottom of the page → go to `next`; keep scrolling up at the top → go to `prev`.
// Works with a mouse wheel, trackpad, a swipe on a phone, and the arrow / Page Up / Page Down / Space keys.
// Either hash can be left out, e.g. useScrollToNext({ next: "problem" }).
export function useScrollToNext({ next, prev }){
  useEffect(() => {
    const start = Date.now();
    let wheel = 0, wheelAt = 0, streakFromEdge = false, touchY = null, done = false;
    // Ignore the first moment so leftover scroll momentum from the previous page doesn't carry on through this one.
    const ready = () => !done && Date.now() - start > 700;
    const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const atTop = () => window.scrollY <= 2;
    const go = hash => { done = true; window.location.hash = hash; };
    // Where a scroll in this direction would lead from here, if anywhere.
    const target = down => (down ? next && atBottom() && next : prev && atTop() && prev);

    const onWheel = e => {
      if (!ready() || e.deltaY === 0) return;
      const now = Date.now(), down = e.deltaY > 0;
      // A new scroll gesture starts after a short pause or a change of direction.
      if (now - wheelAt > 300 || Math.sign(e.deltaY) !== Math.sign(wheel)) {
        wheel = 0;
        // Only a gesture that starts at the edge counts, so scrolling up to the top of a long page
        // (and its momentum) stops there instead of jumping straight to the previous page.
        streakFromEdge = !!target(down);
      }
      wheelAt = now;
      wheel += e.deltaY;
      const hash = target(down);
      if (streakFromEdge && hash && Math.abs(wheel) > 120) go(hash);
    };
    const onTouchStart = e => { touchY = e.touches[0].clientY; streakFromEdge = atTop() || atBottom(); };
    const onTouchEnd = e => {
      if (touchY === null) return;
      const moved = touchY - e.changedTouches[0].clientY;  // > 0: finger moved up, i.e. scrolling down
      touchY = null;
      const hash = Math.abs(moved) > 60 && target(moved > 0);
      if (ready() && streakFromEdge && hash) go(hash);
    };
    const onKey = e => {
      if (!ready() || e.target.closest?.("input, textarea, select, button")) return;
      const down = ["ArrowDown", "PageDown", " "].includes(e.key) && !e.shiftKey;
      const up = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      const hash = (down || up) && target(down);
      if (hash) go(hash);
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
  }, [next, prev]);
}
