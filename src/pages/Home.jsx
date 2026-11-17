import { CONTENT } from "../data/content.js";
import { useNameCycle } from "../hooks/useNameCycle.js";
import { Icon, icons } from "../components/Icon.jsx";

export function Home(){
  const name = useNameCycle(CONTENT.members);
  // Dark full-screen photo hero with a gradient shade.
  return (
    <section className="relative flex min-h-[calc(100vh-56px)] items-end overflow-hidden bg-side lg:min-h-screen">
      <img src={CONTENT.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-side via-side/80 to-side/25" />
      <div className="relative z-10 w-full px-6 pb-28 pt-28 sm:px-10 lg:px-14 lg:pb-28">
        <div className="max-w-4xl">
          <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px] lg:text-[52px] xl:text-[58px]">{CONTENT.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75 sm:text-[19px]">{CONTENT.heroSub}</p>
          <div className="mt-7 h-[3px] w-16 rounded-full bg-accent" />
          <p className="caret mt-8 min-h-[1.3em] text-[24px] font-semibold tracking-tight text-white sm:text-[30px]">{name}</p>
        </div>
      </div>
      {/* Button at the bottom of the cover: the only way on to the Introduction (no page changes on scroll) */}
      {/* Outlined pill with a → arrow (no bounce, which suggested scrolling); the arrow nudges right on hover. */}
      <a href="#introduction" className="group absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit items-center gap-2.5 rounded-full border border-white/50 px-5 py-2.5 text-white/85 transition-colors duration-200 ease-out hover:border-white hover:bg-white/10 hover:text-white">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Click me to continue</span>
        <Icon d={icons.arrow} className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
      </a>
    </section>
  );
}
