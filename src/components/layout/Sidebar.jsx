import { useState } from "react";
import { Icon, icons } from "../Icon.jsx";
import { CONTENT } from "../../data/content.js";
import { pad } from "../../lib/format.js";

const itemClass = active => `relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition-colors duration-200 ease-out ${
  active ? "bg-sideactive font-medium text-accent" : "text-white/70 hover:bg-sideactive/60 hover:text-white"}`;

function NavLink({ to, icon, label, route, onClose }){
  const active = route === to;
  return (
    <a href={`#${to}`} onClick={onClose} className={itemClass(active)}>
      {active && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent" />}
      <Icon d={icon} /><span>{label}</span>
    </a>
  );
}

export function Sidebar({ route, open, onClose }){
  const [dashOpen, setDashOpen] = useState(true);
  const inDash = route.startsWith("dash-");
  const link = { route, onClose };
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-sideline bg-side text-white transition-transform duration-300 ease-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <nav className="flex-1 space-y-1 overflow-y-auto p-6">
          <NavLink to="home" icon={icons.home} label="Home" {...link} />
          <NavLink to="problem" icon={icons.info} label="Problem Statement" {...link} />
          <NavLink to="overview" icon={icons.doc} label="Overview" {...link} />
          <div>
            <button onClick={() => setDashOpen(!dashOpen)} aria-expanded={dashOpen} className={itemClass(false) + (inDash ? " !text-accent" : "")}>
              <Icon d={icons.chart} /><span className="flex-1 text-left">Dashboards</span>
              <span className={`transition-transform duration-300 ease-out ${dashOpen ? "rotate-180" : ""}`}><Icon d={icons.chev} className="h-4 w-4" /></span>
            </button>
            {dashOpen && (
              <div className="ml-4 mt-1 space-y-0.5 border-l border-sideline pl-4">
                {CONTENT.dashboards.map(d => (
                  <a key={d.n} href={`#dash-${d.n}`} onClick={onClose}
                    className={`flex items-center gap-3 rounded-lg p-2 text-[13px] transition-colors duration-200 ease-out ${route === `dash-${d.n}` ? "bg-sideactive text-accent" : "text-white/60 hover:text-white"}`}>
                    <span className="font-mono text-[10px] opacity-60">{pad(d.n)}</span><span>{d.nav}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <NavLink to="redesign" icon={icons.spark} label="Redesign Proposal" {...link} />
        </nav>
        <div className="border-t border-sideline p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Data</p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/60">{CONTENT.dataNote}</p>
        </div>
      </aside>
    </>
  );
}
