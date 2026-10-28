import { useEffect, useState } from "react";

// Hash routing (#home, #dash-1 …) works on GitHub Pages without any server config.
export function useHashRoute(){
  const read = () => (window.location.hash || "#home").slice(1) || "home";
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => { setRoute(read()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}
