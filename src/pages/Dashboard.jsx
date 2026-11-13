import { useState } from "react";
import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { Eyebrow, PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { TableauFrame } from "../components/TableauFrame.jsx";
import { InsightsAccordion } from "../components/InsightsAccordion.jsx";
import { cardHover, pad } from "../lib/format.js";

function PageNav({ href, label, title, right }){
  return (
    <a href={href} className={`flex flex-col rounded-2xl border border-line bg-white p-5 ${cardHover} ${right ? "sm:items-end sm:text-right" : ""}`}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sub">{label}</span>
      <span className="mt-1.5 text-[15px] font-semibold">{title}</span>
    </a>
  );
}

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
function Walkthrough({ d }){
  return (
    <section className="mt-20">
      <SectionHeading>One chart at a time</SectionHeading>
      <p className="mt-5 text-[16px] leading-[1.75] text-sub">Each chart from the dashboard above, in order, with what to look for and what it shows.</p>
      <ol className="m-0 mt-10 list-none space-y-16 p-0">
        {d.steps.map((s, k) => (
          <li key={k} id={`d${d.n}-step-${k + 1}`} className="scroll-mt-24">
            <Reveal>
              <div className="flex items-start gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent font-mono text-[13px] font-semibold text-white">{k + 1}</span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">{s.chart}</p>
                  <h3 className="mt-1 text-[21px] font-bold leading-snug sm:text-[24px]">{s.question}</h3>
                </div>
              </div>
              <div className="mt-6">
                <TableauFrame plain lazy n={d.n} views={[{ label: s.chart, url: s.url, height: s.height }]} source={d.source}
                  caption={`FIG. ${pad(d.n)}.S${k + 1} — ${s.chart}`} />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-line bg-white p-5 sm:p-6">
                  <Eyebrow>How to read</Eyebrow>
                  <Bullets items={s.howToRead} />
                </div>
                <div className="rounded-xl border-l-4 border-accent bg-band p-5 sm:p-6">
                  <Eyebrow>What we found</Eyebrow>
                  <p className="mt-2 text-[16px] font-semibold leading-relaxed">{s.found}</p>
                  {s.note && <p className="mt-3 text-[13.5px] leading-relaxed text-sub">{s.note}</p>}
                </div>
              </div>
              {s.next && (
                <a href={`#d${d.n}-step-${k + 2}`} onClick={e => { e.preventDefault(); document.getElementById(`d${d.n}-step-${k + 2}`)?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group mt-6 flex items-start gap-2.5 text-[15.5px] font-medium leading-relaxed text-ink hover:text-accent">
                  <span className="mt-[1px] text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5">→</span>
                  <span>{s.next}</span>
                </a>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Dashboard({ d }){
  const i = CONTENT.dashboards.indexOf(d);
  const prev = CONTENT.dashboards[i - 1], next = CONTENT.dashboards[i + 1];
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
      <p className="mt-7 text-[16.5px] leading-[1.75] text-sub">{d.intro}</p>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">Source: {d.source}</p>
      {howToRead && <HowToRead h={howToRead} />}
      <Reveal className="mt-8"><TableauFrame n={d.n} question={d.question} views={d.views} source={d.source} onViewChange={setView} /></Reveal>
      <Reveal className="mt-16">
        <SectionHeading>Insights</SectionHeading>
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
      {d.steps?.length > 0 && <Walkthrough d={d} />}
      <Reveal className="mt-12">
        <div className="rounded-2xl border-l-4 border-accent bg-band p-7 sm:p-8">
          <Eyebrow>Takeaway</Eyebrow>
          <p className="mt-3 text-[18px] font-semibold leading-snug sm:text-[20px]">{d.takeaway}</p>
        </div>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {prev ? <PageNav href={`#dash-${prev.n}`} label="Previous" title={`${pad(prev.n)} · ${prev.nav}`} /> : <PageNav href="#overview" label="Previous" title="Overview" />}
        {next ? <PageNav right href={`#dash-${next.n}`} label="Next" title={`${pad(next.n)} · ${next.nav}`} /> : <PageNav right href="#redesign" label="Next" title="Redesign Proposal" />}
      </div>
    </Page>
  );
}
