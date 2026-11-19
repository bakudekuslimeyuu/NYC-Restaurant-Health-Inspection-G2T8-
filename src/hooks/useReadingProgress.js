import { useEffect, useState } from "react";

// How far the reader has scrolled down the page (0 to 1), and which of the page's sections they are in.
// `sections` is a list of { id, label }; an id of null stands for the top of the page.
// A section counts as reached once its top is within 120px of the top of the window.
export function useReadingProgress(route, sections){
  const [state, setState] = useState({ progress: 0, current: 0 });
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      let current = 0;
      sections.forEach((s, i) => {
        const el = s.id && document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 120) current = i;
      });
      // At the very bottom the last section may never reach the top of the window, so mark it reached there.
      if (sections.length && max > 0 && y >= max - 2) current = sections.length - 1;
      setState({ progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0, current });
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    // The page gets taller as each Tableau chart loads, so measure again whenever its height changes.
    const grow = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(on);
    grow?.observe(document.body);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      grow?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [route, sections]);
  return state;
}
