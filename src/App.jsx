import { useState } from "react";
import { CONTENT } from "./data/content.js";
import { useHashRoute } from "./hooks/useHashRoute.js";
import { Sidebar } from "./components/layout/Sidebar.jsx";
import { TopBar } from "./components/layout/TopBar.jsx";
import { BackToTop } from "./components/BackToTop.jsx";
import { Home } from "./pages/Home.jsx";
import { Problem } from "./pages/Problem.jsx";
import { Overview } from "./pages/Overview.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Redesign } from "./pages/Redesign.jsx";

const pages = { problem: Problem, overview: Overview, redesign: Redesign };

export default function App(){
  const route = useHashRoute();
  const [menu, setMenu] = useState(false);
  const dash = CONTENT.dashboards.find(d => route === `dash-${d.n}`);
  const key = dash || pages[route] ? route : "home";
  const PageComponent = pages[key];
  const page = dash ? <Dashboard d={dash} /> : PageComponent ? <PageComponent /> : <Home />;
  return (
    <>
      <TopBar onMenu={() => setMenu(true)} />
      <Sidebar route={key} open={menu} onClose={() => setMenu(false)} />
      <main className="min-h-screen pt-14 lg:ml-[280px] lg:pt-0">
        <div key={key} className="route-in">{page}</div>
      </main>
      <BackToTop />
    </>
  );
}
