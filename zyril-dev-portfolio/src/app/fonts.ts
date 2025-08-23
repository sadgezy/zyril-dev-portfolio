import localFont from "next/font/local";

export const Bangers = localFont({ src: "../fonts/Bangers-Regular.ttf", variable: "--font-bangers" });
export const Caveat = localFont({ src: "../fonts/Caveat-Regular.ttf", variable: "--font-caveat" });
export const DMSerifText = localFont({ src: "../fonts/DMSerifText-Regular.ttf", variable: "--font-dmseriftext" });
export const FunnelDisplay = localFont({ src: "../fonts/FunnelDisplay-VariableFont_wght.ttf", variable: "--font-funneldisplay" });
export const ImperialScript = localFont({ src: "../fonts/ImperialScript-Regular.ttf", variable: "--font-imperialscript" });
export const IndieFlower = localFont({ src: "../fonts/IndieFlower-Regular.ttf", variable: "--font-indieflower" });
export const LuckiestGuy = localFont({ src: "../fonts/LuckiestGuy-Regular.ttf", variable: "--font-luckiestguy" });
export const MonsieurLaDoulaise = localFont({ src: "../fonts/MonsieurLaDoulaise-Regular.ttf", variable: "--font-monsieurladoulaise" });
export const Montserrat = localFont({ src: "../fonts/Montserrat-VariableFont_wght.ttf", variable: "--font-montserrat" });

// Map for easy lookup
export const fontMap: Record<string, string> = {
  Bangers: "var(--font-bangers)",
  Caveat: "var(--font-caveat)",
  "DM Serif Text": "var(--font-dmseriftext)",
  "Funnel Display": "var(--font-funneldisplay)",
  "Imperial Script": "var(--font-imperialscript)",
  "Indie Flower": "var(--font-indieflower)",
  "Luckiest Guy": "var(--font-luckiestguy)",
  "Monsieur La Doulaise": "var(--font-monsieurladoulaise)",
  Montserrat: "var(--font-montserrat)",
};
