export type { Trip, TripStage, TripDay, Picture, Hideout, Extra }

interface Trip {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    tripStages: Array<string>,
    extras: Array<string>,
}

interface TripStage {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    lat: string,
    lng: string,
    Trip: Array<string>,
    tripDays: Array<string>,
}

interface TripDay {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    date: Date,
    startHideout: string,
    endHideout: string,
    tripStage: string,
    pictures: Array<string>,
}

interface Picture {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    shotTime: Date,
    lat: string,
    lng: string,
    imageName: string,
    imageSize: number,
    updatedAt: Date,
    tripDay: string,
    extras: Array<string>,
}

interface Hideout {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    lat: string,
    lng: string,
}

interface Extra {
    '@context': string,
    '@id': string,
    '@type': string,
    id: number,
    name: string,
    pictures: Array<string>,
    trip: string,
}