export type { TripAPI, Trip, TripStageAPI, TripStage, TripDayAPI, TripDay, PictureAPI, Picture, HideoutAPI, Hideout, ExtraAPI, Extra }

interface Trip {
    id: number;
    name: string;
    tripStages: Array<string>;
    extras: Array<string>;
    hideouts: Array<string>;
}

interface TripStage {
    id: number;
    name: string;
    lat: string;
    lng: string;
    trip: string;
    tripDays: Array<string>;
}

interface TripDay {
    id: number;
    name: string;
    date: string;
    startHideout: string;
    endHideout: string;
    tripStage: string;
    pictures: Array<string>;
}

interface Picture {
    id: number;
    name: string;
    shotTime: string;
    lat: string;
    lng: string;
    imageName: string;
    tripDay: string;
    extras: Array<string>;
}

interface Hideout {
    id: number;
    name: string;
    lat: string;
    lng: string;
    trip: string;
}

interface Extra {
    id: number;
    name: string;
    pictures: Array<string>;
    trip: string;
}

interface APIContext {
    '@context'?: string;
    '@id': string;
    '@type': string;
}

interface TripAPI extends Trip, APIContext {}
interface TripStageAPI extends TripStage, APIContext {}
interface TripDayAPI extends TripDay, APIContext {}
interface PictureAPI extends Picture, APIContext {}
interface HideoutAPI extends Hideout, APIContext {}
interface ExtraAPI extends Extra, APIContext {}