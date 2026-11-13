import { useState } from "react";
import { Icon, icons } from "../Icon.jsx";
import { CONTENT } from "../../data/content.js";
import { pad } from "../../lib/format.js";

// Width of the sidebar on large screens, open and collapsed (App.jsx uses the same values for the page margin).
export const SIDEBAR_OPEN = "lg:ml-[280px]", SIDEBAR_SHUT = "lg:ml-[76px]";

const itemClass = (active, shut) => `relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] transition-colors duration-200 ease-out ${
  shut ? "lg:justify-center" : ""} ${active ? "bg-sideactive font-medium text-accent" : "text-white/70 hover:bg-sideactive/60 hover:text-white"}`;

// Labels are hidden on large screens while the sidebar is collapsed; the phone menu always shows them.
const labelClass = shut => (shut ? "lg:hidden" : "");

function NavLink({ to, icon, label, route, onClose, shut }){
  const active = route === to;
  return (
    <a href={`#${to}`} onClick={onClose} title={shut ? label : undefined} className={itemClass(active, shut)}>
      {active && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-accent" />}
      <Icon d={icon} /><span className={labelClass(shut)}>{label}</span>
    </a>
  );
}

export function Sidebar({ route, open, onClose, collapsed, onToggle }){
  const [dashOpen, setDashOpen] = useState(true);
  const inDash = route.startsWith("dash-");
  const shut = collapsed;
  const link = { route, onClose, shut };
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-sideline bg-side text-white transition-[transform,width] duration-300 ease-out lg:translate-x-0 ${
        shut ? "lg:w-[76px]" : ""} ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Collapse / expand, large screens only */}
        <div className={`hidden px-6 pt-5 lg:flex ${shut ? "lg:justify-center lg:px-3" : "justify-end"}`}>
          <button onClick={onToggle} aria-label={shut ? "Expand sidebar" : "Collapse sidebar"} title={shut ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-lg p-2 text-white/60 transition-colors duration-200 ease-out hover:bg-sideactive hover:text-white">
            <Icon d={icons.panel} className="h-[18px] w-[18px]" />
          </button>
        </div>
        <nav className={`flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-6 lg:pt-3 ${shut ? "lg:px-3" : ""}`}>
          <NavLink to="home" icon={icons.home} label="Home" {...link} />
          <NavLink to="problem" icon={icons.info} label="Problem Statement" {...link} />
          <NavLink to="overview" icon={icons.doc} label="Overview" {...link} />
          <div>
            <button onClick={() => setDashOpen(!dashOpen)} aria-expanded={dashOpen} title={shut ? "Dashboards" : undefined}
              className={itemClass(false, shut) + (inDash ? " !text-accent" : "")}>
              <Icon d={icons.chart} /><span className={`flex-1 text-left ${labelClass(shut)}`}>Dashboards</span>
              <span className={`transition-transform duration-300 ease-out ${dashOpen ? "rotate-180" : ""} ${labelClass(shut)}`}><Icon d={icons.chev} className="h-4 w-4" /></span>
            </button>
            {dashOpen && (
              <div className={`mt-1 space-y-0.5 ${shut ? "ml-4 border-l border-sideline pl-4 lg:ml-0 lg:border-0 lg:pl-0" : "ml-4 border-l border-sideline pl-4"}`}>
                {CONTENT.dashboards.map(d => (
                  <a key={d.n} href={`#dash-${d.n}`} onClick={onClose} title={shut ? `${pad(d.n)} · ${d.nav}` : undefined}
                    className={`flex items-center gap-3 rounded-lg p-2 text-[13px] transition-colors duration-200 ease-out ${shut ? "lg:justify-center" : ""} ${
                      route === `dash-${d.n}` ? "bg-sideactive text-accent" : "text-white/60 hover:text-white"}`}>
                    <span className={`font-mono text-[10px] ${shut ? "opacity-60 lg:text-[11px] lg:opacity-100" : "opacity-60"}`}>{pad(d.n)}</span>
                    <span className={labelClass(shut)}>{d.nav}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
          <NavLink to="redesign" icon={icons.spark} label="Redesign Proposal" {...link} />
        </nav>
        <div className={`border-t border-sideline p-6 ${shut ? "lg:hidden" : ""}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Data</p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/60">{CONTENT.dataNote}</p>
        </div>
      </aside>
    </>
  );
}
