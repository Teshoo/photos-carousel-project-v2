import type { TripDay } from '@/js/types/types';

export const defaultDay: TripDay = {
    id: 0,
    name: 'defaultDay',
    date: '2010-06-15',
    startHideout: '',
    endHideout: '',
    tripStage: '/api/trip_stages/0',
    pictures: []
};

export const defaultDay1: TripDay = {
    id: 1,
    name: 'defaultDay1',
    date: '2011-07-16',
    startHideout: '',
    endHideout: '',
    tripStage: '/api/trip_stages/0',
    pictures: []
};

export const defaultDays: TripDay[] = [
    {
        id: 1,
        name: 'defaultDay1',
        date: '2012-08-17',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    },
    {
        id: 2,
        name: 'defaultDay2',
        date: '2012-08-18',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    },
    {
        id: 3,
        name: 'defaultDay3',
        date: '2012-08-19',
        startHideout: '',
        endHideout: '',
        tripStage: '/api/trip_stages/0',
        pictures: []
    }
];