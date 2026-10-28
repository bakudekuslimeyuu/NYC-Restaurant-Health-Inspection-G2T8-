import { Icon, icons } from "./Icon.jsx";
import { Reveal } from "./Reveal.jsx";
import { cardHover } from "../lib/format.js";

// Before/after mock-up of a restaurant listing, used on the Redesign page.
const Stars = () => <span className="tracking-[2px] text-coral">★★★★½</span>;
const Label = ({ children, coral }) => <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${coral ? "text-coral" : "text-sub"}`}>{children}</p>;
export { Label as MockLabel };

function TodayCard(){
  return (
    <div className={`rounded-2xl border border-line bg-white p-7 ${cardHover}`}>
      <Label>Today</Label>
      <h3 className="mt-4 text-[20px] font-bold">Casa Verdiana</h3>
      <div className="mt-2 flex items-center gap-3 text-[14px] text-sub"><Stars />1,204 reviews</div>
      <p className="mt-1 text-[14px] text-sub">$$ · Italian · East Village</p>
      <div className="mt-5 border-t border-line pt-5 text-[14px] text-sub">
        <p className="font-semibold text-ink">Amenities</p>
        <p className="mt-1">Takeout · Delivery · Wi-Fi · Outdoor seating</p>
        <p className="mt-3 font-mono text-[11.5px]">Health score 12 · Grade A · Inspected 2023-05-14</p>
        <p className="mt-1 text-[13px] italic">[One long regulatory sentence per violation]</p>
      </div>
    </div>
  );
}

function ProposedCard(){
  return (
    <div className={`rounded-2xl border border-coral/40 bg-white p-7 ${cardHover}`}>
      <Label coral>Proposed</Label>
      <h3 className="mt-4 text-[20px] font-bold">Casa Verdiana</h3>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-[14px] text-sub">
        <Stars /><span className="font-mono text-[14px] font-medium text-ink">4.5</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-[15px] font-bold text-white">A</span>
        <span>Inspected <span className="font-mono text-[12.5px]">08 Aug 2026</span></span>
      </div>
      <p className="mt-1 text-[14px] text-sub">1,204 reviews · $$ · Italian · East Village</p>
      <div className="mt-5 flex gap-3 rounded-xl bg-band p-4 text-[14px] text-sub">
        <span className="mt-0.5 text-coral"><Icon d={icons.alert} className="h-4 w-4" /></span>
        <p><b className="font-semibold text-ink">Grade pending.</b> A newer inspection on <span className="font-mono text-[12.5px]">12 Oct 2026</span> is unresolved.</p>
      </div>
      <div className="mt-5">
        <Label>Latest findings</Label>
        <div className="mt-2 divide-y divide-line text-[14px]">
          <div className="flex items-center gap-3 py-2.5"><span className="w-[62px] shrink-0 rounded-full bg-coral py-0.5 text-center text-[10.5px] font-semibold uppercase tracking-wide text-white">Serious</span>Cold food stored too warm</div>
          <div className="flex items-center gap-3 py-2.5"><span className="w-[62px] shrink-0 rounded-full border border-line py-0.5 text-center text-[10.5px] font-semibold uppercase tracking-wide text-sub">Minor</span>Food-contact surface not clean</div>
        </div>
      </div>
      <div className="mt-5 text-[13.5px]">
        <p className="text-ink">Findings vs. similar Italian restaurants nearby</p>
        <div className="relative mt-2 h-2 rounded-full bg-band">
          <span className="absolute inset-y-0 left-0 w-[38%] rounded-full bg-coral" />
          <span className="absolute -top-1 left-[46%] h-4 w-0.5 bg-ink" />
        </div>
        <p className="mt-1.5 font-mono text-[11px] text-sub">2 findings · median 3</p>
      </div>
    </div>
  );
}

export function ListingMock(){
  return (
    <>
      <div className="mt-7 grid items-start gap-5 lg:grid-cols-2">
        <Reveal><TodayCard /></Reveal>
        <Reveal delay={100}><ProposedCard /></Reveal>
      </div>
      <p className="mt-3 font-mono text-[11px] text-sub">FIG. R1 — Illustrative mock-up. The restaurant is fictional.</p>
    </>
  );
}
