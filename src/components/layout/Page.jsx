import { PageNavBar } from "./PageNavBar.jsx";

// Every page ends with the same previous/next bar, so moving between pages works the same way everywhere.
export function Page({ children }){
  return <div className="mx-auto max-w-[1100px] px-6 pb-24 pt-16 sm:px-10 lg:px-14 lg:pt-20">{children}<PageNavBar /></div>;
}
