export {}

import { defineStore } from 'pinia';

import { fetchTrips } from '@/js/services/trip-service';
import type { Trip } from '@/js/services/trip-service';

export const useTripStore = defineStore('TripStore', {
    state: () => {
        return {
            trips: {} as Array<Trip>,
            name: 'bob',
        };
    },
    getters: {
        getTrips(state) {
            //this.browseTrips();
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
    }
});