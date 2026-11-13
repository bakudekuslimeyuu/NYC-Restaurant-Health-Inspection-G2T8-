import { CONTENT } from "../data/content.js";
import { Page } from "../components/layout/Page.jsx";
import { PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { pad } from "../lib/format.js";

const { motivation, changes } = CONTENT.redesign;
const src = path => `${import.meta.env.BASE_URL}${path}`;

function Change({ c, i }){
  return (
    <Reveal>
      <article className="border-t border-line pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
            <h3 className="mt-2 text-[20px] font-bold leading-snug sm:text-[22px]">{c.t}</h3>
            <p className="mt-3 text-[15.5px] leading-[1.75] text-sub">{c.d}</p>
          </div>
          <div className="self-start rounded-2xl bg-band p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sub">Design principle</p>
            <p className="mt-2 text-[15px] font-semibold">{c.principle}</p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-sub">{c.why}</p>
            <p className="mt-3 font-mono text-[11px] text-sub">{c.refs}</p>
          </div>
        </div>
        <figure className="mt-7">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <img src={src(c.img)} alt={c.alt} loading="lazy" className="block h-auto w-full" />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] text-sub">FIG. R{i + 1} — Now on Yelp (left) and proposed (right).</figcaption>
        </figure>
      </article>
    </Reveal>
  );
}

export function Redesign(){
  return (
    <Page>
      <PageHeader eyebrow="Redesign Proposal" title="Suggestions to improve the readability of Yelp’s hygiene signals" />

      <Reveal className="mt-12">
        <section className="rounded-2xl bg-band px-6 py-10 sm:px-10">
          <SectionHeading>Motivation for change</SectionHeading>
          <p className="mt-6 text-[16px] leading-[1.75] text-sub">{motivation}</p>
        </section>
      </Reveal>

      <Reveal className="mt-16"><SectionHeading>The {changes.length} proposed changes</SectionHeading></Reveal>
      <div className="mt-8 space-y-14">
        {changes.map((c, i) => <Change key={c.t} c={c} i={i} />)}
      </div>
    </Page>
  );
}
