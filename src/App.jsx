import { useMemo, useState } from "react";
import { CONTENT } from "./data/content.js";
import { useHashRoute } from "./hooks/useHashRoute.js";
import { Sidebar, SIDEBAR_OPEN, SIDEBAR_SHUT } from "./components/layout/Sidebar.jsx";
import { TopBar } from "./components/layout/TopBar.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
import { useReadingProgress } from "./hooks/useReadingProgress.js";
import { Home } from "./pages/Home.jsx";
import { Introduction } from "./pages/Introduction.jsx";
import { Overview } from "./pages/Overview.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Redesign } from "./pages/Redesign.jsx";

const pages = { introduction: Introduction, overview: Overview, redesign: Redesign };

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
  // A dashboard's sections, listed in the sidebar with a tick once the reader has passed them.
  // The ids are set in Dashboard.jsx (overview, summary) and its walkthrough (one per step).
  const sections = useMemo(() => dash ? [
    { id: null, label: "Introduction" },
    { id: `d${dash.n}-overview`, label: "Dashboard overview" },
    ...(dash.steps ?? []).map((s, k) => ({ id: `d${dash.n}-step-${k + 1}`, label: s.chart })),
    { id: `d${dash.n}-summary`, label: "Summary" }
  ] : [], [dash]);
  const { progress, current } = useReadingProgress(key, sections);
  const jump = s => {
    setMenu(false);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const el = s.id && document.getElementById(s.id);
    if (el) el.scrollIntoView({ behavior, block: "start" }); else window.scrollTo({ top: 0, behavior });
  };
  return (
    <>
      <TopBar onMenu={() => setMenu(true)} />
      <Sidebar route={key} open={menu} onClose={() => setMenu(false)} collapsed={collapsed} onToggle={toggleCollapsed}
        sections={sections} current={current} onJump={jump} />
      <main className={`min-h-screen pt-14 transition-[margin] duration-300 ease-out lg:pt-0 ${collapsed ? SIDEBAR_SHUT : SIDEBAR_OPEN}`}>
        <div key={key} className="route-in">
          {page}
        </div>
      </main>
      <BackToTop progress={progress} />
    </>
  );
}
