export {}

import axios from 'axios';

/**
 * @returns {Promise}
 */
export function fetchTrips() {
    return axios.get('/api/trips');
}