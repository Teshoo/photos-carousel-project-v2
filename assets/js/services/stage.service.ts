export {}

import axios from 'axios';
import { map, of } from 'rxjs';
import type { TripStageAPI, TripStage, Trip } from '../types/types';

///////////////////
// DATA FETCHING //
///////////////////

/**
 * @param {number} tripId
 * @returns {Promise}
 */
function fetchStagesAPI(tripId: number): Promise<any> {
    const params: {[index: string]:any}= {};
    if (tripId) {
        params.trip = '/api/trips/' + tripId;
    }
    return axios.get('/api/trip_stages', {
        params,
    });
}

/**
 * @param {number} tripStageId
 * @returns {Promise}
 */
function fetchStageAPI(tripStageId: number): Promise<any> {
    return axios.get('/api/trip_stages/' + tripStageId);
}

/**
 * @param {TripStage} stageToCreate
 * @returns {Promise}
 */
function createStageAPI(stageToCreate: TripStage): Promise<any> {
    const params: {[index: string]:any}= {};
    params.name = stageToCreate.name;
    params.lat = stageToCreate.lat;
    params.lng = stageToCreate.lng;
    params.trip = stageToCreate.trip;
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.post('/api/trip_stages', params, config );
}

/**
 * @param {TripStage} stage
 * @returns {Promise}
 */
function updateStageAPI(stage: TripStage): Promise<any> {
    const params: {[index: string]:any}= {};
    if (stage) {
        params.tripStage = stage;
    }
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.put('/api/trip_stages/' + stage.id, params.tripStage, config);
}

/**
 * @param {number} stageId
 * @returns {Promise}
 */
function deleteStageAPI(stageId: number): Promise<any> {
    return axios.delete('/api/trip_stages/' + stageId);
}

///////////////////////
// DATA MANIPULATION //
///////////////////////

/**
 * @param {number} tripId
 * @returns {Promise}
 */
export async function fetchStages(tripId: number): Promise<any> {
    try {
        const response = await fetchStagesAPI(tripId);
        const stages: TripStage[] = stagesAPIToStages(response.data['hydra:member']);
        return stages;
    } catch (error) {
        console.log('Could not retrieve stages: ' + error);
    }
}

/**
 * @param {number} stageId
 * @returns {Promise}
 */
export async function fetchStage(stageId: number): Promise<any> {
    try {
        const response = await fetchStageAPI(stageId);
        const stage: TripStage = stageAPIToStage(response.data);
        return stage;
    } catch (error) {
        console.log('Could not retrieve stage: ' + error);
    }
}

/**
 * @param {TripStage} stageToCreate
 * @returns {Promise}
 */
export async function createStage(stageToCreate: TripStage): Promise<any> {
    try {
        const response = await createStageAPI(stageToCreate);
        const stage: TripStage = stageAPIToStage(response.data);
        return stage;
    } catch (error) {
        console.log('Could not create stage: '+ error);
    }
}

/**
 * @param {TripStage} stageToUpdate
 * @returns {Promise}
 */
export async function updateStage(stageToUpdate: TripStage): Promise<any> {
    try {
        const response = await updateStageAPI(stageToUpdate);
        const stage: TripStage = stageAPIToStage(response.data);
        return stage;
    } catch (error) {
        console.log('Could not update stage: ' + error);
    }
}

/**
 * @param {TripStage} stageToDelete
 * @returns {Promise}
 */
export async function deleteStage(stageToDelete: TripStage): Promise<void> {
    try {
        await deleteStageAPI(stageToDelete.id);
    } catch (error) {
        console.log('Could not delete stage: ' + error);
    }
}

/**
 * @param {TripStageAPI} stageAPI
 * @returns {TripStage}
 */
function stageAPIToStage(stageAPI: TripStageAPI): TripStage {
    return {
        id: stageAPI.id,
        name: stageAPI.name,
        lat: stageAPI.lat,
        lng: stageAPI.lng,
        trip: stageAPI.trip,
        tripDays: stageAPI.tripDays,
    };
}

/**
 * @param {TripStageAPI[]} stagesAPI
 * @returns {TripStage[]}
 */
function stagesAPIToStages(stagesAPI: TripStageAPI[]): TripStage[] {
    let stages: TripStage[] = [];
    const stages$ = of(stagesAPI).pipe(
        map(stagesAPI => stagesAPI
            .map(stageAPI => stageAPIToStage(stageAPI))
        )
    );
    stages$.subscribe(stages$ => stages = stages$);
    return stages;
}

/**
 * @param {TripStage} stage
 * @param {TripStageAPI} stageAPI
 * @returns {TripStageAPI}
 */
function stageToStageAPI(stage: TripStage, stageAPI: TripStageAPI): TripStageAPI {
    return {
        ...stageAPI,
        name: stage.name,
        lat: stage.lat,
        lng: stage.lng,
        tripDays: stage.tripDays,
    };
}

/**
 * @param {TripStage} stage
 * @returns {TripStage}
 */
export function cloneStage(stage: TripStage): TripStage {
    return {
        id: stage.id,
        name: stage.name,
        lat: stage.lat,
        lng: stage.lng,
        trip: stage.trip,
        tripDays: stage.tripDays,
    };
}