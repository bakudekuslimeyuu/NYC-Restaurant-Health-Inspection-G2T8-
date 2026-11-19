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

// Marker beside each section of the current dashboard: a ticked teal dot once passed, a teal ring for the one being read, a faint ring for the rest.
function SectionDot({ state }){
  if (state === "done") return (
    <span className="mt-[3px] grid h-[11px] w-[11px] shrink-0 place-items-center rounded-full bg-accent">
      <svg viewBox="0 0 10 10" className="h-[7px] w-[7px]" fill="none" stroke="#0A0B10" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2.2 5.2l1.9 1.9 3.7-4.2" /></svg>
    </span>
  );
  return <span className={`mt-[3px] grid h-[11px] w-[11px] shrink-0 place-items-center rounded-full border-[1.5px] ${state === "now" ? "border-accent" : "border-white/25"}`}>
    {state === "now" && <span className="h-[5px] w-[5px] rounded-full bg-accent" />}
  </span>;
}

export function Sidebar({ route, open, onClose, collapsed, onToggle, sections = [], current = 0, onJump }){
  const [dashOpen, setDashOpen] = useState(true);
  const inDash = route.startsWith("dash-") || route === "redesign";
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
            {/* An arrow pointing the way the sidebar will move: ">" to open it, "<" to collapse it. */}
            <Icon d={icons.chev} className={`h-[18px] w-[18px] transition-transform duration-300 ease-out ${shut ? "-rotate-90" : "rotate-90"}`} />
          </button>
        </div>
        <nav className={`flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-6 lg:pt-3 ${shut ? "lg:px-3" : ""}`}>
          <NavLink to="home" icon={icons.home} label="Home" {...link} />
          <NavLink to="introduction" icon={icons.info} label="Introduction" {...link} />
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
                  <div key={d.n}>
                  <a href={`#dash-${d.n}`} onClick={onClose} title={shut ? `${pad(d.n)} · ${d.nav}` : undefined}
                    className={`flex items-center gap-3 rounded-lg p-2 text-[13px] transition-colors duration-200 ease-out ${shut ? "lg:justify-center" : ""} ${
                      route === `dash-${d.n}` ? "bg-sideactive text-accent" : "text-white/60 hover:text-white"}`}>
                    <span className={`font-mono text-[10px] ${shut ? "opacity-60 lg:text-[11px] lg:opacity-100" : "opacity-60"}`}>{pad(d.n)}</span>
                    <span className={labelClass(shut)}>{d.nav}</span>
                  </a>
                  {/* Sections of the dashboard being read; hidden while the sidebar is collapsed. */}
                  {route === `dash-${d.n}` && sections.length > 0 && (
                    <ol aria-label="Sections on this page" className={`m-0 mb-1 ml-2 mt-0.5 list-none space-y-px p-0 ${shut ? "lg:hidden" : ""}`}>
                      {sections.map((s, i) => {
                        const state = i < current ? "done" : i === current ? "now" : "next";
                        return (
                          <li key={i}>
                            <button onClick={() => onJump?.(s)} aria-current={state === "now" ? "location" : undefined}
                              className={`flex w-full items-start gap-2.5 rounded-md px-2 py-1 text-left text-[12px] leading-snug transition-colors duration-200 ease-out ${
                                state === "now" ? "bg-sideactive text-white" : state === "done" ? "text-white/70 hover:text-white" : "text-white/45 hover:text-white"}`}>
                              <SectionDot state={state} /><span>{s.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  )}
                  </div>
                ))}
                {/* The redesign proposal follows the last dashboard, so it sits at the end of this group. */}
                <a href="#redesign" onClick={onClose} title={shut ? "Redesign Proposal" : undefined}
                  className={`flex items-center gap-3 rounded-lg p-2 text-[13px] transition-colors duration-200 ease-out ${shut ? "lg:justify-center" : ""} ${
                    route === "redesign" ? "bg-sideactive text-accent" : "text-white/60 hover:text-white"}`}>
                  <Icon d={icons.spark} className={`h-[14px] w-[14px] shrink-0 ${shut ? "opacity-60 lg:opacity-100" : "opacity-60"}`} />
                  <span className={labelClass(shut)}>Redesign Proposal</span>
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className={`border-t border-sideline p-6 ${shut ? "lg:hidden" : ""}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Data</p>
          <p className="mt-2 text-[12px] leading-relaxed text-white/60">{CONTENT.dataNote}</p>
        </div>
      </aside>
    </>
  );
}
