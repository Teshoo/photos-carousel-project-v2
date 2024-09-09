export {}

import { computed, type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Trip } from '@/js/types/types';
import { fetchTrips, fetchTrip, updateTrip } from '@/js/services/trip.service';

export const useTripStore = defineStore('Trip', () => {

    // STATES
    const trips: Ref<Trip[]> = ref([]);
    const currentTrip: Ref<Trip> = ref({
        id: -1,
        name: '',
        tripStages: [],
        extras: []
    });

    // GETTERS
    const getTrips = computed(() => trips);
    const getCurrentTrip = computed(() => currentTrip);

    // ACTIONS
    async function browseTrips() {
        trips.value = await fetchTrips();
    }

    async function browseCurrentTrip(id: number) {
        if (currentTrip.value.id === -1 || id !== currentTrip.value.id) {
            currentTrip.value = await fetchTrip(id);
        }
    }

    async function updateCurrentTrip(trip: Trip) {
        currentTrip.value = await updateTrip(trip);
        browseTrips();
    }

    return { trips, currentTrip, getTrips, getCurrentTrip, browseTrips, browseCurrentTrip, updateCurrentTrip } 
});