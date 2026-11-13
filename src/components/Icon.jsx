// Line icons, 1.75 stroke.
export function Icon({ d, className = "h-[17px] w-[17px]" }){
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">{d}</svg>
  );
}

export const icons = {
  home: <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></>,
  doc: <><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></>,
  chart: <><path d="M3 3v18h18"/><path d="M8 17v-3M12 17V9M16 17v-6M20 17V7"/></>,
  spark: <><path d="M11 6.5 12.2 10l3.3 1.2L12.2 12.4 11 16l-1.2-3.6-3.3-1.2L9.8 10z"/><path d="M18 3v4M16 5h4M19 15v3M17.5 16.5h3"/></>,
  chev: <path d="m6 9 6 6 6-6"/>,
  up: <path d="M12 19V5M5 12l7-7 7 7"/>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  close: <path d="M6 6l12 12M18 6 6 18"/>,
  panel: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></>,
  alert: <><path d="M12 3 2 21h20z"/><path d="M12 10v4M12 17h.01"/></>,
  fork: <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>,
  store: <><path d="M3 9l1.5-5h15L21 9M3 9h18v2a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8M10 21v-4h4v4"/></>,
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>,
  bank: <path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>
};
