import { useState } from "react";
import { CONTENT } from "./data/content.js";
import { useHashRoute } from "./hooks/useHashRoute.js";
import { Sidebar, SIDEBAR_OPEN, SIDEBAR_SHUT } from "./components/layout/Sidebar.jsx";
import { TopBar } from "./components/layout/TopBar.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
import { ScrollCue, neighbours } from "./components/ScrollCue.jsx";
import { useScrollToNext } from "./hooks/useScrollToNext.js";
import { Home } from "./pages/Home.jsx";
import { Problem } from "./pages/Problem.jsx";
import { Overview } from "./pages/Overview.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Redesign } from "./pages/Redesign.jsx";

const pages = { problem: Problem, overview: Overview, redesign: Redesign };

// Remember whether the reader collapsed the sidebar (storage can be blocked, so failures are ignored).
const COLLAPSE_KEY = "sidebar-collapsed";
const readCollapsed = () => { try { return localStorage.getItem(COLLAPSE_KEY) === "1"; } catch { return false; } };

export default function App(){
  const route = useHashRoute();
  const [menu, setMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(readCollapsed);
  const toggleCollapsed = () => setCollapsed(c => {
    try { localStorage.setItem(COLLAPSE_KEY, c ? "0" : "1"); } catch { /* not saved; still toggles */ }
    return !c;
  });
  const dash = CONTENT.dashboards.find(d => route === `dash-${d.n}`);
  const key = dash || pages[route] ? route : "home";
  const PageComponent = pages[key];
  const page = dash ? <Dashboard key={dash.n} d={dash} /> : PageComponent ? <PageComponent /> : <Home />;
  // Scrolling past the top or bottom of any page moves to the previous / next page in the reading order.
  const { prev, next } = neighbours(key);
  useScrollToNext({ prev: prev?.[0], next: next?.[0] });
  // Home has its own full-screen hint, so the cues are added on every other page.
  const cues = key !== "home";
  return (
    <>
      <TopBar onMenu={() => setMenu(true)} />
      <Sidebar route={key} open={menu} onClose={() => setMenu(false)} collapsed={collapsed} onToggle={toggleCollapsed} />
      <main className={`min-h-screen pt-14 transition-[margin] duration-300 ease-out lg:pt-0 ${collapsed ? SIDEBAR_SHUT : SIDEBAR_OPEN}`}>
        <div key={key} className="route-in">
          {cues && prev && <ScrollCue up item={prev} />}
          {page}
          {cues && next && <ScrollCue item={next} />}
        </div>
      </main>
      <BackToTop />
    </>
  );
}
