export {}

import axios from 'axios';
import { map, of } from 'rxjs';
import type { Hideout, HideoutAPI } from '../types/types';

///////////////////
// DATA FETCHING //
///////////////////

/**
 * @param {number} tripId
 * @returns {Promise}
 */
async function fetchHideoutsAPI(tripId: number): Promise<any> {
    const params: {[index: string]:any}= {};
    if (tripId) {
        params.trip = '/api/trips/' + tripId;
    }
    return axios.get('/api/hideouts', {
        params,
    });
}

/**
 * @param {Hideout} hideoutToCreate
 * @returns {Promise}
 */
function createHideoutAPI(hideoutToCreate: Hideout): Promise<any> {
    const params: {[index: string]:any}= {};
    params.name = hideoutToCreate.name;
    params.lat = hideoutToCreate.lat;
    params.lng = hideoutToCreate.lng;
    params.trip = hideoutToCreate.trip;
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.post('/api/hideouts', params, config );
}

/**
 * @param {Hideout} hideout
 * @returns {Promise}
 */
function updateHideoutAPI(hideout: Hideout): Promise<any> {
    const params: {[index: string]:any}= {};
    if (hideout) {
        params.hideout = hideout;
    }
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.put('/api/hideouts/' + hideout.id, params.hideout, config);
}

/**
 * @param {number} hideoutId
 * @returns {Promise}
 */
function deleteHideoutAPI(hideoutId: number): Promise<any> {
    return axios.delete('/api/hideouts/' + hideoutId);
}

///////////////////////
// DATA MANIPULATION //
///////////////////////

/**
 * @param {number} tripId
 * @returns {Promise}
 */
export async function fetchHideouts(tripId: number): Promise<any> {
    try {
        const response = await fetchHideoutsAPI(tripId);
        const hideouts: Hideout[] = hideoutsAPIToHideouts(response.data['hydra:member']);
        return hideouts;
    } catch (error) {
        console.log('Could not retrieve hideouts: ' + error);
    }
}

/**
 * @param {Hideout} hideoutToUpdate
 * @returns {Promise}
 */
export async function updateHideout(hideoutToUpdate: Hideout): Promise<any> {
    try {
        const response = await updateHideoutAPI(hideoutToUpdate);
        const hideout: Hideout = hideoutAPIToHideout(response.data);
        return hideout;
    } catch (error) {
        console.log('Could not update hideout: '+ error);
    }
}

/**
 * @param {Hideout} hideoutToCreate
 * @returns {Promise}
 */
export async function createHideout(hideoutToCreate: Hideout): Promise<any> {
    try {
        const response = await createHideoutAPI(hideoutToCreate);
        const hideout: Hideout = hideoutAPIToHideout(response.data);
        return hideout;
    } catch (error) {
        console.log('Could not create hideout: '+ error);
    }
}

/**
 * @param {Hideout} hideoutToDelete
 * @returns {Promise}
 */
export async function deleteHideout(hideoutToDelete: Hideout): Promise<void> {
    try {
        await deleteHideoutAPI(hideoutToDelete.id);
    } catch (error) {
        console.log('Could not delete hideout: '+ error);
    }
}

/**
 * @param {HideoutAPI} hideoutAPI
 * @returns {Hideout}
 */
function hideoutAPIToHideout(hideoutAPI: HideoutAPI): Hideout {
    return {
        id: hideoutAPI.id,
        name: hideoutAPI.name,
        lat: hideoutAPI.lat,
        lng: hideoutAPI.lng,
        trip: hideoutAPI.trip
    };
}

/**
 * @param {HideoutAPI[]} hideoutsAPI
 * @returns {Hideout[]}
 */
function hideoutsAPIToHideouts(hideoutsAPI: HideoutAPI[]): Hideout[] {
    let hideouts: Hideout[] = [];
    const hideouts$ = of(hideoutsAPI).pipe(
        map(hideoutsAPI => hideoutsAPI
            .map(hideoutAPI => hideoutAPIToHideout(hideoutAPI))
        )
    );
    hideouts$.subscribe(hideouts$ => hideouts = hideouts$);
    return hideouts;
}

/**
 * @param {Hideout} hideout
 * @param {HideoutAPI} hideoutAPI
 * @returns {HideoutAPI}
 */
function hideoutToHideoutAPI(hideout: Hideout, hideoutAPI: HideoutAPI): HideoutAPI {
    return {
        ...hideoutAPI,
        name: hideout.name,
        lat: hideout.lat,
        lng: hideout.lng,
        trip: hideout.trip
    };
}

/**
 * @param {Hideout} hideout
 * @returns {Hideout}
 */
export function cloneHideout(hideout: Hideout): Hideout {
    return {
        id: hideout.id,
        name: hideout.name,
        lat: hideout.lat,
        lng: hideout.lng,
        trip: hideout.trip
    };
}