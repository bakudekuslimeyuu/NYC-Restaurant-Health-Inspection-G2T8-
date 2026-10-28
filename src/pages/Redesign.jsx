import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { ListingMock, MockLabel } from "../components/ListingMock.jsx";
import { cardHover, pad } from "../lib/format.js";

const wrong = [
  ["The health score sits under Amenities.", "A public health fact filed next to parking and Wi-Fi."],
  ["The page can lead with an old grade.", "The first thing a diner reads may come from an earlier cycle."],
  ["It uses regulatory wording.", "Findings are written for enforcement, not for reading."]
];

export function Redesign(){
  return (
    <Page>
      <PageHeader eyebrow="Redesign Proposal" title="Show the record where diners are already looking." />
      <p className="mt-7 max-w-3xl text-[16.5px] leading-[1.75] text-sub">After a citation, ratings move about 0.02 and related complaints don’t rise. Nothing in the stars or reviews warns a diner. So the listing itself has to carry the inspection result — clearly, and without labelling any restaurant unsafe.</p>

      <Reveal className="mt-14">
        <section className="rounded-2xl bg-band px-6 py-10 sm:px-10">
          <SectionHeading>What is wrong today</SectionHeading>
          <div className="mt-7 grid gap-7 md:grid-cols-3">
            {wrong.map(([t, d]) => <div key={t}><h3 className="text-[16px] font-bold leading-snug">{t}</h3><p className="mt-2 text-[15px] leading-[1.75] text-sub">{d}</p></div>)}
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-16">
        <SectionHeading>Before and after</SectionHeading>
        <p className="mt-5 text-[16px] leading-[1.75] text-sub">Same restaurant, same day, same public data.</p>
      </Reveal>
      <ListingMock />

      <Reveal className="mt-16"><SectionHeading>The six changes</SectionHeading></Reveal>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        {CONTENT.changes.map((c, i) => (
          <Reveal key={c.t} delay={(i % 2) * 80}>
            <div className={`h-full rounded-2xl border border-line bg-white p-7 ${cardHover}`}>
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <h3 className="mt-3 text-[18px] font-bold leading-snug">{c.t}</h3>
              <p className="mt-2 text-[15px] leading-[1.75] text-sub">{c.d}</p>
              <div className="mt-6 border-t border-line pt-5">
                <MockLabel>Design principle</MockLabel>
                <p className="mt-2 text-[14.5px] font-semibold">{c.principle}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-sub">{c.why}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Page>
  );
}
