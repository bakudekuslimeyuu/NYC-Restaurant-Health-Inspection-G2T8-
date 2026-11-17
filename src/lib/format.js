export const pad = n => String(n).padStart(2, "0");

// For cards that are not links: the border turns teal and the card lifts slightly, without suggesting a click.
export const cardGlow = "transition duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/90 hover:shadow-[0_10px_28px_-14px_rgba(22,24,29,0.22)]";

export const cardHover = "transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-14px_rgba(22,24,29,0.22)]";
