export const CarCulture = {
    STANCE: "STANCE",
    JDM: "JDM",
    WIDEBODY: "WIDEBODY",
    LUXURY: "LUXURY",
    EDM: "EDM",
    CLASSIC: "CLASSIC",
    MUSCLE: "MUSCLE",
    TUNED: "TUNED",
    EXOTIC: "EXOTIC",
    HOT_ROD: "HOT_ROD",
    RAT_ROD: "RAT_ROD",
    LOWRIDER: "LOWRIDER",
    VIP: "VIP",
    SLEEPER: "SLEEPER",
    SHOW: "SHOW",
    RACE: "RACE",
    CUSTOM: "CUSTOM"
} as const;

export type CarCulture = typeof CarCulture[keyof typeof CarCulture];
