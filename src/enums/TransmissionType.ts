export const TransmissionType = {
    AUTOMATIC: "AUTOMATIC",
    MANUAL: "MANUAL",
} as const;

export type TransmissionType = typeof TransmissionType[keyof typeof TransmissionType];
