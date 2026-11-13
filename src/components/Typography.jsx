export function Eyebrow({ children, className = "" }){
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] text-accent ${className}`}>{children}</p>;
}

export function Rule({ wide }){
  return <div className={`mt-3 h-[3px] rounded-full bg-accent ${wide ? "w-12" : "w-10"}`} />;
}

export function PageHeader({ eyebrow, title }){
  return (
    <header>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-2 text-[30px] font-bold leading-[1.12] tracking-tight sm:text-[38px]">{title}</h1>
      <div className="mt-4"><Rule wide /></div>
    </header>
  );
}

export function SectionHeading({ children, className = "" }){
  return (
    <div className={className}>
      <h2 className="text-[23px] font-bold leading-snug tracking-tight sm:text-[27px]">{children}</h2>
      <Rule />
    </div>
  );
}
