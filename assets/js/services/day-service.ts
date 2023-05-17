export {}

import axios from 'axios';

/**
 * @param {string|null} stageIri
 * @returns {Promise}
 */
export function fetchDays(stageIri: any) {
    const params: {[index: string]:any}= {};
    if (stageIri) {
        params.tripStage = stageIri;
    }
    return axios.get('/api/trip_days', {
        params,
    });
}

/**
 * @param {number|null} tripDayId
 * @returns {Promise}
 */
export function fetchDay(tripDayId: Number) {
    return axios.get('/api/trip_days/'+tripDayId);
}

/**
 * @param {string|null} dayIri
 * @param {Object|null} day
 * @returns {Promise}
 */
export function updateDay(dayIri: string, day: Object) {
    const params: {[index: string]:any}= {};
    if (day) {
        params.tripDay = day;
    }
    return axios.put(dayIri, params.tripDay);
}