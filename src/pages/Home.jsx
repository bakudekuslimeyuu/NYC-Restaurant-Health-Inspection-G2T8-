import { CONTENT } from "../data/content.js";
import { useNameCycle } from "../hooks/useNameCycle.js";

export function Home(){
  const name = useNameCycle(CONTENT.members);
  // Dark full-screen photo hero with a gradient shade.
  return (
    <section className="relative flex min-h-[calc(100vh-56px)] items-end overflow-hidden bg-side lg:min-h-screen">
      <img src={CONTENT.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-side via-side/80 to-side/25" />
      <div className="relative z-10 w-full px-6 pb-16 pt-28 sm:px-10 lg:px-14 lg:pb-20">
        <div className="max-w-4xl">
          <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[44px] lg:text-[52px] xl:text-[58px]">{CONTENT.heroTitle}</h1>
          <div className="mt-7 h-[3px] w-16 rounded-full bg-coral" />
          <p className="caret mt-8 min-h-[1.3em] text-[24px] font-semibold tracking-tight text-white sm:text-[30px]">{name}</p>
        </div>
      </div>
    </section>
  );
}
