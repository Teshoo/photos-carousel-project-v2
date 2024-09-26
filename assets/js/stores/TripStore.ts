export {}

import { computed, type Ref, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Trip } from '@/js/types/types';
import { fetchTrips, fetchTrip, createTrip, updateTrip, deleteTrip } from '@/js/services/trip.service';

export const useTripStore = defineStore('Trip', () => {

    // STATE
    const trips: Ref<Trip[]> = ref([]);
    const currentTrip: Ref<Trip> = ref({
        id: -1,
        name: '',
        tripStages: [],
        extras: []
    });

    // GETTERS
    const getTrips = computed<Ref<Trip[]>>(() => trips);
    const getCurrentTrip = computed<Ref<Trip>>(() => currentTrip);

    // ACTIONS
    async function browseTrips(): Promise<void> {
        trips.value = await fetchTrips();
    }

    async function browseCurrentTrip(id: number): Promise<void> {
        if (currentTrip.value.id === -1 || id !== currentTrip.value.id) {
            currentTrip.value = await fetchTrip(id);
        }
    }

    async function newTrip(trip: Trip): Promise<void> {
        await createTrip(trip).then(browseTrips);
    }

    async function updateCurrentTrip(trip: Trip): Promise<void> {
        currentTrip.value = await updateTrip(trip);
        browseTrips();
    }

    async function removeTrip(trip: Trip): Promise<void> {
        await deleteTrip(trip).then(browseTrips);
    }

    return { trips, currentTrip, getTrips, getCurrentTrip, browseTrips, browseCurrentTrip, newTrip, updateCurrentTrip, removeTrip } 
});