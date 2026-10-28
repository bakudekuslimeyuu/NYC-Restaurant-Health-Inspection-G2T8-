import { Icon, icons } from "../Icon.jsx";
import { CONTENT } from "../../data/content.js";

// Mobile-only bar with the menu button; the sidebar is fixed on large screens.
export function TopBar({ onMenu }){
  return (
    <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white px-4 lg:hidden">
      <button onClick={onMenu} aria-label="Open menu" className="rounded-lg p-2 text-ink hover:bg-band"><Icon d={icons.menu} className="h-5 w-5" /></button>
      <span className="text-[13px] font-semibold">{CONTENT.siteName}</span>
    </div>
  );
}
