import type { TripDayAPI } from '@/js/types/types';

export const defaultDayAPI: TripDayAPI = {
    '@context': '/api/context/TripDay',
    '@id': '/api/trip_days/0',
    '@type': 'TripDay',
    id: 0,
    name: 'defaultDay',
    date: '2010-06-15',
    startHideout: '',
    
    endHideout: '',
    tripStage: '/api/trip_stages/0',
    pictures: []
};

export const defaultDayAPI1: TripDayAPI = {
    '@context': '/api/context/TripDay',
    '@id': '/api/trip_days/0',
    '@type': 'TripDay',
    id: 1,
    name: 'defaultDay1',
    date: '2011-07-16',
    startHideout: '',
    endHideout: '',
    tripStage: '/api/trip_stages/0',
    pictures: []
};

export const defaultDaysAPI: TripDayAPI[] = [
    {
        '@id': '/api/trip_days/1',
        '@type': 'TripDay',
        id: 1,
        name: 'defaultDay1',
        date: '2012-08-17',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    },
    {
        '@id': '/api/trip_days/1',
        '@type': 'TripDay',
        id: 2,
        name: 'defaultDay2',
        date: '2012-08-18',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    },
    {
        '@id': '/api/trip_days/1',
        '@type': 'TripDay',
        id: 3,
        name: 'defaultDay3',
        date: '2012-08-19',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    }
];