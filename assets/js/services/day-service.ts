export {}

import axios from 'axios';

/**
 * @returns {Promise}
 */
export function fetchStages() {
    return axios.get('/api/trips');
}

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