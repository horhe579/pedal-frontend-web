import type { EngineType } from "../enums/EngineType";
import type { Passions } from "../enums/Passions";
import type { TransmissionType } from "../enums/TransmissionType";

export interface CarDetails {
    email: string;
    engine: EngineType;
    horsepower: number;
    mileage: number;
    brand: string;
    model: string;
    passions: Passions[];
    pictureURLs: string[];
    transmission: TransmissionType;
    yearOfProduction: number;
}
