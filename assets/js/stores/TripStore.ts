export {}

import { defineStore } from 'pinia';

import { fetchTrips, fetchTrip, updateTrip } from '@/js/services/trip-service';
import type { Trip } from '@/js/types/types';

export const useTripStore = defineStore('Trip', {
    state: () => {
        return {
            trips: {} as Array<Trip>,
            currentTrip: {} as Trip,
            tempTripName: '' as string
        };
    },
    getters: {
        getTrips(state) {
            return state.trips;
        }
    },
    actions: {
        async browseTrips() {
            try {
                const response = await fetchTrips();
                this.trips = response.data['hydra:member'];
            } catch (error) {
                console.log('Something went wrong during trips loading');
            }
        },
        async browseCurrentTrip(id: any) {
            try {
                const response = await fetchTrip(id);
                this.currentTrip = response.data;
                this.tempTripName = this.currentTrip.name;
            } catch (error) {
                console.log('Something went wrong during the trip loading');
            }
        },
        async updateCurrentTrip() {
            try {
                const response = await updateTrip(this.currentTrip['@id'], this.currentTrip);
                this.currentTrip = response.data;
                this.tempTripName = this.currentTrip.name;
            } catch (error) {
                console.log('Something went wrong during the trip update');
            }
        },
    }
});