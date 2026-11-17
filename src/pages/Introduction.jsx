import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { rich } from "../lib/rich.jsx";
import { cardGlow } from "../lib/format.js";

// Introduction: why food safety matters in NYC → the two signals diners use → how we answer the question → what earlier studies found and what we add.
// All text lives in CONTENT.introduction (content.js).
export function Introduction(){
  const p = CONTENT.introduction;
  return (
    <Page>
      <PageHeader eyebrow="Introduction" title={p.title} />
      <div className="mt-7 space-y-4 text-[17.5px] leading-[1.75] text-sub">
        {p.intro.map((t, k) => <Reveal key={k}><p>{rich(t)}</p></Reveal>)}
      </div>

      {/* The two signals diners use, side by side (stacked on phones). */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {p.signals.map((s, k) => (
          <Reveal key={s.t} delay={k * 80}>
            <div className={`h-full rounded-2xl border border-line bg-white px-6 py-6 ${cardGlow}`}>
              <span className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-accent">Signal {k + 1}</span>
              <h3 className="mt-2 text-[23px] font-bold leading-snug">{s.t}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-sub">{s.offers}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="rounded-2xl bg-band p-7 sm:p-9">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-accent">How we test these signals</p>
          <p className="mt-3 text-[17.5px] leading-[1.75] text-sub">{p.approach}</p>
        </div>
      </Reveal>

      <section className="mt-16">
        <SectionHeading>What earlier studies found</SectionHeading>
        <div className="mt-7 space-y-4">
          {p.prior.map(x => (
            <Reveal key={x.who}>
              <div className={`rounded-2xl border border-line bg-white p-6 ${cardGlow}`}>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">{x.who}</p>
                <p className="mt-2 text-[16.5px] leading-[1.75] text-sub">{x.found}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Same card style as "What earlier studies found". */}
      <section className="mt-16">
        <SectionHeading>What this project adds</SectionHeading>
        <div className="mt-7 space-y-4">
          {p.adds.map(x => (
            <Reveal key={x.t}>
              <div className={`rounded-2xl border border-line bg-white p-6 ${cardGlow}`}>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-accent">{x.t}</p>
                <p className="mt-2 text-[16.5px] leading-[1.75] text-sub">{x.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}
