import { useEffect, useState } from "react";
import { CONTENT } from "../data/content.js";
import { Icon, icons } from "../components/Icon.jsx";
import { Page } from "../components/layout/Page.jsx";
import { PageHeader, SectionHeading } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { pad } from "../lib/format.js";

const { motivation, changes } = CONTENT.redesign;
const src = path => `${import.meta.env.BASE_URL}${path}`;

// Each change has its own address, e.g. #redesign/change-2, which opens this page scrolled to that change.
const changeHash = i => `redesign/change-${i + 1}`;
const changeId = i => `redesign-change-${i + 1}`;

// Copies the full link to one change, then shows "Copied" for a moment.
function CopyLink({ i }){
  const [done, setDone] = useState(false);
  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${changeHash(i)}`;
    try { await navigator.clipboard.writeText(url); }
    catch { window.location.hash = changeHash(i); } // clipboard blocked: put the link in the address bar instead
    history.replaceState(null, "", `#${changeHash(i)}`);
    setDone(true); setTimeout(() => setDone(false), 1800);
  };
  return (
    <button onClick={copy} title="Copy a link to this change"
      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold text-sub transition-colors duration-200 ease-out hover:border-accent hover:text-accent">
      <Icon d={done ? icons.check : icons.link} className="h-[13px] w-[13px]" />{done ? "Copied" : "Copy link"}
    </button>
  );
}

// Opens the page at the change named in the address (#redesign/change-N), on arrival and when the address changes.
function useChangeLink(){
  useEffect(() => {
    let timer;
    const go = () => {
      const m = window.location.hash.match(/\/change-(\d+)$/);
      const el = m && document.getElementById(`redesign-change-${m[1]}`);
      // Wait for the page's fade-in so the jump lands on the change heading.
      if (el) { clearTimeout(timer); timer = setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 450); }
    };
    go();
    window.addEventListener("hashchange", go);
    return () => { clearTimeout(timer); window.removeEventListener("hashchange", go); };
  }, []);
}

function Change({ c, i }){
  return (
    <Reveal>
      <article id={changeId(i)} className="scroll-mt-6 border-t border-line pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <div>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-accent">{pad(i + 1)}</span>
              <CopyLink i={i} />
            </div>
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
  useChangeLink();
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
