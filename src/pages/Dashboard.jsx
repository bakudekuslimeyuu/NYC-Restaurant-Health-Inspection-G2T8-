import { useState } from "react";
import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { Eyebrow, PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { TableauFrame } from "../components/TableauFrame.jsx";
import { InsightsAccordion } from "../components/InsightsAccordion.jsx";
import { pad } from "../lib/format.js";
import { Icon, icons } from "../components/Icon.jsx";

// Colours used in the Dashboard 3 charts, so text can name a colour in the same colour as the marks.
// grey is darker than the chart's light grey bars so it stays readable as text.
const CHART_COLOURS = { orange: "#E8590C", purple: "#5B3A8C", grey: "#7A7A7A" };

// Formatting for text from content.js: **text** becomes bold, {orange:text} / {purple:text} become bold text in that
// chart colour, and [[text]] becomes a link that scrolls smoothly to the element with id `linkTo` on the same page
// (the hash isn't changed, so the page route stays put).
function rich(t, linkTo){
  return t.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\{(?:orange|purple|grey):[^}]+\})/).map((part, k) => {
    const colour = part.match(/^\{(orange|purple|grey):([^}]+)\}$/);
    if (colour) return <b key={k} className="font-semibold" style={{ color: CHART_COLOURS[colour[1]] }}>{colour[2]}</b>;
    if (part.startsWith("**") && part.endsWith("**")) return <b key={k} className="font-semibold text-ink">{part.slice(2, -2)}</b>;    if (part.startsWith("[[") && part.endsWith("]]")) return (
      <a key={k} href={`#${linkTo}`} onClick={e => { e.preventDefault(); document.getElementById(linkTo)?.scrollIntoView({ behavior: "smooth" }); }}
        className="font-semibold text-accent underline-offset-4 hover:underline">{part.slice(2, -2)}</a>
    );
    return part;
  });
}

// Shared wording for every dashboard page. [[…]] links to the walkthrough section (see rich()).
// A dashboard can override either with `overviewIntro` / `walkthroughIntro` in content.js.
const OVERVIEW_TEXT = "The dashboard brings all the charts together to give a broad answer to our question. After this, in the [[Visualisation walkthrough]], we go through each chart in turn, with instructions on how to use it and what it shows.";
const WALKTHROUGH_TEXT = "We go through each chart from the dashboard one at a time, explaining how to read it and what it shows.";

// One half of the previous/next bar: a round teal arrow (same style as the walkthrough's "Next" button) beside the label and page title.
function PageNav({ href, label, title, right }){
  return (
    <a href={href} className={`group flex items-center gap-4 p-5 transition-colors duration-200 ease-out hover:bg-band sm:p-6 ${right ? "flex-row-reverse text-right" : ""}`}>
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform duration-200 ease-out ${right ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"}`}>
        <Icon d={icons.arrow} className={`h-[18px] w-[18px] ${right ? "" : "rotate-180"}`} />
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sub">{label}</span>
        <span className="mt-1 text-[15px] font-semibold text-ink group-hover:text-accent">{title}</span>
      </span>
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
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">{s.chart}</p>
                  <h3 className="mt-1 text-[21px] font-bold leading-snug sm:text-[24px]">{s.question}</h3>
                </div>
              </div>
              {/* One card, read top to bottom: how to read the chart → the chart → what we found. */}
              <figure className="m-0 mt-5 overflow-hidden rounded-2xl border border-line bg-white">
                <div className="border-b border-line px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">How to read</p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13.5px] leading-[1.6] text-sub">
                    {s.howToRead.map((t, j) => <li key={j}>{rich(t)}</li>)}
                  </ul>
                </div>
                <TableauFrame bare plain lazy n={d.n} views={[{ label: s.chart, url: s.url, height: s.height }]} source={d.source} />
                <div className="border-t border-line bg-band px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">What we found</p>
                  <p className="mt-1.5 text-[14.5px] font-semibold leading-[1.6]">{rich(s.found)}</p>
                  {s.note && <p className="mt-2 text-[12.5px] leading-[1.55] text-sub">{rich(s.note)}</p>}
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
      <Reveal className="mt-12">
        <div className="rounded-2xl border-l-4 border-accent bg-band p-7 sm:p-8">
          <Eyebrow>Takeaway</Eyebrow>
          <p className="mt-3 text-[18px] font-semibold leading-snug sm:text-[20px]">{d.takeaway}</p>
        </div>
      </Reveal>
      {/* Previous / next pages in one outlined bar, split by a divider (vertical on wider screens, horizontal on phones). */}
      <div className="mt-12 grid divide-y-2 divide-accent/30 overflow-hidden rounded-2xl border-2 border-accent/40 bg-white sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
        {prev ? <PageNav href={`#dash-${prev.n}`} label="Previous" title={`${pad(prev.n)} · ${prev.nav}`} /> : <PageNav href="#overview" label="Previous" title="Overview" />}
        {next ? <PageNav right href={`#dash-${next.n}`} label="Next" title={`${pad(next.n)} · ${next.nav}`} /> : <PageNav right href="#redesign" label="Next" title="Redesign Proposal" />}
      </div>
    </Page>
  );
}
