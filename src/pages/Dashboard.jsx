import { useEffect, useState } from "react";
import { Page } from "../components/layout/Page.jsx";
import { Eyebrow, PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { TableauFrame } from "../components/TableauFrame.jsx";
import { InsightsAccordion } from "../components/InsightsAccordion.jsx";
import { pad } from "../lib/format.js";
import { rich } from "../lib/rich.jsx";

// Shared wording for every dashboard page. [[…]] links to the walkthrough section (see rich()).
// A dashboard can override either with `overviewIntro` / `walkthroughIntro` in content.js.
const OVERVIEW_TEXT = "The dashboard brings all the charts together to give a broad answer to our question. After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.";
const WALKTHROUGH_TEXT = "We go through each chart from the dashboard one at a time, explaining how to read it and what it shows.";

function Bullets({ items }){
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-sub">
      {items.map((t, k) => <li key={k}>{t}</li>)}
    </ul>
  );
}

// "How to read" box. Takes either a plain list of notes, or
// { ask, charts:[{title, points}], notes?, note? } to give each chart in the view its own card.
function HowToRead({ h }){
  if (Array.isArray(h)) h = { notes: h };
  const notes = h.notes ?? (h.note ? [h.note] : null);
  return (
    <div className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-7">
      <Eyebrow>How to read</Eyebrow>
      {h.ask && <p className="mt-3 text-[16px] font-semibold leading-snug">This view asks: {h.ask}</p>}
      {h.charts && (
        <div className={`mt-4 grid gap-4 ${h.charts.length > 1 ? "md:grid-cols-2" : ""}`}>
          {h.charts.map((c, k) => (
            <div key={k} className="rounded-xl bg-band p-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">{c.title}</p>
              <Bullets items={c.points} />
            </div>
          ))}
        </div>
      )}
      {notes && <div className={h.charts ? "mt-3" : ""}><Bullets items={notes} /></div>}
    </div>
  );
}

