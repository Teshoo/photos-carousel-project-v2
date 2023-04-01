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