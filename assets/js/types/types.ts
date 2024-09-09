export type { TripAPI, Trip, TripStageAPI, TripStage, TripDayAPI, TripDay, PictureAPI, Picture, Hideout, Extra }


interface TripAPI {
    '@context'?: string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    tripStages: Array<string>,
    extras: Array<string>
}

interface Trip {
    id: number,
    name: string,
    tripStages: Array<string>,
    extras: Array<string>
}

interface TripStageAPI {
    '@context'?: string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    lat: string,
    lng: string,
    trip: string,
    tripDays: Array<string>
}

interface TripStage {
    id: number,
    name: string,
    lat: string,
    lng: string,
    trip: string,
    tripDays: Array<string>
}

interface TripDayAPI {
    '@context'?: string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    date: string,
    startHideout: string,
    endHideout: string,
    tripStage: string,
    pictures: Array<string>
}

interface TripDay {
    id: number,
    name: string,
    date: string,
    startHideout: string,
    endHideout: string,
    tripStage: string,
    pictures: Array<string>
}

interface PictureAPI {
    '@context'?: string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    shotTime: string,
    lat: string,
    lng: string,
    imageName: string,
    imageSize: number,
    updatedAt: Date,
    tripDay: string,
    extras: Array<string>
}

interface Picture {
    id: number,
    name: string,
    shotTime: string,
    lat: string,
    lng: string,
    tripDay: string,
    extras: Array<string>
}

interface Hideout {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    lat: string,
    lng: string
}

interface Extra {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    pictures: Array<string>,
    trip: string
}