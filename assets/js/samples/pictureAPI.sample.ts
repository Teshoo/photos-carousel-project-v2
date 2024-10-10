import type { PictureAPI } from '@/js/types/types';

export const defaultPictureAPI: PictureAPI = {
    '@context': '/api/context/Picture',
    '@id': '/api/pictures/0',
    '@type': 'Picture',
    id: 0,
    name: 'defaultPicture',
    shotTime: '2010-06-15T12:30:00.000Z',
    lat: '37.578654',
    lng: '126.985737',
    imageName: 'img-20100615-123000-66e5fe51d9b62378730137',
    tripDay: '/api/trip_days/0',
    extras: []
};

export const newPictureAPI: PictureAPI = {
    '@context': '/api/context/Picture',
    '@id': '/api/pictures/0',
    '@type': 'Picture',
    id: -1,
    name: 'newPicture',
    shotTime: '2010-06-16T02:30:00.000Z',
    lat: '37.578657',
    lng: '126.985730',
    imageName: 'img-20100616-023000-66e5fe51d9b62378730137',
    tripDay: '/api/trip_days/0',
    extras: []
};

export const defaultPicturesAPI: PictureAPI[] = [
    {
        '@id': '/api/pictures/0',
        '@type': 'Picture',
        id: 1,
        name: 'defaultPicture1',
        shotTime: '2010-06-15T13:40:10.000Z',
        lat: '37.583200',
        lng: '126.987712',
        imageName: 'img-20100615-134010-66e5fe51d9b62378730137',
        tripDay: '/api/trip_days/0',
        extras: []
    },
    {
        '@id': '/api/pictures/0',
        '@type': 'Picture',
        id: 2,
        name: 'defaultPicture2',
        shotTime: '2010-06-15T14:50:20.000Z',
        lat: '37.583214',
        lng: '126.986089',
        imageName: 'img-20100615-145020-66e5fe51d9b62378730137',
        tripDay: '/api/trip_days/0',
        extras: []
    },
    {
        '@id': '/api/pictures/0',
        '@type': 'Picture',
        id: 1,
        name: 'defaultPicture3',
        shotTime: '2010-06-15T15:00:30.000Z',
        lat: '37.582677',
        lng: '126.985713',
        imageName: 'img-20100615-150030-66e5fe51d9b62378730137',
        tripDay: '/api/trip_days/0',
        extras: []
    }
];