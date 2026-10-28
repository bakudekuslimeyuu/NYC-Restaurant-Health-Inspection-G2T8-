import { Icon, icons } from "./Icon.jsx";

export function Pill({ href, primary, children }){
  return (
    <a href={href} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-medium transition duration-200 ease-out ${
      primary ? "bg-coral text-white hover:opacity-90" : "border border-line text-ink hover:border-coral hover:text-coral"}`}>
      {children}{primary && <Icon d={icons.arrow} className="h-4 w-4" />}
    </a>
  );
}
