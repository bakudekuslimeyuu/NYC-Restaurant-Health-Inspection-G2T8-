import { Icon, icons } from "./Icon.jsx";
import { Reveal } from "./Reveal.jsx";

// items: [{ icon: name in icons, t: title, d: text }], from CONTENT.overview.stakeholders.
export function StakeholderGrid({ items }){
  return (
    <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-3">
      {items.map((x, i) => (
        <Reveal key={x.t} delay={i * 80}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white"><Icon d={icons[x.icon]} className="h-5 w-5" /></span>
          <h3 className="mt-4 text-[16px] font-bold">{x.t}</h3>
          <p className="mt-2 text-[15px] leading-[1.75] text-sub">{x.d}</p>
        </Reveal>
      ))}
    </div>
  );
}
