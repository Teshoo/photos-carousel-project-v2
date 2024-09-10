import type { Picture } from '@/js/types/types';

export const defaultPicture: Picture = {
    id: 0,
    name: 'defaultPicture',
    shotTime: '2010-06-15T12:30:00.000Z',
    lat: '37.578654',
    lng: '126.985737',
    tripDay: '/api/trip_days/0',
    extras: []
};

export const defaultPictures: Picture[] = [
    {
        id: 1,
        name: 'defaultPicture1',
        shotTime: '2010-06-15T13:40:10.000Z',
        lat: '37.583200',
        lng: '126.987712',
        tripDay: '/api/trip_days/0',
        extras: []
    },
    {
        id: 2,
        name: 'defaultPicture2',
        shotTime: '2010-06-15T14:50:20.000Z',
        lat: '37.583214',
        lng: '126.986089',
        tripDay: '/api/trip_days/0',
        extras: []
    },
    {
        id: 1,
        name: 'defaultPicture3',
        shotTime: '2010-06-15T15:00:30.000Z',
        lat: '37.582677',
        lng: '126.985713',
        tripDay: '/api/trip_days/0',
        extras: []
    }
];