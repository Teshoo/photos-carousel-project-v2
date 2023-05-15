export {}

import axios from 'axios';

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

/**
 * @param {number|null} tripStageId
 * @returns {Promise}
 */
export function fetchStage(tripStageId: Number) {
    return axios.get('/api/trip_stages/'+tripStageId);
}

/**
 * @param {string|null} stageIri
 * @param {Object|null} stage
 * @returns {Promise}
 */
export function updateStage(stageIri: string, stage: Object) {
    const params: {[index: string]:any}= {};
    if (stage) {
        params.tripStage = stage;
    }
    return axios.put(stageIri, params.tripStage);
}