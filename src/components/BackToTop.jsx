import { useEffect, useState } from "react";
import { Icon, icons } from "./Icon.jsx";

export function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-[0_10px_24px_-8px_rgba(20,163,139,0.6)] transition duration-300 ease-out ${show ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}>
      <Icon d={icons.up} className="h-[18px] w-[18px]" />
    </button>
  );
}
