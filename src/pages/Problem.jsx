import { Page } from "../components/layout/Page.jsx";
import { PageHeader } from "../components/Typography.jsx";
import { Reveal } from "../components/Reveal.jsx";
import { Pill } from "../components/Pill.jsx";

export function Problem(){
  return (
    <Page>
      <PageHeader eyebrow="Problem Statement" title="Two signals, and a blind spot between them." />
      <div className="mt-7 space-y-6 text-[16.5px] leading-[1.75] text-sub">
        <Reveal><p>Every diner in New York judges a restaurant twice. Once at the door, where the Department of Health posts a <b className="font-semibold text-ink">letter grade</b>. Once on a phone, where <b className="font-semibold text-ink">Yelp shows a star rating</b>. Both look like an answer. Neither is the whole record.</p></Reveal>
        <Reveal><p>The letter is the end of a long process — inspection, score, re-inspection, letter. The stars are the end of a different one: a diner’s evening, compressed into one to five. Different people produce them, for different reasons, in different places.</p></Reveal>
        <Reveal><p>Between them sits a blind spot. The <b className="font-semibold text-ink">DOHMH record is precise but buried</b>. Yelp is <b className="font-semibold text-ink">read by millions but was never built to carry public health information</b>: the health score sits under Amenities, an old grade can lead the page, and nothing tells a diner that anything changed.</p></Reveal>
      </div>
      <Reveal className="mt-14">
        <blockquote className="m-0 rounded-2xl border-l-4 border-accent bg-band p-7 sm:p-9">
          <p className="text-[19px] font-semibold leading-snug sm:text-[23px]">A diner is left with two numbers that feel authoritative. Neither was built to answer the question they are asking: is this kitchen safe?</p>
        </blockquote>
      </Reveal>
      <div className="mt-12 flex flex-wrap gap-3"><Pill href="#overview" primary>Overview</Pill><Pill href="#dash-1">Start with Dashboard 01</Pill></div>
    </Page>
  );
}
