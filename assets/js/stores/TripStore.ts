export {}

import { defineStore } from 'pinia';

import { fetchTrips } from '@/js/services/trip-service';
import type { Trip } from '@/js/types/types';

export const useTripStore = defineStore('TripStore', {
    state: () => {
        return {
            trips: {} as Array<Trip>,
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
    }
});