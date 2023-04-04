export {}

import axios from 'axios';

/**
 * @returns {Promise}
 */
export function fetchTrips() {
    return axios.get('/api/trips');
}

/**
 * @param {number|null} tripId
 * @returns {Promise}
 */
export function fetchTrip(tripId: Number) {
    return axios.get('/api/trips/'+tripId);
}

/**
 * @param {string|null} tripIri
 * @returns {Promise}
 */
export function updateTrip(tripIri: string, trip: Object) {
    const params: {[index: string]:any}= {};
    if (trip) {
        params.trip = trip;
    }
    return axios.put(tripIri, params.trip);
}