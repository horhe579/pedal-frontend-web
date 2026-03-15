export const EngineType = {
    PETROL: "PETROL",
    DIESEL: "DIESEL",
    ELECTRIC: "ELECTRIC",
    HYBRID: "HYBRID",
    PLUGIN_HYBRID: "PLUGIN_HYBRID"
} as const;

export type EngineType = typeof EngineType[keyof typeof EngineType];
