export {}

import axios from 'axios';
import { of, map } from 'rxjs';
import type { TripAPI, Trip } from '@/js/types/types';


///////////////////
// DATA FETCHING //
///////////////////

/**
 * @returns {Promise}
 */
async function fetchTripsAPI(): Promise<any> {
    const response = await axios.get('/api/trips');
    return response.data['hydra:member'];
}

/**
 * @param {number} tripId
 * @returns {Promise}
 */
function fetchTripAPI(tripId: number): Promise<any> {
    return axios.get('/api/trips/'+tripId);
}

/**
 * @param {string} tripToCreate
 * @returns {Promise}
 */
function createTripAPI(tripToCreate: Trip): Promise<any> {
    const params: {[index: string]:any}= {};
    params.name = tripToCreate.name;
    params.tripStages = tripToCreate.tripStages;
    params.extras = tripToCreate.extras;
    params.hideouts = tripToCreate.hideouts;
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.post('/api/trips', params, config);
}

/**
 * @param {Trip} trip
 * @returns {Promise}
 */
function updateTripAPI(trip: Trip): Promise<any> {
    const params: {[index: string]:any}= {};
    if (trip) {
        params.trip = trip;
    }
    const config = {
        headers: {
            'content-type': 'application/ld+json'
        }
    }
    return axios.put('/api/trips/' + trip.id, params.trip, config);
}

/**
 * @param {number} tripId
 * @returns {Promise}
 */
function deleteTripAPI(tripAPI: number): Promise<any> {
    return axios.delete('/api/trips/' + tripAPI);
}

///////////////////////
// DATA MANIPULATION //
///////////////////////

/**
 * @returns {Promise}
 */
export async function fetchTrips(): Promise<any> {
    try {
        const tripsAPI: TripAPI[] = await fetchTripsAPI();
        const trips: Trip[] = tripsAPIToTrips(tripsAPI);
        return trips;
    } catch (error) {
        console.log('Could not retrieve trips: ' + error);
    }
}

/**
 * @param {number} tripId
 * @returns {Promise}
 */
export async function fetchTrip(tripId: number): Promise<any> {
    try {
        const response = await fetchTripAPI(tripId);
        const trip: Trip = tripAPIToTrip(response.data);
        return trip;
    } catch (error) {
        console.log('Could not retrieve trip: ' + error);
    }
}

/**
 * @param {Trip} tripToCreate
 * @returns {Promise}
 */
export async function createTrip(tripToCreate: Trip): Promise<any> {
    try {
        const response = await createTripAPI(tripToCreate);
        const trip: Trip = tripAPIToTrip(response.data);
        return trip;
    } catch (error) {
        console.log('Could not create trip: ' + error);
    }
}

/**
 * @param {Trip} trip
 * @returns {Promise}
 */
export async function updateTrip(tripToUpdate: Trip): Promise<any> {
    try {
        const response = await updateTripAPI(tripToUpdate);
        const trip: Trip = tripAPIToTrip(response.data);
        return trip;
    } catch (error) {
        console.log('Could not update trip: ' + error);
    }
}

/**
 * @param {Trip} tripToDelete
 * @returns {Promise}
 */
export async function deleteTrip(tripToDelete: Trip): Promise<any> {
    try {
        await deleteTripAPI(tripToDelete.id);
    } catch (error) {
        console.log('Could not delete trip: ' + error);
    }
}

/**
 * @param {TripAPI} tripAPI
 * @returns {Trip}
 */
export function tripAPIToTrip(tripAPI: TripAPI): Trip {
    return {
        id: tripAPI.id,
        name: tripAPI.name,
        tripStages: tripAPI.tripStages,
        extras: tripAPI.extras,
        hideouts: tripAPI.hideouts
    };
}

/**
 * @param {TripAPI[]} tripsAPI
 * @returns {Trip[]}
 */
export function tripsAPIToTrips(tripsAPI: TripAPI[]): Trip[] {
    let trips: Trip[] = [];
    const trips$ = of(tripsAPI).pipe(
        map(tripsAPI => tripsAPI
            .map(tripAPI => tripAPIToTrip(tripAPI))
        )
    );
    trips$.subscribe(trips$ => trips = trips$);
    return trips;
}

/**
 * @param {Trip} trip
 * @param {TripAPI} tripAPI
 * @returns {TripAPI}
 */
export function tripToTripAPI(trip: Trip, tripAPI: TripAPI): TripAPI {
    return {
        ...tripAPI,
        name: trip.name,
        tripStages: trip.tripStages,
        extras: trip.extras,
        hideouts: trip.hideouts
    };
}

/**
 * @param {Trip} trip
 * @returns {Trip}
 */
export function cloneTrip(trip: Trip): Trip {
    return {
        id: trip.id,
        name: trip.name,
        tripStages: trip.tripStages,
        extras: trip.extras,
        hideouts: trip.hideouts
    };
}

export const forTesting = { fetchTripsAPI, fetchTripAPI, createTripAPI, updateTripAPI }