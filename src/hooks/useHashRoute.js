import { useEffect, useState } from "react";

// Hash routing (#home, #dash-1 …) works on GitHub Pages without any server config.
// Old addresses that were renamed, so existing links still land on the right page.
const RENAMED = { problem: "introduction" };

export function useHashRoute(){
  const read = () => {
    const r = (window.location.hash || "#home").slice(1) || "home";
    if (RENAMED[r]) { history.replaceState(null, "", `#${RENAMED[r]}`); return RENAMED[r]; }
    return r;
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
