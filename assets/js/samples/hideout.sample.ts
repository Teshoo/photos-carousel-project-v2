import type { Hideout } from '@/js/types/types';

export const defaultHideout: Hideout = {
    id: 0,
    name: 'defaultHideout',
    lat: '33.3166478233829',
    lng: '126.57507714232469',
    trip: '/api/trips/0'
};

export const defaultHideout1: Hideout = {
    id: 1,
    name: 'defaultHideout1',
    lat: '34.3166478233829',
    lng: '127.57507714232469',
    trip: '/api/trips/1'
};

export const defaultHideouts: Hideout[] = [
    {
        id: 1,
        name: 'defaultHideout1',
        lat: '34.3166478233829',
        lng: '127.57507714232469',
        trip: '/api/trips/0'
    },
    {
        id: 2,
        name: 'defaultHideout2',
        lat: '35.3166478233829',
        lng: '128.57507714232469',
        trip: '/api/trips/0'
    },
    {
        id: 3,
        name: 'defaultHideout3',
        lat: '36.3166478233829',
        lng: '129.57507714232469',
        trip: '/api/trips/0'
    }
];