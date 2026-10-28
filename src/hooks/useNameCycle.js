import { useEffect, useState } from "react";

// Types a name, holds it, erases it, then moves to the next one. Loops forever.
export function useNameCycle(names){
  const [out, setOut] = useState("");
  useEffect(() => {
    let idx = 0, len = 0, deleting = false, t;
    const tick = () => {
      const name = names[idx];
      if (!deleting){
        len++; setOut(name.slice(0, len));
        if (len === name.length){ deleting = true; t = setTimeout(tick, 1400); return; }
        t = setTimeout(tick, 85);
      } else {
        len--; setOut(name.slice(0, len));
        if (len === 0){ deleting = false; idx = (idx + 1) % names.length; t = setTimeout(tick, 350); return; }
        t = setTimeout(tick, 40);
      }
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [names]);
  return out;
}
