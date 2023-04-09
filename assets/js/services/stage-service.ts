export {}

import axios from 'axios';

/**
 * @returns {Promise}
 */
export function fetchTrips() {
    return axios.get('/api/trips');
}

/**
 * @param {string|null} tripIri
 * @returns {Promise}
 */
export function fetchStages(tripIri: any) {
    const params: {[index: string]:any}= {};
    if (tripIri) {
        params.trip = tripIri;
    }
    return axios.get('/api/trip_stages', {
        params,
    });
}