import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { StakeholderGrid } from "../components/StakeholderGrid.jsx";
import { Icon, icons } from "../components/Icon.jsx";
import { cardGlow, cardHover, pad } from "../lib/format.js";
import { rich } from "../lib/rich.jsx";

// Overview: the data → how it was built → the five parts of the analysis (linked) → who it matters to.
// All text lives in CONTENT.overview (content.js).
export function Overview(){
  const o = CONTENT.overview;
  return (
    <Page>
      <PageHeader eyebrow="Overview" title={o.title} />
      <p className="mt-7 text-[16.5px] leading-[1.75] text-sub">{rich(o.intro)}</p>

      <section className="mt-14">
        <SectionHeading>The data</SectionHeading>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {o.stats.map((s, k) => (
            <Reveal key={s.label} delay={k * 80}>
              <div className={`h-full rounded-2xl border border-line bg-white p-6 ${cardGlow}`}>
                <p className="font-mono text-[28px] font-semibold leading-none tracking-tight text-ink sm:text-[30px]">{s.n}</p>
                <p className="mt-2 text-[15px] font-semibold">{s.label}</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.6] text-sub">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {o.method.map((m, k) => (
            <Reveal key={m.t} delay={k * 80}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{pad(k + 1)} · {m.t}</p>
              <p className="mt-2 text-[15px] leading-[1.7] text-sub">{m.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="rounded-2xl bg-band px-6 py-5 text-[14.5px] leading-[1.7] text-sub">{o.methodNote}</p>
        </Reveal>
      </section>

      {/* The five parts, in order, each linking to its page. */}
      <section className="mt-16">
        <SectionHeading>How the analysis is structured</SectionHeading>
        <p className="mt-5 text-[16px] leading-[1.75] text-sub">{o.readNote}</p>
        <ol className="m-0 mt-7 list-none space-y-3 p-0">
          {o.steps.map((s, k) => (
            <Reveal key={s.href} delay={k * 60}>
              <li>
                <a href={s.href} className={`group flex items-center gap-5 rounded-2xl border border-line bg-white p-5 sm:p-6 ${cardHover}`}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-mono text-[13px] font-semibold text-white">{k + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-sub">{s.label}</span>
                    <span className="mt-1 block text-[16.5px] font-semibold leading-snug text-ink group-hover:text-accent">{s.q}</span>
                    <span className="mt-1.5 block text-[13px] text-sub">Data: {s.data}</span>
                  </span>
                  <Icon d={icons.arrow} className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <Reveal className="mt-16">
        <section className="rounded-2xl bg-band px-6 py-10 sm:px-10">
          <SectionHeading>Who it matters to</SectionHeading>
          <p className="mt-5 text-[16px] leading-[1.75] text-sub">Three groups have something at stake in how New York’s inspection results reach diners.</p>
          <StakeholderGrid items={o.stakeholders} />
        </section>
      </Reveal>
    </Page>
  );
}
