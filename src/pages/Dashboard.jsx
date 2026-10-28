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

export function Dashboard({ d }){
  const i = CONTENT.dashboards.indexOf(d);
  const prev = CONTENT.dashboards[i - 1], next = CONTENT.dashboards[i + 1];
  return (
    <Page>
      <PageHeader eyebrow={`${pad(d.n)} · ${d.owner}`} title={d.title} />
      <p className="mt-7 max-w-3xl text-[16.5px] leading-[1.75] text-sub">{d.intro}</p>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">Source: {d.source}</p>
      <Reveal className="mt-8"><TableauFrame n={d.n} question={d.question} views={d.views} source={d.source} /></Reveal>
      <Reveal className="mt-16">
        <SectionHeading>Insights</SectionHeading>
        <InsightsAccordion items={d.insights} />
      </Reveal>
      <Reveal className="mt-12">
        <div className="rounded-2xl border-l-4 border-coral bg-band p-7 sm:p-8">
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
