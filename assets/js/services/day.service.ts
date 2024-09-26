export {}

import axios from 'axios';
import { map, of } from 'rxjs';
import type { TripDayAPI, TripDay } from '../types/types';

///////////////////
// DATA FETCHING //
///////////////////

/**
 * @param {string|null} stageId
 * @returns {Promise}
 */
function fetchDaysAPI(stageId: number): Promise<any> {
    const params: {[index: string]:any}= {};
    if (stageId) {
        params.tripStage = '/api/trip_stages/' + stageId;
    }
    return axios.get('/api/trip_days', {
        params,
    });
}

/**
 * @param {number|null} tripDayId
 * @returns {Promise}
 */
function fetchDayAPI(tripDayId: number): Promise<any> {
    return axios.get('/api/trip_days/' + tripDayId);
}

/**
 * @param {TripDay} dayToCreate
 * @returns {Promise}
 */
function createDayAPI(dayToCreate: TripDay): Promise<any> {
    const params: {[index: string]:any}= {};
    params.name = dayToCreate.name;
    params.date = dayToCreate.date;
    params.tripStage = dayToCreate.tripStage;
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.post('/api/trip_days', params, config );
}

/**
 * @param {TripDay|null} day
 * @returns {Promise}
 */
function updateDayAPI(day: TripDay): Promise<any> {
    const params: {[index: string]:any}= {};
    if (day) {
        params.tripDay = day;
    }
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.put('/api/trip_days/' + day.id, params.tripDay, config);
}

/**
 * @param {number|null} dayId
 * @returns {Promise}
 */
function deleteDayAPI(dayId: number): Promise<any> {
    return axios.delete('/api/trip_days/' + dayId);
}

///////////////////////
// DATA MANIPULATION //
///////////////////////

/**
 * @param {number} stageId
 * @returns {Promise}
 */
export async function fetchDays(stageId: number): Promise<any> {
    try {
        const response = await fetchDaysAPI(stageId);
        const days: TripDay[] = daysAPIToDays(response.data['hydra:member']);
        return days;
    } catch (error) {
        console.log('Could not retrieve days: ' + error);
    }
}

/**
 * @param {number} dayId
 * @returns {Promise}
 */
export async function fetchDay(dayId: number): Promise<any> {
    try {
        const response = await fetchDayAPI(dayId);
        const day: TripDay = dayAPIToDay(response.data);
        return day;
    } catch (error) {
        console.log('Could not retrieve day: ' + error);
    }
}

/**
 * @param {TripDay} dayToCreate
 * @returns {Promise}
 */
export async function createDay(dayToCreate: TripDay): Promise<any> {
    try {
        const response = await createDayAPI(dayToCreate);
        const day: TripDay = dayAPIToDay(response.data);
        return day;
    } catch (error) {
        console.log('Could not create day: '+ error);
    }
}

/**
 * @param {TripDay} dayToUpdate
 * @returns {Promise}
 */
export async function updateDay(dayToUpdate: TripDay): Promise<any> {
    try {
        const response = await updateDayAPI(dayToUpdate);
        const day: TripDay = dayAPIToDay(response.data);
        return day;
    } catch (error) {
        console.log('Could not update day: ' + error);
    }
}

/**
 * @param {TripDay} dayToDelete
 * @returns {Promise}
 */
export async function deleteDay(dayToDelete: TripDay): Promise<any> {
    try {
        await deleteDayAPI(dayToDelete.id);
    } catch (error) {
        console.log('Could not delete day: ' + error);
    }
}

/**
 * @param {TripDayAPI} dayAPI
 * @returns {TripDay}
 */
function dayAPIToDay(dayAPI: TripDayAPI): TripDay {
    return {
        id: dayAPI.id,
        name: dayAPI.name,
        date: dayAPI.date.slice(0,10),
        startHideout: dayAPI.startHideout,
        endHideout: dayAPI.endHideout,
        tripStage: dayAPI.tripStage,
        pictures: dayAPI.pictures
    };
}

/**
 * @param {TripDayAPI[]} daysAPI
 * @returns {TripDay[]}
 */
function daysAPIToDays(daysAPI: TripDayAPI[]): TripDay[] {
    let days: TripDay[] = [];
    const days$ = of(daysAPI).pipe(
        map(daysAPI => daysAPI
            .map(dayAPI => dayAPIToDay(dayAPI))
        )
    );
    days$.subscribe(days$ => days = days$);
    return days;
}

/**
 * @param {TripDay} day
 * @param {TripDayAPI} dayAPI
 * @returns {TripDayAPI}
 */
function dayToDayAPI(day: TripDay, dayAPI: TripDayAPI): TripDayAPI {
    return {
        ...dayAPI,
        name: day.name,
        date: day.date,
        startHideout: day.startHideout,
        endHideout: day.endHideout,
        pictures: day.pictures
    };
}

/**
 * @param {TripDay} day
 * @returns {TripDay}
 */
export function cloneDay(day: TripDay): TripDay {
    return {
        id: day.id,
        name: day.name,
        date: day.date,
        startHideout: day.startHideout,
        endHideout: day.endHideout,
        tripStage: day.tripStage,
        pictures: day.pictures
    };
}