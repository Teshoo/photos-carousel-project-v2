import type { TripAPI } from '@/js/types/types'

export const defaultTripAPI: TripAPI = {
    '@context': '/api/context/Trip',
    '@id': '/api/trips/0',
    '@type': 'Trip',
    id: 0,
    name: 'defaultTrip',
    tripStages: [],
    hideouts: [],
    extras: []
}

export const defaultTripAPI1: TripAPI = {
    '@context': '/api/context/Trip',
    '@id': '/api/trips/0',
    '@type': 'Trip',
    id: 1,
    name: 'defaultTrip1',
    tripStages: [],
    hideouts: [],
    extras: []
}

export const defaultTripsAPI: TripAPI[] = [
    {
        '@id': '/api/trips/1',
        '@type': 'Trip',
        id: 1,
        name: 'defaultTrip1',
        tripStages: [],
        hideouts: [],
        extras: []
    },
    {
        '@id': '/api/trips/2',
        '@type': 'Trip',
        id: 2,
        name: 'defaultTrip2',
        tripStages: [],
        hideouts: [],
        extras: []
    },
    {
        '@id': '/api/trips/3',
        '@type': 'Trip',
        id: 3,
        name: 'defaultTrip3',
        tripStages: [],
        hideouts: [],
        extras: []
    }
]