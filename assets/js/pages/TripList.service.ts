export {}

import { fetchTrips, createTrip } from '@/js/services/trip.service';
import type { Trip } from '@/js/types/types';

/**
 * @returns {Promise<Trip[]>}
 */
export async function browseTrips(): Promise<Trip[]> {
    return fetchTrips();
}

/**
 * @param {Trip[]} trips
 * @param {Trip} tripToAdd
 * @returns {Promise<Trip[]>}
 */
export async function createNewTrip(trips: Trip[]): Promise<Trip[]> {
    const tripName: string = 'New Trip';
    const tripToAdd: Trip = await createTrip(tripName);
    if (tripToAdd) {
        trips.push(tripToAdd);
        console.log('The trip "' + tripToAdd.name + '" has been created');
    }
    return trips;
}