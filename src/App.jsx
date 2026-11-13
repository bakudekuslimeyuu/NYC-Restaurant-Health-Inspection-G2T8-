import { useState } from "react";
import { CONTENT } from "./data/content.js";
import { useHashRoute } from "./hooks/useHashRoute.js";
import { Sidebar, SIDEBAR_OPEN, SIDEBAR_SHUT } from "./components/layout/Sidebar.jsx";
import { TopBar } from "./components/layout/TopBar.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
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
  return (
    <>
      <TopBar onMenu={() => setMenu(true)} />
      <Sidebar route={key} open={menu} onClose={() => setMenu(false)} collapsed={collapsed} onToggle={toggleCollapsed} />
      <main className={`min-h-screen pt-14 transition-[margin] duration-300 ease-out lg:pt-0 ${collapsed ? SIDEBAR_SHUT : SIDEBAR_OPEN}`}>
        <div key={key} className="route-in">{page}</div>
      </main>
      <BackToTop />
    </>
  );
}
