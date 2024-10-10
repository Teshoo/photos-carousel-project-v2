import type { TripStageAPI } from '@/js/types/types';

export const defaultStageAPI: TripStageAPI = {
    '@context': '/api/context/TripStage',
    '@id': '/api/trip_stages/0',
    '@type': 'Trip',
    id: 0,
    name: 'defaultStage',
    lat: '33.3166478233829',
    lng: '126.57507714232469',
    trip: '/api/trips/0',
    tripDays: []
};

export const defaultStageAPI1: TripStageAPI = {
    '@context': '/api/context/TripStage',
    '@id': '/api/trip_stages/0',
    '@type': 'TripStage',
    id: 1,
    name: 'defaultStage1',
    lat: '34.3166478233829',
    lng: '127.57507714232469',
    trip: '/api/trips/1',
    tripDays: []
};

export const defaultStagesAPI: TripStageAPI[] = [
    {
        '@id': '/api/trip_stages/1',
        '@type': 'TripStage',
        id: 1,
        name: 'defaultStage1',
        lat: '34.3166478233829',
        lng: '127.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    },
    {
        '@id': '/api/trip_stages/1',
        '@type': 'TripStage',
        id: 2,
        name: 'defaultStage2',
        lat: '35.3166478233829',
        lng: '128.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    },
    {
        '@id': '/api/trip_stages/1',
        '@type': 'TripStage',
        id: 3,
        name: 'defaultStage3',
        lat: '36.3166478233829',
        lng: '129.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    }
];