// Switch between the insights for the chosen view and the insights for every view.
function ScopeToggle({ scope, setScope, viewLabel }){
  const opts = [["view", `This view: ${viewLabel}`], ["all", "All insights"]];
  return (
    <div className="mt-5 inline-flex flex-wrap gap-1.5 rounded-full border border-line bg-white p-1">
      {opts.map(([k, label]) => (
        <button key={k} onClick={() => setScope(k)} aria-pressed={scope === k}
          className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition duration-200 ease-out ${
            scope === k ? "bg-accent text-white" : "text-sub hover:text-ink"}`}>{label}</button>
      ))}
    </div>
  );
}

// One chart at a time, below the overview. Each step: question → chart → how to read | what we found → lead-in to the next step.
// Steps come from `steps` in content.js; a dashboard without them shows no walkthrough.
function HowToReadList({ items }){
  return <>
    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">How to read</p>
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15.5px] leading-relaxed text-sub">
      {items.map((t, j) => <li key={j}>{rich(t)}</li>)}
    </ul>
  </>;
}

function Walkthrough({ d }){
  return (
    <section id={`d${d.n}-walkthrough`} className="mt-20 scroll-mt-8">
      <SectionHeading>Visualisation walkthrough</SectionHeading>
      {/* Shared default for every dashboard's walkthrough; a dashboard can set `walkthroughIntro` in content.js to override it. */}
      <p className="mt-5 text-[16px] leading-[1.75] text-sub">{d.walkthroughIntro ?? WALKTHROUGH_TEXT}</p>
      <ol className="m-0 mt-10 list-none space-y-14 p-0">
        {d.steps.map((s, k) => (
          <li key={k} id={`d${d.n}-step-${k + 1}`} className="scroll-mt-6">
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-mono text-[13px] font-semibold text-white">{k + 1}</span>
                {/* The question is the step's heading; the chart's short name (s.chart) is kept for the frame's label only. */}
                <h3 className="mt-0.5 text-[21px] font-bold leading-snug sm:text-[24px]">{s.question}</h3>
              </div>
              {/* One card, read top to bottom: how to read the chart → the chart → what we found.
                  With `howToReadBelow` on the dashboard, the chart comes first and how to read sits beside what we found. */}
              <figure className="m-0 mt-5 overflow-hidden rounded-2xl border border-line bg-white">
                {!d.howToReadBelow && (
                  <div className="border-b border-line px-5 py-4 sm:px-6"><HowToReadList items={s.howToRead} /></div>
                )}
                <TableauFrame bare plain lazy n={d.n} views={[{ label: s.chart, url: s.url, height: s.height }]} source={d.source} />
                <div className={`border-t border-line bg-band px-5 py-4 sm:px-6 ${d.howToReadBelow ? "grid gap-6 md:grid-cols-[2fr_3fr]" : ""}`}>
                  {d.howToReadBelow && (
                    <div className="md:border-r md:border-line md:pr-6"><HowToReadList items={s.howToRead} /></div>
                  )}
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">What we found</p>
                    {/* found can be one paragraph (a string) or several (a list of strings) */}
                    {[].concat(s.found).map((t, j) => <p key={j} className={`${j ? "mt-3" : "mt-1.5"} text-[15.5px] font-semibold leading-relaxed`}>{rich(t)}</p>)}
                    {s.note && <p className="mt-2 text-[12.5px] leading-[1.55] text-sub">{rich(s.note)}</p>}
                  </div>
                </div>
              </figure>
              {/* Lead-in to the next chart: one box holding the reasoning, with "Next: …" and an arrow at the bottom right.
                  Only the teal "Next: …" text and arrow are clickable; they scroll to the next chart's heading. */}
              {s.next && d.steps[k + 1] && (
                <div className="mt-6 rounded-2xl border border-line bg-white px-5 py-5 sm:px-6">
                  <p className="text-[15.5px] leading-relaxed text-sub">{rich(s.next)}</p>
                  <div className="mt-4 flex justify-end">
                    <a href={`#d${d.n}-step-${k + 2}`} onClick={e => { e.preventDefault(); document.getElementById(`d${d.n}-step-${k + 2}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      className="group inline-flex items-center gap-2.5 text-right text-[14px] font-semibold text-accent">
                      <span className="group-hover:underline group-hover:underline-offset-4">Next: {d.steps[k + 1].question}</span>
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-200 ease-out group-hover:translate-y-0.5">↓</span>
                    </a>
                  </div>
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Links such as #dash-3/step-2 (e.g. from the report's figures) open this page at that walkthrough step.
// Runs on arrival and whenever the step part of the address changes while already on the page.
function useStepLink(n){
  useEffect(() => {
    let timer;
    const go = () => {
      const m = window.location.hash.match(/\/step-(\d+)$/);
      const el = m && document.getElementById(`d${n}-step-${m[1]}`);
      // Wait for the page's fade-in so the jump lands on the step heading.
      if (el) { clearTimeout(timer); timer = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 450); }
    };
    go();
    window.addEventListener("hashchange", go);
    return () => { clearTimeout(timer); window.removeEventListener("hashchange", go); };
  }, [n]);
}

export function Dashboard({ d }){
  useStepLink(d.n);
  const [view, setView] = useState(0);
  const [scope, setScope] = useState("view");
  // A view can carry its own insights; otherwise the dashboard's insights are shown.
  const insights = d.views[view]?.insights ?? d.insights;
  // When every view has its own insights, readers can also see all of them at once, grouped by view.
  const perView = d.views.length > 1 && d.views.every(v => v.insights);
  // Optional "How to read" notes, per view or for the whole dashboard; the box is hidden when there are none.
  const howToRead = d.views[view]?.howToRead ?? d.howToRead;
  return (
    <Page>
      <PageHeader eyebrow={`Dashboard ${pad(d.n)}`} title={d.title} />
      {/* intro can be one paragraph (a string) or several (a list of strings) */}
      <div className="mt-7 space-y-4 text-[16.5px] leading-[1.75] text-sub">
        {[].concat(d.intro).map((t, k) => <p key={k}>{rich(t)}</p>)}
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">Source: {d.source}</p>
      {/* Every dashboard page: "Dashboard overview" above the frame, paired with "Visualisation walkthrough" further down. */}
      <section className="mt-16">
        <SectionHeading>Dashboard overview</SectionHeading>
        <p className="mt-5 text-[16px] leading-[1.75] text-sub">{rich(d.overviewIntro ?? OVERVIEW_TEXT, `d${d.n}-walkthrough`)}</p>
      </section>
      {howToRead && <HowToRead h={howToRead} />}
      <Reveal className="mt-8"><TableauFrame n={d.n} question={d.question} views={d.views} source={d.source} onViewChange={setView} /></Reveal>
      {/* Dashboards without walkthrough steps show their insights under the "Visualisation walkthrough" heading.
          Dashboard 3 has steps, so its findings sit in the step-by-step walkthrough instead. */}
      {!(d.steps?.length > 0) && insights?.length > 0 && (
        <Reveal className="mt-16">
          <section id={`d${d.n}-walkthrough`} className="scroll-mt-8">
            <SectionHeading>Visualisation walkthrough</SectionHeading>
            <p className="mt-5 text-[16px] leading-[1.75] text-sub">{d.walkthroughIntro ?? WALKTHROUGH_TEXT}</p>
          </section>
          {perView && <ScopeToggle scope={scope} setScope={setScope} viewLabel={d.views[view].label} />}
          {perView && scope === "all"
            ? d.views.map((v, k) => (
                <div key={k} className="mt-8">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-sub">{pad(k + 1)} · {v.label}</p>
                  <InsightsAccordion items={v.insights} />
                </div>
              ))
            : <InsightsAccordion key={view} items={insights} />}
        </Reveal>
      )}
      {d.steps?.length > 0 && <Walkthrough d={d} />}
      {/* Summary (the `takeaway` field in content.js): a quiet panel with a faint teal tint and thin teal border, so it reads as the page's conclusion
          without a heavy side bar or dark block. */}
      <Reveal className="mt-14">
        <section aria-label="Summary" className="rounded-2xl border border-accent/30 bg-accent/[0.05] p-7 sm:p-9">
          <Eyebrow>Summary</Eyebrow>
          <p className="mt-4 text-[18px] font-semibold leading-[1.55] text-ink sm:text-[20px]">{d.takeaway}</p>
        </section>
      </Reveal>
    </Page>
  );
}
