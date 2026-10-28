import { Page } from "../components/layout/Page.jsx";
import { Eyebrow, PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { StakeholderGrid } from "../components/StakeholderGrid.jsx";
import { cardHover, pad } from "../lib/format.js";

const problems = [
  ["The grade can be out of date", "The letter can come from an earlier inspection while a newer one is still unresolved."],
  ["The stars don’t track hygiene", "Ratings describe food, price and service. Reviewers never see the kitchen."],
  ["The record is buried", "Online, the health score sits under Amenities, in legal wording, and is missing from search."]
];

export function Overview(){
  return (
    <Page>
      <PageHeader eyebrow="Overview" title="Diners can’t tell if a kitchen is safe at the moment they choose." />
      <p className="mt-6 max-w-3xl text-[16.5px] leading-[1.75] text-sub">New York inspects every restaurant and publishes the results. But the two signals a diner sees — <b className="font-semibold text-ink">the letter on the door</b> and <b className="font-semibold text-ink">the stars on Yelp</b> — don’t reliably reflect what inspectors found. The record exists. It doesn’t reach the diner in a form they can use.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {problems.map(([t, d], i) => (
          <Reveal key={t} delay={i * 80}>
            <div className={`h-full rounded-2xl border border-line bg-white p-6 ${cardHover}`}>
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <h3 className="mt-3 text-[18px] font-bold leading-snug">{t}</h3>
              <p className="mt-2 text-[15px] leading-[1.75] text-sub">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6">
        <div className="rounded-2xl border-l-4 border-accent bg-band p-7 sm:p-9">
          <Eyebrow>The question we ask</Eyebrow>
          <p className="mt-3 text-[19px] font-semibold leading-snug sm:text-[22px]">Can a diner judge a restaurant’s food safety from what they see today — and if not, how should it be shown?</p>
        </div>
      </Reveal>
      <Reveal className="mt-16">
        <section className="rounded-2xl bg-band px-6 py-10 sm:px-10">
          <SectionHeading>Who does it matter to?</SectionHeading>
          <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-sub">Three groups have something at stake in how New York shows inspection results.</p>
          <StakeholderGrid />
        </section>
      </Reveal>
    </Page>
  );
}
