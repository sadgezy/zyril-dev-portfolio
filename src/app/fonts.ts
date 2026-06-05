import {
    Bangers as BangersFont,
    Caveat as CaveatFont,
    DM_Serif_Text,
    Funnel_Display,
    Imperial_Script,
    Indie_Flower,
    Luckiest_Guy,
    Monsieur_La_Doulaise,
    Montserrat as MontserratFont,
} from "next/font/google";

export const Bangers = BangersFont({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-bangers",
});
export const Caveat = CaveatFont({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-caveat",
});
export const DMSerifText = DM_Serif_Text({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-dmseriftext",
});
export const FunnelDisplay = Funnel_Display({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-funneldisplay",
});
export const ImperialScript = Imperial_Script({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-imperialscript",
});
export const IndieFlower = Indie_Flower({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-indieflower",
});
export const LuckiestGuy = Luckiest_Guy({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-luckiestguy",
});
export const MonsieurLaDoulaise = Monsieur_La_Doulaise({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-monsieurladoulaise",
});
export const Montserrat = MontserratFont({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-montserrat",
});

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
