import { Icon, icons } from "./Icon.jsx";
import { Reveal } from "./Reveal.jsx";

const items = [
  [icons.fork, "Diners", "They choose by stars and have no practical way to see what an inspector found before they sit down."],
  [icons.chat, "Review platforms", "They already publish the record, just unclearly. The fix is a display change, not a new dataset."],
  [icons.bank, "Regulators", "Inspection findings only change behaviour if the people eating there actually see them."]
];

export function StakeholderGrid(){
  return (
    <div className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-3">
      {items.map(([ic, t, d], i) => (
        <Reveal key={t} delay={i * 80}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white"><Icon d={ic} className="h-5 w-5" /></span>
          <h3 className="mt-4 text-[16px] font-bold">{t}</h3>
          <p className="mt-2 text-[15px] leading-[1.75] text-sub">{d}</p>
        </Reveal>
      ))}
    </div>
  );
}
