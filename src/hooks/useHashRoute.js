import { useEffect, useState } from "react";

// Hash routing (#home, #dash-1 …) works on GitHub Pages without any server config.
// A link can also point inside a page: #dash-3/step-1 opens Dashboard 3 at walkthrough step 1
// (only the part before "/" picks the page; the page itself scrolls to the rest).
// Old addresses that were renamed, so existing links still land on the right page.
const RENAMED = { problem: "introduction" };

export function useHashRoute(){
  const read = () => {
    const r = ((window.location.hash || "#home").slice(1) || "home").split("/")[0];
    if (RENAMED[r]) { history.replaceState(null, "", `#${RENAMED[r]}`); return RENAMED[r]; }
    return r;
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    // A plain page link starts at the top; a link to a spot inside a page leaves the scrolling to that page.
    const on = () => { setRoute(read()); if (!window.location.hash.includes("/")) window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
