import type { TripStage } from '@/js/types/types';

export const defaultStage: TripStage = {
    id: 0,
    name: 'defaultStage',
    lat: '33.3166478233829',
    lng: '126.57507714232469',
    trip: '/api/trips/0',
    tripDays: []
};

export const defaultStage1: TripStage = {
    id: 1,
    name: 'defaultStage1',
    lat: '34.3166478233829',
    lng: '127.57507714232469',
    trip: '/api/trips/1',
    tripDays: []
};

export const defaultStages: TripStage[] = [
    {
        id: 1,
        name: 'defaultStage1',
        lat: '34.3166478233829',
        lng: '127.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    },
    {
        id: 2,
        name: 'defaultStage2',
        lat: '35.3166478233829',
        lng: '128.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    },
    {
        id: 3,
        name: 'defaultStage3',
        lat: '36.3166478233829',
        lng: '129.57507714232469',
        trip: '/api/trips/0',
        tripDays: []
    }
];